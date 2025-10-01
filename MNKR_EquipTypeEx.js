/*
 * --------------------------------------------------
 * MNKR_EquipTypeEx.js
 * Ver.0.0.1
 * Copyright (c) 2025 Sasuke KANNAZUKI,munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@plugindesc You can add multiple equipment types to weapons and armors.
@author munokura
@license MIT

@help
You can add multiple equipment types to weapons and armors.

# How to Use
For example, if you have set up a database like this:
- 01 Weapon
- 02 Shield
- 03 Head
- 04 Body
- 05 Accessory
, use it as follows:

Specify the following in the weapons or armor's Note field:
<MNKR_EquipTypeEx:3,4,5>
This equipment can now be equipped anywhere in
- 03 Head
- 04 Body
- 05 Accessory

## Note
The "Optimize" command only supports basic types.

# Terms of Use
MIT License.
https://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission,
 and there are no restrictions on its use (commercial, 18+, etc.).
*/
/*:ja
@target MV
@plugindesc 武器・防具に複数の装備タイプを追加できます。
@author munokura
@license MIT

@help
武器・防具に複数の装備タイプを追加できます。


# 使用方法
例えば
- 01 武器
- 02 盾
- 03 頭
- 04 身体
- 05 装飾品
のようにデータベースを設定した場合、下記のように使用してください。

武器・防具のメモ欄に以下の通り指定してください。
<MNKR_EquipTypeEx:3,4,5>
この装備は
- 03 頭
- 04 身体
- 05 装飾品
のどこにでも装備できるようになります。


## 注意
"最強装備"コマンドでは、武器・防具の基本機能の装備タイプにしか対応していません。


# 利用規約
MITライセンスです。
https://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
についても制限はありません。
*/

(() => {
    'use strict';

    /**
     * アイテムの装備タイプ（'weapon', 'armor', 'none'）を返すヘルパー関数
     */
    const isEquipType = function (item) {
        if (DataManager.isWeapon(item)) {
            return 'weapon';
        }
        if (DataManager.isArmor(item)) {
            return 'armor';
        }
        return 'none';
    };

    /**
     * 追加装備タイプIDの配列を取得
     */
    const getAdditionalEquipTypes = function (item) {
        if (!item || !item.meta.MNKR_EquipTypeEx) return [];
        return item.meta.MNKR_EquipTypeEx.split(',').map(function (id) {
            return parseInt(id);
        }).filter(function (id) {
            return id > 0;
        });
    };

    /**
     * アイテムが指定スロットに装備可能か（追加装備タイプのみ）
     */
    const canEquipAdditional = function (actor, item, slotId) {
        if (!item) return false;
        const types = getAdditionalEquipTypes(item);
        return types.length > 0 && types.contains(actor.equipSlots()[slotId]);
    };

    /**
     * Window_EquipItem - 装備可能判定
     */
    const _Window_EquipItem_includes = Window_EquipItem.prototype.includes;
    Window_EquipItem.prototype.includes = function (item) {
        if (item === null || _Window_EquipItem_includes.call(this, item)) {
            return true;
        }
        if (this._actor && this._slotId >= 0) {
            return canEquipAdditional(this._actor, item, this._slotId);
        }
        return false;
    };

    /**
     * Game_Actor - 装備可能判定を拡張 (Refactored)
     */
    const _Game_Actor_canEquip = Game_Actor.prototype.canEquip;
    Game_Actor.prototype.canEquip = function (item) {
        if (!item || _Game_Actor_canEquip.call(this, item)) {
            return _Game_Actor_canEquip.call(this, item);
        }

        const types = getAdditionalEquipTypes(item);
        if (types.length === 0) return false;

        const equipType = isEquipType(item);

        const slots = this.equipSlots();
        for (let i = 0; i < slots.length; i++) {
            if (!types.contains(slots[i])) continue;

            if (equipType === 'weapon' && this.isEquipWtypeOk(item.wtypeId)) {
                return true;
            }
            if (equipType === 'armor' && this.isEquipAtypeOk(item.atypeId)) {
                return true;
            }
        }
        return false;
    };

    /**
     * Game_Actor - 特定スロットに装備可能かチェック (Refactored)
     */
    Game_Actor.prototype.canEquipAtSlot = function (item, slotId) {
        if (!item) return false;

        const slotType = this.equipSlots()[slotId];
        const equipType = isEquipType(item);

        // 通常の装備判定
        if (equipType === 'weapon' && slotType === 1 && this.isEquipWtypeOk(item.wtypeId)) {
            return true;
        }
        if (equipType === 'armor' && slotType === item.etypeId && this.isEquipAtypeOk(item.atypeId)) {
            return true;
        }

        // 追加装備タイプの判定
        const types = getAdditionalEquipTypes(item);
        if (types.length > 0 && types.contains(slotType)) {
            if (equipType === 'weapon') {
                return this.isEquipWtypeOk(item.wtypeId);
            }
            if (equipType === 'armor') {
                return this.isEquipAtypeOk(item.atypeId);
            }
        }
        return false;
    };

    /**
     * Game_Actor - 装備不可アイテムの解放を拡張
     */
    Game_Actor.prototype.releaseUnequippableItems = function (forcing) {
        for (; ;) {
            const equips = this.equips();
            let changed = false;
            for (let i = 0; i < equips.length; i++) {
                const item = equips[i];
                if (item && !this.canEquipAtSlot(item, i)) {
                    if (!forcing) {
                        this.tradeItemWithParty(null, item);
                    }
                    this._equips[i].setObject(null);
                    changed = true;
                }
            }
            if (!changed) break;
        }
    };

    /**
     * Game_Actor - 装備変更処理を拡張
     */
    const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function (slotId, item) {
        if (!item || !canEquipAdditional(this, item, slotId)) {
            _Game_Actor_changeEquip.call(this, slotId, item);
            return;
        }

        // 追加装備タイプの装備処理
        const oldItem = this.equips()[slotId];
        if (this.tradeItemWithParty(item, oldItem)) {
            this._equips[slotId].setObject(item);
            this.refresh();
        }
    };

    /**
     * Window_EquipStatus - 能力値比較のための一時装備処理を修正
     */
    const _Window_EquipStatus_setTempActor = Window_EquipStatus.prototype.setTempActor;
    Window_EquipStatus.prototype.setTempActor = function (tempActor) {
        if (this._actor && tempActor) {
            tempActor._additionalEquipTypes = {};
            const equips = this._actor.equips();
            const slots = this._actor.equipSlots();

            for (let i = 0; i < equips.length; i++) {
                if (equips[i] && getAdditionalEquipTypes(equips[i]).length > 0) {
                    tempActor._additionalEquipTypes[i] = slots[i];
                }
            }
        }
        _Window_EquipStatus_setTempActor.call(this, tempActor);
    };

    /**
     * Game_Actor - 装備強制変更を拡張（能力値比較用）
     */
    const _Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
    Game_Actor.prototype.forceChangeEquip = function (slotId, item) {
        // 追加装備タイプの情報があれば使用
        if (this._additionalEquipTypes && this._additionalEquipTypes[slotId]) {
            const currentItem = this.equips()[slotId];
            if (currentItem && getAdditionalEquipTypes(currentItem).length > 0) {
                this._equips[slotId].setObject(item);
                this.releaseUnequippableItems(true);
                this.refresh();
                return;
            }
        }

        // 新しく装備するアイテムが追加装備タイプを持つ場合
        if (item && canEquipAdditional(this, item, slotId)) {
            this._equips[slotId].setObject(item);
            this.releaseUnequippableItems(true);
            this.refresh();
            return;
        }

        _Game_Actor_forceChangeEquip.call(this, slotId, item);
    };

})();