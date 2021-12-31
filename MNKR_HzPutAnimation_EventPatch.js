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
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_HzPutAnimation_EventPatch.js
 * @plugindesc HzPutAnimationの機能を使ってイベントからずれた位置にアニメーションを表示します。
 * @author munokura
 *
 * @help
 * HzPutAnimation のパッチプラグインです。
 * https://plugin.fungamemake.com/archives/13313
 * 
 * HzPutAnimation は単体で、マップ内の座標（px単位）を指定して再生できます。
 * これにイベントからオフセットした指定位置にコマンドを追加するプラグインです。
 * 
 * プラグイン管理で HzPutAnimation の下側に配置してください。
 * 
 * 
 * 追加プラグインコマンド:
 * HZANIM EVENT イベントID xオフセット yオフセット アニメーションID
 *   イベント位置からオフセットした場所を中心にアニメーションを表示します。
 *   イベントID: -1:プレイヤー / 0:実行イベント / 1以上:マップ上のイベントID
 * 
 * プラグインコマンドには制御文字が使用できます。
 * 
 * 使用例
 * HZANIM EVENT 1 0 -96 1
 *   イベントID1にX座標0px、Y座標-96pxにアニメーションID1を再生します。
 *   オフセットの量は正値が右・下、負値が左・上に作用します。
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
