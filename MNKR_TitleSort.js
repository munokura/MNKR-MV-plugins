/*
 * --------------------------------------------------
 * MNKR_TitleSort.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TitleSort.js
@plugindesc Changes the order of the menus displayed on the title screen.
@author munokura
@license MIT License

@help
The menu order displayed on the title screen will be replaced with the
following.

Before: New Game / Continue / Options
After: Continue / New Game / Options

There are no plugin commands.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TitleSort.js
@plugindesc タイトル画面に表示されるメニューの順を置き換えます。
@author munokura

@help
タイトル画面に表示されるメニューの順を下記に置き換えます。

  変更前：ニューゲーム / コンティニュー / オプション
  変更後：コンティニュー / ニューゲーム / オプション

プラグインコマンドはありません。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

(function () {
	'use strict';

	Window_TitleCommand.prototype.makeCommandList = function () {
		this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
		this.addCommand(TextManager.newGame, 'newGame');
		this.addCommand(TextManager.options, 'options');
	};

})();
