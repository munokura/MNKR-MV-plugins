/*
 * --------------------------------------------------
 * MNKR_ChoiceCols.js
 *   Ver.0.1.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChoiceCols.js
@plugindesc Adds the ability to change the number of columns and Y-axis position of options.
@author munokura
@license MIT License

@help
Adds the ability to change the number of columns and Y-axis position of
options.
Specify a variable ID in the plugin parameters, and the value of that variable
will be reflected in the selection.

Notes
1. The Y-position variable is initially set to 0, causing the option to appear
at the top of the screen.
To return to the default behavior, you must assign a negative value such as -1
beforehand.
2. If the Y-position variable's value is too large and it extends off-screen,
it will automatically be adjusted to the bottom of the screen.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without the author's
permission, and there are no restrictions on use (commercial, R18, etc.).

@param choiceColsVariableId
@text Column Number Variable ID
@desc This is the number of columns for the variable value. If the value is less than 2, it will be 1 column. If you do not want to use this function, specify "None".
@type variable
@default 0

@param choiceYpositionVariableId
@text Y position variable ID
@desc The variable value will be the Y-axis position of the option. If the value is negative, it will be the standard behavior. If you do not want to use the function, specify "None".
@type variable
@default 0
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChoiceCols.js
@plugindesc 選択肢の列数・Y軸位置を変更する機能を追加します。
@author munokura

@help
選択肢の列数・Y軸位置を変更する機能を追加します。
プラグインパラメーターで変数IDを指定し、その変数の値が選択に反映されます。

注意
1.Y位置指定の変数はゲーム開始時のままだと0なので、画面最上部に出ます。
  デフォルト動作にするには -1 などのマイナスの値を予め代入する必要があります。
2.Y位置指定の変数の値が大きすぎて画面外にはみ出る場合、
  自動的に画面最下部に調整されます。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param choiceColsVariableId
@text 列数変数ID
@type variable
@default 0
@desc 変数の値の列数になります。値が2未満の場合、1列になります。機能を使用しない場合「なし」を指定

@param choiceYpositionVariableId
@text Y位置変数ID
@type variable
@default 0
@desc 変数の値が選択肢のY軸位置になります。値がマイナスの場合、標準の動作になります。機能を使用しない場合「なし」を指定
*/

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.choiceColsVariableId = Number(parameters['choiceColsVariableId'] || 0);
    param.choiceYpositionVariableId = Number(parameters['choiceYpositionVariableId'] || 0);

    const useCols = param.choiceColsVariableId > 0;
    const useYpos = param.choiceYpositionVariableId > 0;

    if (useCols) {
        const _Window_ChoiceList_maxCols = Window_ChoiceList.prototype.maxCols;
        Window_ChoiceList.prototype.maxCols = function () {
            const choiceCols = $gameVariables.value(param.choiceColsVariableId);
            if (choiceCols > 1) {
                return choiceCols;
            }
            return _Window_ChoiceList_maxCols.call(this);
        };

        const _Window_ChoiceList_windowWidth = Window_ChoiceList.prototype.windowWidth;
        Window_ChoiceList.prototype.windowWidth = function () {
            const choiceCols = $gameVariables.value(param.choiceColsVariableId);
            if (choiceCols > 1) {
                const width = this.maxChoiceWidth() * choiceCols + this.padding * 2;
                return Math.min(width, Graphics.boxWidth);
            }
            return _Window_ChoiceList_windowWidth.call(this);
        };

        const _Window_ChoiceList_windowHeight = Window_ChoiceList.prototype.windowHeight;
        Window_ChoiceList.prototype.windowHeight = function () {
            const choiceCols = $gameVariables.value(param.choiceColsVariableId);
            if (choiceCols > 1) {
                return this.fittingHeight(Math.ceil(this.numVisibleRows() / choiceCols));
            }
            return _Window_ChoiceList_windowHeight.call(this);
        };
    }

    if (useYpos) {
        const _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
        Window_ChoiceList.prototype.updatePlacement = function () {
            _Window_ChoiceList_updatePlacement.call(this);
            const choiceY = $gameVariables.value(param.choiceYpositionVariableId);
            if (choiceY >= 0) {
                const maxY = Graphics.boxHeight - this.windowHeight();
                const fixChoiceY = choiceY > maxY ? maxY : choiceY;
                this.y = fixChoiceY;
            }
        };
    }

})();
