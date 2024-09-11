/*
 * --------------------------------------------------
 * MNKR_PartyAbilityExp.js
 *   Ver.0.1.0
 * Copyright (c) 2024 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:ja
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_PartyAbilityExp.js
 * @plugindesc パーティスキルに経験値の増加を追加します。
 * @author ムノクラ
 *
 * @help
 * # 機能
 * パーティスキルに経験値の増加を追加します。
 * 
 * # 使い方
 * 特徴欄があるデータベースのメモ欄に以下を入力してください。
 * <MNKR_PartyAbilityExp:増加率(%)>
 * 複数のレートが重複した場合、最大の数値が採用されます。
 * 
 * ## 記述例
 * <MNKR_PartyAbilityExp:200>
 * パーティの獲得経験値が200%になります。
 * 
 * <MNKR_PartyAbilityExp:0>
 * パーティの獲得経験値が0%になります。
 * ※負の値を入れても0として扱われます。
 * 
 * 
 * ## 特徴欄があるデータベース
 * - アクター
 * - 職業
 * - 武器
 * - 防具
 * - ステート
 *
 * # 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
    'use strict';
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    Game_BattlerBase.prototype.partyAbilityRate = function (pluginName) {
        let metaArray = [];
        const battlerTrait = this.traitObjects();
        for (let i = 0; i < battlerTrait.length; i++) {
            metaArray.push(battlerTrait[i].meta[pluginName]);
        }
        metaArray = metaArray.filter(item => item).map(Number);
        const maxMeta = Math.max(...metaArray);
        return maxMeta;
    };

    Game_Party.prototype.partyAbilityRate = function (pluginName) {
        let result = null;
        this.battleMembers().forEach(function (actor) {
            result = actor.partyAbilityRate(pluginName);
        });
        result === null ? 100 : result;
        return result;
    };

    const _Game_Troop_expTotal = Game_Troop.prototype.expTotal;
    Game_Troop.prototype.expTotal = function () {
        const expTotal = Math.floor(_Game_Troop_expTotal.call(this) * this.expRate());
        return expTotal;
    };

    Game_Troop.prototype.expRate = function () {
        const rate = $gameParty.getExpRate() / 100;
        return rate;
    };

    Game_Party.prototype.getExpRate = function () {
        const expRate = this.partyAbilityRate(pluginName) < 0 ? 0 : this.partyAbilityRate(pluginName);
        return expRate;
    };

})();
