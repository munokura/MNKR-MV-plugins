/*
 * --------------------------------------------------
 * MNKR_NonBlurBackground Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc メインメニューの背景を鮮明に表示します。
 * @author munokura
 *
 * @help
 * メインメニューの背景を鮮明に表示します。
 * 戦闘背景がマップの場合も鮮明になります。
 *
 * プラグインコマンドや設定はありません。
 */

(function(){
	'use strict';

	SceneManager.snapForBackground = function() {
		this._backgroundBitmap = this.snap();
	};

})();
