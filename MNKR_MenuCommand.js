/*
 * --------------------------------------------------
 * MNKR_MenuCommand.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_MenuCommand.js
 * @plugindesc メインメニューのコマンドウィンドウの表示を設定します。
 * @author munokura
 *
 * @help
 * メインメニューのコマンドウィンドウの表示を設定します。
 *
 * 他の要素については「GUI画面デザインプラグイン（トリアコンタン様作）」で
 * 設定することをお勧めします。
 *
 * ---------------------------------------------------------------------------
 * https://triacontane.blogspot.com/2016/03/gui.html
 *   1. ウィンドウの横幅
 *   2. ウィンドウの高さ
 *   3. ウィンドウの余白
 *   4. ウィンドウのフォントサイズ
 *   5. ウィンドウの1行のあたりの高さ
 *   6. ウィンドウの背景透明度
 *   7. ウィンドウの行数
 *   8. ウィンドウの背景画像ファイル名
 *   9. ウィンドウのフォント名
 * ---------------------------------------------------------------------------
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param Max Cols
 * @text 横コマンド数
 * @type number
 * @min 1
 * @desc ツクールデフォルト:1
 * @default 2
 *
 * @param Command Alignment
 * @text コマンド行揃え
 * @type select
 * @option 左
 * @value left
 * @option 中央
 * @value center
 * @option 右
 * @value right
 * @desc 左:left / 中央:center / 右:right
 * ツクールデフォルト:left
 * @default left
 */

(function(){
	'use strict';

	var parameters = PluginManager.parameters('MNKR_MenuCommand');
	var MaxCols = Number(parameters['Max Cols'] || 2);
	var CmdAlign = String(parameters['Command Alignment'] || 'left');

	const _Window_MenuCommand_maxCols = Window_MenuCommand.prototype.maxCols;
	Window_MenuCommand.prototype.maxCols = function() {
		_Window_MenuCommand_maxCols.call(this);
		return MaxCols;
	};

	const _Window_MenuCommand_itemTextAlign = Window_MenuCommand.prototype.itemTextAlign;
	Window_MenuCommand.prototype.itemTextAlign = function() {
		_Window_MenuCommand_itemTextAlign.call(this);
		return CmdAlign;
	};

})();
