/*
 * --------------------------------------------------
 * MNKR_PartyCommandSkip.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_PartyCommandSkip.js
@plugindesc At the start of battle, the party command will be skipped and you will start with the actor command.
@author munokura
@license MIT License

@help
Skips party commands at the start of battle.
Cancelling as the lead actor returns to party commands.

Cancelling in the party command window will result in choosing "Fight."

No plugin commands.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on use (commercial, 18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_PartyCommandSkip.js
@plugindesc 戦闘開始時にパーティコマンドを飛ばし、アクターコマンドから開始します。
@author munokura

@help
戦闘開始時にパーティコマンドを飛ばします。
先頭のアクターでキャンセルすると、パーティコマンドに戻ります。

パーティコマンドウィンドウでキャンセルすると、戦うを選んだ状態になります。

プラグインコマンドはありません。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
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
