﻿/*
 * --------------------------------------------------
 * MNKR_NotFlashEncount Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc エンカウント時のフラッシュを止めます。
 * @author munokura
 *
 * @help
 * エンカウント時のフラッシュを止めます。
 *
 * プラグインコマンドや設定はありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
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
