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
 * プラグインコマンドはありません。
 */

(function(){
	'use strict';

	Scene_Map.prototype.startEncounterEffect = function() {
		this._encounterEffectDuration = this.encounterEffectSpeed();
	};

})();
