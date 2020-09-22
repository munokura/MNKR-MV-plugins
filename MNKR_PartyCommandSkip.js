/*
 * --------------------------------------------------
 * MNKR_PartyCommandSkip Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:ja
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_PartyCommandSkip.js
 * @plugindesc 戦闘開始時にパーティコマンドを飛ばし、アクターコマンドから開始します。
 * @author munokura
 *
 * @help
 * 戦闘開始時にパーティコマンドを飛ばします。
 * 先頭のアクターでキャンセルすると、パーティコマンドに戻ります。
 * 
 * パーティコマンドウィンドウでキャンセルすると、戦うを選んだ状態になります。
 */

(function () {
      'use strict';

      const _Scene_Battle_prototype_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow
      Scene_Battle.prototype.createPartyCommandWindow = function () {
            _Scene_Battle_prototype_createPartyCommandWindow.call(this);
            this._partyCommandWindow.setHandler('cancel', this.commandFight.bind(this));
      };

      const _Scene_Battle_prototype_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection
      Scene_Battle.prototype.startPartyCommandSelection = function () {
            this.selectNextCommand();
      };

      Scene_Battle.prototype.selectPreviousCommand = function () {
            BattleManager.selectPreviousCommand();
            if (BattleManager.isInputting() && BattleManager.actor()) {
                  this.startActorCommandSelection();
            } else {
                  _Scene_Battle_prototype_startPartyCommandSelection.call(this);
            }
      };

})();
