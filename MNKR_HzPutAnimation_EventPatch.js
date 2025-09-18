/*
 * --------------------------------------------------
 * MNKR_HzPutAnimation_EventPatch.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_HzPutAnimation_EventPatch.js
@plugindesc Use the HzPutAnimation function to display the animation at a position offset from the event.
@author munokura
@license MIT License

@help
This is a patch plugin for HzPutAnimation.
https://plugin.fungamemake.com/archives/13313

HzPutAnimation can be used alone to play animations by specifying coordinates
(in pixels) within the map.
This plugin adds commands to this at a specified offset from the event.

Place it below HzPutAnimation in the Plugin Manager.

Additional Plugin Commands:
HZANIM EVENT Event ID x offset y offset animation ID
Displays animations centered on a location offset from the event position.
Event ID: -1: Player / 0: Execution event / 1 or higher: Event ID on the map

Plugin commands can contain control characters.

Usage Example
HZANIM EVENT 1 0 -96 1
Plays animation ID 1 at an X coordinate of 0px and a Y coordinate of -96px for
event ID 1.
Positive offsets affect the right/bottom, while negative offsets affect the
left/top.

Terms of Use:
MIT Licensed.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_HzPutAnimation_EventPatch.js
@plugindesc HzPutAnimationの機能を使ってイベントからずれた位置にアニメーションを表示します。
@author munokura

@help
HzPutAnimation のパッチプラグインです。
https://plugin.fungamemake.com/archives/13313

HzPutAnimation は単体で、マップ内の座標（px単位）を指定して再生できます。
これにイベントからオフセットした指定位置にコマンドを追加するプラグインです。

プラグイン管理で HzPutAnimation の下側に配置してください。

追加プラグインコマンド:
HZANIM EVENT イベントID xオフセット yオフセット アニメーションID
  イベント位置からオフセットした場所を中心にアニメーションを表示します。
  イベントID: -1:プレイヤー / 0:実行イベント / 1以上:マップ上のイベントID

プラグインコマンドには制御文字が使用できます。

使用例
HZANIM EVENT 1 0 -96 1
  イベントID1にX座標0px、Y座標-96pxにアニメーションID1を再生します。
  オフセットの量は正値が右・下、負値が左・上に作用します。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    "use strict";

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        function cnvEsc(txt) {
            if (txt == null) return txt;
            return Window_Base.prototype.convertEscapeCharacters(txt);
        };

        if (command.toUpperCase() === 'HZANIM') {
            if (args[0].toUpperCase() === 'EVENT') {
                const eventId = Number(cnvEsc(args[1]));
                const inScreen = this.character(eventId).isNearTheScreen();
                if (inScreen) {
                    const showX = this.character(eventId).screenX() + Number(cnvEsc(args[2]));
                    const showY = this.character(eventId).screenY() + Number(cnvEsc(args[3]));
                    const animId = Number(cnvEsc(args[4]));
                    HzPutAnimation.putAnimation(showX, showY, animId);
                }
            }
        }
    };

})();
