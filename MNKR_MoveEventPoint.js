/*
 * --------------------------------------------------
 * MNKR_MoveEventPoint.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_MoveEventPoint.js
 * @plugindesc 指定イベントをマップの指定座標へ移動させるプラグインコマンドを追加します。
 * @author munokura
 *
 * @help
 * 指定イベントをマップの指定座標へ移動させるプラグインコマンドを追加します。
 * プレイヤーのタッチ移動と同じで、座標までの障害物を避けて移動します。
 * 
 * MNKR_MoveEventPoint イベントID X座標 Y座標 ウェイト
 * 
 * イベントID - -1:プレイヤー / 0:実行イベント / 1以上:マップ上のイベントID
 * X座標 - マップ内のX座標
 * Y座標 - マップ内のY座標
 * ウェイト - 0(または省略):しない / 1:完了までウェイト
 * 
 * 例
 * MNKR_MoveEventPoint 0 5 10 1
 * プラグインコマンドを実行したイベントがマップ5,10へ移動します。
 * 
 * 補足
 * 各引数は制御文字が使用できます。
 * これにより変数を使用することが可能です。
 * 
 * 例
 * MNKR_MoveEventPoint \V[1] \V[2] \V[3] \V[4]
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 謝辞
 *   ご指導いただきました、jp_asty氏に感謝いたします。
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.apply(this, arguments);

    if (command === pluginName) {

      args = args.map(function (element) {
        return Window_Base.prototype.convertEscapeCharacters.call(this, element);
      }, this);

      const eventId = Number(args[0]);
      const mapX = Number(args[1]);
      const mapY = Number(args[2]);
      const waitOn = args[3] === "1";

      this.character(eventId).forceMoveRoute({
        "list": [{
          "code": 45, "parameters":
            ["this.moveStraight(this.findDirectionTo(" + mapX + ", " + mapY + ")); this._moveRoute.repeat = !this.pos(" + mapX + ", " + mapY + ");"]
        },
        { "code": 0 }],
        "repeat": true,
        "skippable": false
      })
      this._character = this.character(eventId);

      if (waitOn) {
        this.setWaitMode('route');
      }

    }
  };

})();