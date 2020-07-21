/*
 * --------------------------------------------------
 * MNKR_TitleSort Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc タイトル画面に表示されるメニューの順を置き換えます。
 * @author munokura
 *
 * @help
 * タイトル画面に表示されるメニューの順を下記に置き換えます。
 * 
 *   変更前：ニューゲーム / コンティニュー / オプション
 *   変更後：コンティニュー / ニューゲーム / オプション
 */

(function () {
	'use strict';

	Window_TitleCommand.prototype.makeCommandList = function () {
		this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
		this.addCommand(TextManager.newGame, 'newGame');
		this.addCommand(TextManager.options, 'options');
	};

})();
