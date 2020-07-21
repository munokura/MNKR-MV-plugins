/*
 * --------------------------------------------------
 * MNKR_OpenWindowLinks Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc プラグインコマンドで、リンク先を新しいウィンドウに開きます。
 * @author munokura
 *
 * @help
 * プラグインコマンド
 *   MNKR_OpenWindow URL
 *     URLを新しいウィンドウに開きます。
 *
 *   使用例
 *     MNKR_OpenWindow http://fungamemake.com/
 *
 *
 * 謝辞
 *   コードの主要部分はトリアコンタン氏が公開しているコードです。
 *   https://gist.github.com/triacontane/8992baccfb35f985ec93107b8ced6c30
 *   トリアコンタン氏の活動に感謝申し上げます。
 */

(function(){
	'use strict';

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'MNKR_OpenWindow') this.openWindow(args);
	};

	Game_Interpreter.prototype.openWindow = function(args) {
		var url = String(args[0]);
		if (Utils.isNwjs()) {
			var exec = require('child_process').exec;
			switch (process.platform) {
				case 'win32':
					exec('rundll32.exe url.dll,FileProtocolHandler "' + url + '"');
					break;
				default:
					exec('open "' + url + '"');
					break;
			}
		} else {
			window.open(url);
		}
	};

})();