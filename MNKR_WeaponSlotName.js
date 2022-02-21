/*
 * --------------------------------------------------
 * MNKR_WeaponSlotName.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_WeaponSlotName.js
 * @plugindesc 装備シーンの武器の項目名をアクター毎に変更します。
 * @author munokura
 *
 * @help
 * 装備シーンの武器の装備タイプ名をアクター毎に変更します。
 *
 * アクターのメモ欄に下記のように入力してください。
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
        const slot0 = index === 0 && actorMeta;
        const slot1 = index === 1 && actorMeta && hasDualWield;
        if (slot0 || slot1) {
            return actorMeta;
        }
        return _Window_EquipSlot_slotName.call(this, index);
    };

    const _Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function () {
        hasDualWield = this.isDualWield();
        return _Game_Actor_equipSlots.call(this);
    };

})();
