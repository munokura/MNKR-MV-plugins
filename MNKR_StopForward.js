/*
 * --------------------------------------------------
 * MNKR_StopForward.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_StopForward.js
 * @plugindesc SV戦闘時にアクターが前進する動作を止めます。
 * @author munokura
 *
 * @help
 * SV戦闘時にアクターが前進する動作を止めます。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * @param input
 * @text コマンド入力時
 * @type boolean
 * @on 前進する
 * @off 前進しない
 * @default true
 * @desc コマンド入力時に前進させるか選択
 *
 * @param action
 * @text 行動時
 * @type boolean
 * @on 前進する
 * @off 前進しない
 * @default false
 * @desc 行動時に前進させるか選択
 */


(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const input = parameters['input'] === 'true';
  const action = parameters['action'] === 'true';

  const _Sprite_Actor_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
  Sprite_Actor.prototype.updateTargetPosition = function () {
    if (this._actor.isInputting()) {
      if (input) {
        this.stepForward();
      }
    } else if (this._actor.isActing()) {
      if (action) {
        this.stepForward();
      }
    } else {
      _Sprite_Actor_updateTargetPosition.call(this);
    }
  };

})();