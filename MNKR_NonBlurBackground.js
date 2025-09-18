/*
 * --------------------------------------------------
 * MNKR_NonBlurBackground.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_NonBlurBackground.js
@plugindesc The main menu background is displayed clearly.
@author munokura
@license MIT License

@help
Displays the main menu background clearly.
This also makes the battle background clearer when it's a map.

There are no plugin commands or settings.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_NonBlurBackground.js
@plugindesc メインメニューの背景を鮮明に表示します。
@author munokura

@help
メインメニューの背景を鮮明に表示します。
戦闘背景がマップの場合も鮮明になります。

プラグインコマンドや設定はありません。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

(function(){
	'use strict';

	SceneManager.snapForBackground = function() {
		this._backgroundBitmap = this.snap();
	};

})();
