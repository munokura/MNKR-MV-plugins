/*
 * --------------------------------------------------
 * MNKR_ChangeFade.js
 *   Ver.0.0.2
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChangeFade.js
 * @plugindesc イベントコマンド「フェードアウト/イン」の挙動を変更します。
 * @author munokura
 *
 * @help
 * イベントコマンド「フェードアウト/イン」の挙動を変更します。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param fadeDurationVariables
 * @text フェード速度変数
 * @type variable
 * @desc 変数の値がフェード時間になります。ツクールデフォルトは30。値が0/変数の指定がない時はデフォルト動作。
 * @default 0
 * 
 * @param fadeColor
 * @text フェード色
 * @type struct<color>
 * @desc RGBの値を入力します。機能を使用しない場合、赤(R)に-1と入力。
 * @default {"red":"255","green":"0","blue":"0"}
 */
/*~struct~color:
 * @param red
 * @text 赤
 * @default 255
 * @type number
 * @min -1
 * @max 255
 * @desc フェードの色。0から255。機能を使用しない場合、-1と入力
 *
 * @param green
 * @text 緑
 * @default 0
 * @type number
 * @max 255
 * @desc フェードの色。0から255。
 *
 * @param blue
 * @text 青
 * @default 0
 * @type number
 * @max 255
 * @desc フェードの色。0から255。
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_fadeDurationVariables = Number(parameters['fadeDurationVariables'] || 0);
    const PRM_fadeColor = JSON.parse(parameters['fadeColor'] || '{}');
    const PRM_Red = Number(PRM_fadeColor.red);
    const PRM_Green = Number(PRM_fadeColor.green);
    const PRM_Blue = Number(PRM_fadeColor.blue);

    const _Game_Interpreter_command221 = Game_Interpreter.prototype.command221;
    Game_Interpreter.prototype.command221 = function () {
        changeFadeColor();
        const fadeDuration = PRM_fadeDurationVariables === 0 ? 0 : $gameVariables.value(PRM_fadeDurationVariables);
        if (fadeDuration <= 0) {
            return _Game_Interpreter_command221.call(this);
        }
        if (!$gameMessage.isBusy()) {
            $gameScreen.startFadeOut(fadeDuration);
            this.wait(fadeDuration);
            this._index++;
        }
        return false;
    };

    const _Game_Interpreter_command222 = Game_Interpreter.prototype.command222;
    Game_Interpreter.prototype.command222 = function () {
        changeFadeColor();
        const fadeDuration = PRM_fadeDurationVariables === 0 ? 0 : $gameVariables.value(PRM_fadeDurationVariables);
        if (fadeDuration <= 0) {
            return _Game_Interpreter_command222.call(this);
        }
        if (!$gameMessage.isBusy()) {
            $gameScreen.startFadeIn(fadeDuration);
            this.wait(fadeDuration);
            this._index++;
        }
        return false;
    };

    function changeFadeColor() {
        if (PRM_Red > -1) {
            SceneManager._scene._spriteset._fadeSprite.setColor(PRM_Red, PRM_Green, PRM_Blue);
        }
    };

})();
