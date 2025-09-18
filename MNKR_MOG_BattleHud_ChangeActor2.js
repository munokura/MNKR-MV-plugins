/*
 * --------------------------------------------------
 * MNKR_MOG_BattleHud_ChangeActor2.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_MOG_BattleHud_ChangeActor2.js
@plugindesc When the activation switch is ON, the actor's display image will be changed to the image with the specified number.
@author munokura
@license MIT License

@help
This is a patch plugin for MOG_BattleHud (v5.04).
MOG_BattleHud is required to function.
Place this plugin below MOG_BattleHud in the Plugin Manager.

When the activation switch is ON, the actor's display image will be changed to
the image with the specified number.
The configured list is processed in order from top to bottom, and the one that
matches the conditions will be adopted.
For this reason, if there are duplicate settings, the topmost one will be
applied.

@param Change Face
@text Change combination
@desc Change combination
@type struct<changeFaceList>[]
@default ["{\"switchId\":\"11\",\"beforeFaceId\":\"1\",\"afterFaceId\":\"2\"}"]
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_MOG_BattleHud_ChangeActor2.js
@plugindesc 発動スイッチがONの時、アクターの表示画像を指定番号画像に切り替えます。
@author munokura

@param Change Face
@text 変更組合せ
@desc 変更組合せ
@type struct<changeFaceList>[]
@default ["{\"switchId\":\"11\",\"beforeFaceId\":\"1\",\"afterFaceId\":\"2\"}"]

@help
MOG_BattleHud (v5.04)用のパッチプラグインです。
動作にはMOG_BattleHudが必要です。
このプラグインはプラグイン管理でMOG_BattleHudの下に配置してください。

発動スイッチがONの時、アクターの表示画像を指定番号画像に切り替えます。
設定したリストは上から順に処理され、条件に適合した時点で採用されます。
このため、重複する設定は上にあるものが反映されます。
*/

(function(){
	'use strict';

	var parameters = PluginManager.parameters('MNKR_MOG_BattleHud_ChangeActor2');

	var param = JSON.parse(JSON.stringify(parameters, function(key, value) {
		try {
			return JSON.parse(value);
		} catch (e) {
			try {
				return eval(value);
			} catch (e) {
				return value;
			}
		}
	}));

	var changeFaceList = param["Change Face"] || [];

	function changeFace(faceId) {
		var faceList;
		var count = changeFaceList.length;
		for (var i = 0; i < count; i++) {
			faceList = changeFaceList[i];
			if (($gameSwitches.value(faceList.switchId)) && faceList.beforeFaceId === faceId && faceList.afterFaceId) {
					faceId = faceList.afterFaceId;
					break;
				};
		};
		return "Face_" + faceId;
	};

//==============================
// * Create Face
//==============================
	Battle_Hud.prototype.create_face = function() {
		if (String(Moghunter.bhud_face_visible) != "true") {
			return;
		};

		this.removeChild(this._face);

		if (!this._battler) {
			return;
		};

		var actorFace = this._battler._actorId;
		var changeFaceId = changeFace(actorFace);
		this._face = new Sprite(ImageManager.loadBHud(changeFaceId));
		this._face.anchor.x = 0.5;
		this._face.anchor.y = 0.5;
		this._face_data = [0,0,false,false,false,-1];
		this._face.ph = 0;
		this._face.animation = [-1,0,0,0,0,0,0,0,0];
		this._face.breathEffect = this._battler._bhud.faceBreath;
		this._face.scaleY = 0;

		if (String(Moghunter.bhud_face_shake) === "true") {
			this._face_data[2] = true;
		};

		if (String(Moghunter.bhud_face_animated) === "true") {
			this._face_data[4] = true;
		};

		this._battler._bhud_face_data = [0,0,0,1];
		this.addChild(this._face);
	};

})();