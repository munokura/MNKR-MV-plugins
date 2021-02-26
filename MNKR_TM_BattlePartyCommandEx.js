/*
 * --------------------------------------------------
 * MNKR_TM_BattlePartyCommandEx.js
 *   Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
//============================================================================
// TMVplugin - バトルコマンド拡張
// バージョン: 1.0.1
// 最終更新日: 2019/11/06
// 配布元    : https://hikimoki.sakura.ne.jp/
//----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//============================================================================

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TM_BattlePartyCommandEx.js
 * @plugindesc v1.0 戦闘中のパーティコマンドの表示コマンド数が自動調整できます
 * @author tomoaky (改変 munokura)
 *
 * @help
 * TMPlugin - バトルコマンド拡張 Ver1.0.1
 * https://hikimoki.sakura.ne.jp/plugin/TMBattleCommandEx.js
 * を元に、パーティコマンドに同じ機能を反映する改変をしたプラグインです。
 * バトルコマンド拡張と同時使用できるようにファイル名等を変更しています。
 *
 * 使い方:
 *
 * プラグインを導入すると戦闘中のパーティコマンドの
 * サイズ(表示コマンド数)が可変になります。
 *
 * PartyCommandAutoResize(パーティコマンド(高さ)自動調整) がOFFの場合、
 * 可変ではなく、PartyBasicVisibleRows(パーティコマンド基本表示行数)に
 * 設定したサイズに固定されます。
 *
 * プラグインコマンドはありません。
 *
 *
 * これはtomoaky氏作 TMBattleCommandEx.js を改変したものです。
 * 質問は改変者へお願いいたします。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param PartyBasicVisibleRows
 * @text パーティコマンド基本表示行数
 * @type number
 * @desc パーティコマンドの基本表示行数
 * 初期値: 4
 * @default 4
 *
 * @param PartyMaxVisibleRows
 * @text パーティコマンド最大表示行数
 * @type number
 * @desc パーティコマンドの最大表示行数
 * 初期値: 6
 * @default 6
 *
 * @param PartyCommandAutoResize
 * @text パーティコマンド(高さ)自動調整
 * @type boolean
 * @on 有効
 * @off 無効
 * @desc パーティコマンド(高さ)を自動調整する
 * 初期値:有効 / 無効:false / 有効:true
 * @default true
 */

var Imported = Imported || {};
Imported.TMBattleCommandEx = true;
(function() {
	'use strict';

	var parameters = PluginManager.parameters('MNKR_TM_BattlePartyCommandEx');
	var PartyBasicVisibleRows = +(parameters['PartyBasicVisibleRows'] || 4);
	var PartyMaxVisibleRows = +(parameters['PartyMaxVisibleRows'] || 6);
	var PartyCommandAutoResize = JSON.parse(parameters['PartyCommandAutoResize']);
	//----------------------------------------------------------------------------
	// Window_PartyCommand
	//
	Window_PartyCommand.prototype.numVisibleRows = function() {
		if (PartyCommandAutoResize) {
			var result = this._list ? this._list.length : PartyBasicVisibleRows;
			return Math.min(result, PartyMaxVisibleRows);
			} else {
			return PartyBasicVisibleRows;
		};
	};

	const _Window_PartyCommand_refresh = Window_PartyCommand.prototype.refresh;
	Window_PartyCommand.prototype.refresh = function() {
		if (PartyCommandAutoResize) {
			var wh = this.fittingHeight(this.numVisibleRows());
			this.move(this.x, Graphics.boxHeight - wh, this.windowWidth(), wh);
		};
		_Window_PartyCommand_refresh.call(this);
	};

	//----------------------------------------------------------------------------
	// Scene_Battle
	//
	const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
	Scene_Battle.prototype.startPartyCommandSelection = function() {
		_Scene_Battle_startPartyCommandSelection.call(this);
	};

})();
