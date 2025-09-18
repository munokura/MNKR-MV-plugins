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
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChangeFade.js
@plugindesc Changes the behavior of the event command "Fade out/in".
@author munokura
@license MIT License

@help
Changes the behavior of the "Fade Out/In" event command.

# Terms of Use
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).

@param fadeDurationVariables
@text Fade Speed Variable
@desc The value of the variable is the fade time. The default is 30. If the value is 0/no variable is specified, the default behavior will occur.
@type variable
@default 0

@param fadeColor
@text Fade Color
@desc Enter the RGB values. If you do not want to use this function, enter -1 for red (R).
@type struct<color>
@default {"red":"255","green":"0","blue":"0"}
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChangeFade.js
@plugindesc イベントコマンド「フェードアウト/イン」の挙動を変更します。
@author munokura

@help
イベントコマンド「フェードアウト/イン」の挙動を変更します。

# 利用規約
MITライセンスです。
http://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。

@param fadeDurationVariables
@text フェード速度変数
@type variable
@desc 変数の値がフェード時間になります。ツクールデフォルトは30。値が0/変数の指定がない時はデフォルト動作。
@default 0

@param fadeColor
@text フェード色
@type struct<color>
@desc RGBの値を入力します。機能を使用しない場合、赤(R)に-1と入力。
@default {"red":"255","green":"0","blue":"0"}
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
