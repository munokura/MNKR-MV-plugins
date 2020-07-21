/*
 * --------------------------------------------------
 * MNKR_GameOverMusicSwitch Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:ja
 * @plugindesc 指定スイッチがONの場合、ゲームオーバー時に直前のBGMが流れ続けます
 * @author munokura
 *
 * @param Switch Id
 * @text スイッチID
 * @type switch
 * @desc 発動させるスイッチID
 * @default 11
 *
 * @help
 * スイッチがONの場合、
 * ゲームオーバー時に直前のBGMが流れ続ます。
 */

(function(){
	'use strict';

	var parameters = PluginManager.parameters('MNKR_GameOverMusicSwitch');
	var switchId = Number(parameters['Switch Id'] || 11);

	const _Scene_Gameover_playGameoverMusic = Scene_Gameover.prototype.playGameoverMusic
	Scene_Gameover.prototype.playGameoverMusic = function() {
		if($gameSwitches.value(switchId)) {
		} else {
			_Scene_Gameover_playGameoverMusic.call(this);
		};
	};

})();
