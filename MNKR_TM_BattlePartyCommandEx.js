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
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TM_BattlePartyCommandEx.js
@plugindesc v1.0 The number of displayed party commands during battle can be automatically adjusted.
@author munokura
@license MIT License

@help
TMPlugin - Battle Command Extension Ver. 1.0.1
https://hikimoki.sakura.ne.jp/plugin/TMBattleCommandEx.js
This plugin is based on the original, but has been modified to provide the
same functionality for party commands.
The file name has been changed so that it can be used simultaneously with the
Battle Command Extension.

How to Use:

Installing this plugin will allow the size (number of displayed commands) of
party commands during battle to be variable.

If PartyCommandAutoResize (Party Command (height) auto-adjustment) is OFF,
it will be fixed at the size set in PartyBasicVisibleRows (number of party
command basic display rows).

There are no plugin commands.

This is a modification of TMBattleCommandEx.js by tomoaky.
Please contact the modifier with any questions.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).

@param PartyBasicVisibleRows
@text Party command basic display line count
@desc Party command default display lines
@type number
@default 4

@param PartyMaxVisibleRows
@text Party command maximum display lines
@desc Maximum number of lines displayed for party commands
@type number
@default 6

@param PartyCommandAutoResize
@text Party command (height) automatic adjustment
@desc Auto adjust party command (height)
@type boolean
@on valid
@off invalid
@default true
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TM_BattlePartyCommandEx.js
@plugindesc v1.0 戦闘中のパーティコマンドの表示コマンド数が自動調整できます
@author tomoaky (改変 munokura)

@help
TMPlugin - バトルコマンド拡張 Ver1.0.1
https://hikimoki.sakura.ne.jp/plugin/TMBattleCommandEx.js
を元に、パーティコマンドに同じ機能を反映する改変をしたプラグインです。
バトルコマンド拡張と同時使用できるようにファイル名等を変更しています。

使い方:

プラグインを導入すると戦闘中のパーティコマンドの
サイズ(表示コマンド数)が可変になります。

PartyCommandAutoResize(パーティコマンド(高さ)自動調整) がOFFの場合、
可変ではなく、PartyBasicVisibleRows(パーティコマンド基本表示行数)に
設定したサイズに固定されます。

プラグインコマンドはありません。

これはtomoaky氏作 TMBattleCommandEx.js を改変したものです。
質問は改変者へお願いいたします。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param PartyBasicVisibleRows
@text パーティコマンド基本表示行数
@type number
@desc パーティコマンドの基本表示行数
初期値: 4
@default 4

@param PartyMaxVisibleRows
@text パーティコマンド最大表示行数
@type number
@desc パーティコマンドの最大表示行数
初期値: 6
@default 6

@param PartyCommandAutoResize
@text パーティコマンド(高さ)自動調整
@type boolean
@on 有効
@off 無効
@desc パーティコマンド(高さ)を自動調整する
初期値:有効 / 無効:false / 有効:true
@default true
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
