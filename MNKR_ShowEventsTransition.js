/*
 * --------------------------------------------------
 * MNKR_ShowEventsTransition Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc エンカウント時にマップイベントが表示されたままになります。
 * @author munokura
 *
 * @help
 * エンカウント時にマップイベントが表示されたままになります。
 *
 * プラグインコマンドはありません。
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

	Scene_Map.prototype.startEncounterEffect = function() {
		this._encounterEffectDuration = this.encounterEffectSpeed();
	};

})();
