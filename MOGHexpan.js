//============================================================================
// MOGHexpan.js
//============================================================================

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MOGHexpan.js
 * @plugindesc ver1.04 MOG_BattleHud(v5.04)拡張
 * @author まっつＵＰ (改変:munokura)
 *
 * @help
 * RPGで笑顔を・・・
 *
 * このヘルプとパラメータの説明をよくお読みになってからお使いください。
 *
 * Moghunter様作のMOG_BattleHudに改変を加えます。
 * MOG_BattleHudよりも下に導入してください。
 * 主にプラグインコマンドの追加をします。
 *
 * ＜戦闘フェイス画像を変更する場合＞
 * （プラグインコマンド）
 * MOGH update x y
 * xは変数ID、yは加算値（数値） 
 * 変数IDxの値と同じIDのアクターの戦闘フェイス画像を
 * Face_ + (変数IDxの値 + y).pngを指定して表示します。
 * このプラグインコマンドのよる画像変更は
 * その戦闘中のみ適用されます。
 * （次の戦闘開始時は再び初期設定の画像を表示）
 *
 * 例：
 * MOGH update 20 100
 * 変数ID20の値を1にした後
 * 変数ID20の値と同じIDのアクターの戦闘フェイス画像をFace_ 101.pngにする。
 * (この時、ID1のアクターが指定される)
 *
 *
 * ＜戦闘フェイス画像を戦闘開始時のものにする場合＞
 * （プラグインコマンド）
 * 例：
 * MOGH update 20
 * 変数ID20の値と同じIDのアクターの戦闘フェイス画像を戦闘開始時のものに戻す。
 *
 *
 * # 利用規約(2020/04/03変更)：
 * この作品は マテリアル・コモンズ・ブルー・ライセンスの下に提供されています。
 * https://ja.materialcommons.org/mtcm-b-summary/
 * クレジット表示：まっつＵＰ (改変munokura)
 *
 */

var parameters = PluginManager.parameters('MOGHexpan');

var MOGHupdateactorId = 0;
var MOGHupdateaddnum = 0;

var _MOGH_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	_MOGH_pluginCommand.call(this, command, args);
	if (command === 'MOGH') {
		var valueid = Number(args[1] || 0);
		var addnum = Number(args[2] || 0);
		MOGHupdateactorId = $gameVariables.value(valueid);
		switch (args[0]) {
			case 'update':
				MOGHupdateaddnum = MOGHupdateactorId + addnum;
				break;
		};
	};
};

//一応フレームアニメーションの処理内容はフックで残す。
var _MOGH_update_face_animation = Battle_Hud.prototype.update_face_animation;
Battle_Hud.prototype.update_face_animation = function () {
	if (MOGHupdateaddnum > 0 && MOGHupdateactorId === this._battler._actorId) {
		this.create_faceMOGH();
	};
	_MOGH_update_face_animation.call(this);
};

Battle_Hud.prototype.create_faceMOGH = function () {

	if (String(Moghunter.bhud_face_visible) != "true") {
		return;
	};

	this.removeChild(this._face);

	if (!this._battler) {
		return;
	};

	this._face = new Sprite(ImageManager.loadBHud("Face_" + MOGHupdateaddnum));
	this._face.anchor.x = 0.5;
	this._face.anchor.y = 0.5;
	this._face_data = [0, 0, false, false, false, -1];
	this._face.ph = 0;
	this._face.animation = [-1, 0, 0, 0, 0, 0, 0, 0, 0];
	this._face.breathEffect = this._battler._bhud.faceBreath;
	this._face.scaleY = 0;

	if (String(Moghunter.bhud_face_shake) === "true") {
		this._face_data[2] = true
	};
	if (String(Moghunter.bhud_face_animated) === "true") {
		this._face_data[4] = true
	};

	this._battler._bhud_face_data = [0, 0, 0, 1];
	this.addChild(this._face);
	this.refresh_position();
	this.base_parameter_clear();
	MOGHupdateactorId = 0;
	MOGHupdateaddnum = 0;

};