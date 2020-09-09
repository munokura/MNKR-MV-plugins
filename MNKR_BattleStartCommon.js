/*
 * --------------------------------------------------
 * MNKR_BattleStartCommon Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc 戦闘開始時のメッセージをコモンイベントに置き換えます。
 * @author munokura
 *
 * @param Common Id
 * @text コモンイベント
 * @type common_event
 * @default 0
 * 
 * @help
 * 戦闘開始時のメッセージをコモンイベントに置き換えます。
 */

(function() {
    'use strict';

    const parameters = PluginManager.parameters('MNKR_BattleStartCommon')
    const commonId = Number(parameters['Common Id'] || 0)

    BattleManager.displayStartMessages = function() {
        $gameTemp.reserveCommonEvent(commonId);
    };

})();