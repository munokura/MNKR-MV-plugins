/*
 * --------------------------------------------------
 * MNKR_MoveEventPoint.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_MoveEventPoint.js
@plugindesc Adds a plugin command that moves the specified event to the specified coordinates on the map.
@author munokura
@license MIT License

@help
Adds a plugin command that moves a specified event to a specified coordinate
on the map.
Similar to the player's touch movement, it moves while avoiding obstacles up
to the coordinate.

MNKR_MoveEventPoint Event ID X Coordinate Y Coordinate Weight

Event ID - -1: Player / 0: Executed Event / 1 or higher: Event ID on the map
X Coordinate - X Coordinate within the map
Y Coordinate - Y Coordinate within the map
Weight - 0 (or omitted): No / 1: Wait until completion

Example
MNKR_MoveEventPoint 0 5 10 1
The event that executed the plugin command will move to maps 5 and 10.

Notes
This command uses the same mechanism that moves the player to specified
coordinates by touch in RPG Maker.
Specifying a location far off-screen can easily cause problems.
We recommend specifying closer coordinates.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author.
There are no restrictions on its use (commercial, R18, etc.).

Acknowledgments
We would like to thank jp_asty for his guidance.
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_MoveEventPoint.js
@plugindesc 指定イベントをマップの指定座標へ移動させるプラグインコマンドを追加します。
@author munokura

@help
指定イベントをマップの指定座標へ移動させるプラグインコマンドを追加します。
プレイヤーのタッチ移動と同じで、座標までの障害物を避けて移動します。

MNKR_MoveEventPoint イベントID X座標 Y座標 ウェイト

イベントID - -1:プレイヤー / 0:実行イベント / 1以上:マップ上のイベントID
X座標 - マップ内のX座標
Y座標 - マップ内のY座標
ウェイト - 0(または省略):しない / 1:完了までウェイト

例
MNKR_MoveEventPoint 0 5 10 1
プラグインコマンドを実行したイベントがマップ5,10へ移動します。

注意事項
  ツクールのプレイヤーがタッチ指定された座標へ移動する仕組みを流用しています。
  画面外の遠い位置への指定はトラブルを生みやすいです。
  近めの座標を指定することを推奨します。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

謝辞
  ご指導いただきました、jp_asty氏に感謝いたします。
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.apply(this, arguments);

    if (command === pluginName) {
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