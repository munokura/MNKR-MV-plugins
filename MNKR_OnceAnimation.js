/*
 * --------------------------------------------------
 * MNKR_OnceAnimation Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc スキルの連続回数が2回以上の場合、戦闘アニメーション再生回数を1回にします。
 * @author munokura
 *
 * @help
 * スキルの連続回数が2回以上の場合、戦闘アニメーション再生回数を1回にします。
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

	Game_Battler.prototype.startAnimation = function(animationId, mirror, delay) {
	    var data = { animationId: animationId, mirror: mirror, delay: delay };
	    if (this._animations.length === 0) {
	    	this._animations.push(data);
	    };
	};

})();
