/*
 * --------------------------------------------------
 * MNKR_GoldIcon Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc 通貨単位の表示をアイコンに置き換えます
 * @author munokura
 *
 * @param Gold Icon
 * @text 通貨アイコンID
 * @type string
 * @desc 通貨の単位に使用するアイコンID
 * @default 313
 *
 * @help
 * 通貨単位の表示をアイコンに置き換えます。
 *
 * プラグインコマンドはありません。
 */

(function() {
	'use strict';

    var parameters = PluginManager.parameters('MNKR_GoldIcon');
	var goldIcon = parseInt(parameters['Gold Icon'] || 313);

	Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
		this.resetTextColor();
		this.drawText(value, x, y, width - 36 - 6, 'right');
		this.drawIcon(goldIcon, x + width - 36, y);
	};

})();