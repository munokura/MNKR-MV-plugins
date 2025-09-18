/*
 * --------------------------------------------------
 * MNKR_ChangeTransfer.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChangeTransfer.js
@plugindesc Changed the fade behavior of the event command "Move Location."
@author munokura
@license MIT License

@help
Changes the fade behavior of the "Move Location" event command.

Terms of Use:
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
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChangeTransfer.js
@plugindesc イベントコマンド「場所移動」のフェード挙動を変更します。
@author munokura

@help
イベントコマンド「場所移動」のフェード挙動を変更します。

利用規約:
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

    const _Scene_Map_startFadeIn = Scene_Map.prototype.startFadeIn;
    Scene_Map.prototype.startFadeIn = function (duration, white) {
        _Scene_Map_startFadeIn.call(this, duration, white);
        this.MNKR_ChangeTransfer();
    };

    const _Scene_Map_startFadeOut = Scene_Map.prototype.startFadeOut;
    Scene_Map.prototype.startFadeOut = function (duration, white) {
        _Scene_Map_startFadeOut.call(this, duration, white);
        this.MNKR_ChangeTransfer();
    };

    Scene_Map.prototype.MNKR_ChangeTransfer = function () {
        const transferDuration = PRM_fadeDurationVariables === 0 ? 0 : $gameVariables.value(PRM_fadeDurationVariables);
        if (transferDuration > 0) {
            this._fadeDuration = transferDuration;
        }
        if (PRM_Red > -1) {
            this._fadeSprite.setColor(PRM_Red, PRM_Green, PRM_Blue);
        }
    };

})();
