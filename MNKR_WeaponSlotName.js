/*
 * --------------------------------------------------
 * MNKR_WeaponSlotName.js
 *   Ver.0.1.0
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_WeaponSlotName.js
 * @plugindesc 装備シーンの武器の項目名を変更します。
 * @author munokura
 *
 * @help
 * 装備シーンの武器の装備タイプ名を変更します。
 *
 * アクター・職業のメモ欄に下記のように入力してください。
 * アクター・職業の両方に書かれている場合、職業が優先されます。
 * <MNKR_WeaponSlotName:声>
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
    "use strict";

    let hasDualWield = false;

    const _Window_EquipSlot_slotName = Window_EquipSlot.prototype.slotName;
    Window_EquipSlot.prototype.slotName = function (index) {
        const actorMeta = $dataActors[this._actor._actorId].meta.MNKR_WeaponSlotName;
        const classMeta = $dataClasses[this._actor._classId].meta.MNKR_WeaponSlotName;
        const hasMeta = classMeta ? classMeta : actorMeta;
        const slot0 = index === 0 && hasMeta;
        const slot1 = index === 1 && hasMeta && hasDualWield;
        if (slot0 || slot1) {
            return hasMeta;
        }
        return _Window_EquipSlot_slotName.call(this, index);
    };

    const _Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function () {
        hasDualWield = this.isDualWield();
        return _Game_Actor_equipSlots.call(this);
    };

})();
