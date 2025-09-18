/*
 * --------------------------------------------------
 * MNKR_NotFlashEncount.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_NotFlashEncount.js
@plugindesc Stops flashing during encounters.
@author munokura
@license MIT License

@help
Disables flashing during encounters.

No plugin commands or settings.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_NotFlashEncount.js
@plugindesc エンカウント時のフラッシュを止めます。
@author munokura

@help
エンカウント時のフラッシュを止めます。

プラグインコマンドや設定はありません。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

(function(){
	'use strict';

	Scene_Map.prototype.updateEncounterEffect = function() {
		if (this._encounterEffectDuration > 0) {
			this._encounterEffectDuration--;
			var speed = this.encounterEffectSpeed();
			var n = speed - this._encounterEffectDuration;
			var p = n / speed;
			var q = ((p - 1) * 20 * p + 5) * p + 1;
			var zoomX = $gamePlayer.screenX();
			var zoomY = $gamePlayer.screenY() - 24;
			if (n === 2) {
				$gameScreen.setZoom(zoomX, zoomY, 1);
				this.snapForBattleBackground();
			};
			$gameScreen.setZoom(zoomX, zoomY, q);
			if (n === Math.floor(speed / 2)) {
				BattleManager.playBattleBgm();
				this.startFadeOut(this.fadeSpeed());
			};
		};
	};

})();
