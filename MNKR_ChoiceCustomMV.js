/*
 * --------------------------------------------------
 * MNKR_ChoiceCustomMV.js
 *   Ver.0.1.2
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChoiceCustomMV.js
@plugindesc Adds the ability to change the number of columns, rows, and Y-axis position of the options.
@author munokura
@license MIT License

@help
# Feature
Adds the ability to change the number of columns, rows, and Y-axis position of
options.
You can control the display of options using plugin commands.

# Plugin Commands

## Setting the Number of Columns
SetChoiceColumns [Number of Columns]
- Sets the number of columns for choices
- Specify a value of 1 or greater.

### Example: Displaying two columns
SetChoiceColumns 2

## Setting the Number of Rows
SetChoiceRows [Number of Rows]
- Sets the number of rows for choices
- Specify a value of 1 or greater.

### Example: Displaying two rows
SetChoiceRows 2

## Setting the Y-Axis Position
SetChoiceYPosition [Position]
- Sets the Y-Axis position for choices
- Specify a position value of 0 or greater.

### Example: Top of the screen
SetChoiceYPosition 0

## Reset Settings
ResetChoiceSettings
- Resets all settings to default.

### Example: Reset all settings
ResetChoiceSettings

# Notes

## About the Y-Axis Position
- If the Y position is too large and extends off the screen,
it will automatically be adjusted to the top of the screen.
- If the number of rows specified results in a window size that exceeds the
resolution,
it will automatically adjust the window size and display it at the top of the
screen.

## Combination of rows and columns
- The number of rows can be used in combination with the number of columns.
- If the number of rows x columns is less than the total number of options,
scrolling will be enabled.

### Example: Display 2 columns x 3 rows (displays up to 6 options)
SetChoiceColumns 2
SetChoiceRows 3

# Terms of Use

MIT License.
http://opensource.org/licenses/mit-license.php

Modification and redistribution are permitted without permission from the
author,
and there are no restrictions on usage (commercial, R18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChoiceCustomMV.js
@plugindesc 選択肢の列数・行数・Y軸位置を変更する機能を追加します。
@author munokura

@help
# 機能
選択肢の列数・行数・Y軸位置を変更する機能を追加します。
プラグインコマンドで選択肢の表示を制御できます。

# プラグインコマンド

## 列数の設定
SetChoiceColumns [列数]
- 選択肢の列数を設定します
- 列数は1以上を指定してください

### 記述例：2列表示
SetChoiceColumns 2

## 行数の設定
SetChoiceRows [行数]
- 選択肢の行数を設定します
- 行数は1以上を指定してください

### 記述例：2行表示
SetChoiceRows 2

## Y軸位置の設定
SetChoiceYPosition [位置]
- 選択肢のY軸位置を設定します
- 位置は0以上を指定してください

### 記述例：画面最上部
SetChoiceYPosition 0

## 設定のリセット
ResetChoiceSettings
- すべての設定をデフォルトに戻します

### 記述例：すべての設定をリセット
ResetChoiceSettings

# 注意事項

## Y軸位置について
- Y位置指定の値が大きすぎて画面外にはみ出る場合、
  自動的に画面最上部に調整されます
- 行数指定により解像度を越えるウィンドウサイズになる場合、
  ウィンドウサイズが自動的に調整され、
  画面最上部に表示されます。

## 行数と列数の組み合わせ
- 行数指定は、列数指定と組み合わせて使用できます
- 行数×列数が選択肢の総数より少ない場合、スクロール可能になります

### 記述例：2列×3行の表示（最大6個の選択肢を表示）
SetChoiceColumns 2
SetChoiceRows 3

# 利用規約

MITライセンスです。
http://opensource.org/licenses/mit-license.php

作者に無断で改変、再配布が可能で、
利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    // 設定値を保持する変数
    const settings = {
        columns: 0,
        rows: 0,
        yPosition: -1
    };

    // 設定をリセットする関数
    function resetSettings() {
        settings.columns = 0;
        settings.rows = 0;
        settings.yPosition = -1;
    }

    // プラグインコマンドの登録
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        switch (command) {
            case 'SetChoiceColumns':
                settings.columns = Number(args[0]);
                break;
            case 'SetChoiceRows':
                settings.rows = Number(args[0]);
                break;
            case 'SetChoiceYPosition':
                settings.yPosition = Number(args[0]);
                break;
            case 'ResetChoiceSettings':
                resetSettings();
                break;
        }
    };

    // 選択肢ウィンドウの拡張
    const _Window_ChoiceList_maxCols = Window_ChoiceList.prototype.maxCols;
    Window_ChoiceList.prototype.maxCols = function () {
        return settings.columns > 0 ? settings.columns : _Window_ChoiceList_maxCols.call(this);
    };

    const _Window_ChoiceList_windowWidth = Window_ChoiceList.prototype.windowWidth;
    Window_ChoiceList.prototype.windowWidth = function () {
        if (settings.columns <= 0) {
            return _Window_ChoiceList_windowWidth.call(this);
        }
        const width = this.maxChoiceWidth() * settings.columns + this.padding * 2;
        return Math.min(width, Graphics.boxWidth);
    };

    const _Window_ChoiceList_windowHeight = Window_ChoiceList.prototype.windowHeight;
    Window_ChoiceList.prototype.windowHeight = function () {
        if (settings.rows > 0) {
            return this.fittingHeight(settings.rows);
        }
        if (settings.columns <= 0) {
            return _Window_ChoiceList_windowHeight.call(this);
        }
        return this.fittingHeight(Math.ceil(this.numVisibleRows() / settings.columns));
    };

    const _Window_ChoiceList_numVisibleRows = Window_ChoiceList.prototype.numVisibleRows;
    Window_ChoiceList.prototype.numVisibleRows = function () {
        return settings.rows > 0 ? settings.rows : _Window_ChoiceList_numVisibleRows.call(this);
    };

    const _Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
    Window_ChoiceList.prototype.updatePlacement = function () {
        _Window_ChoiceList_updatePlacement.call(this);

        // ウィンドウサイズの自動調整
        if (settings.rows > 0) {
            const maxHeight = Graphics.boxHeight;
            if (this.height > maxHeight) {
                this.height = maxHeight;
                this.y = 0; // 画面最上部に表示
                return; // サイズ調整後はY軸位置の調整をスキップ
            }
        }

        // Y軸位置の調整
        if (settings.yPosition >= 0) {
            const maxY = Graphics.boxHeight - this.height;
            this.y = Math.min(settings.yPosition, maxY);
        }
    };

})();