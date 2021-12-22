/*
 * --------------------------------------------------
 * MNKR_SkillChoiceScene.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_SkillChoiceScene.js
 * @plugindesc スキル選択シーンとスキルの増減のプラグインコマンドを追加します。
 * @author munokura
 *
 * @help
 * スキル選択シーンとスキルの増減のプラグインコマンドを追加します。
 * 
 * スキル選択シーン
 * MNKR_SkillChoice select アクターID 変数ID
 * アクターIDで指定したスキルの一覧ウィンドウを開き、
 * 選択したスキルのIDを指定変数に代入します。
 * 
 * 
 * スキルを増やす
 * MNKR_SkillChoice learn アクターID スキルID
 * 
 * 
 * スキルを減らす
 * MNKR_SkillChoice forget アクターID スキルID
 * 
 * 
 * 引数に変数を使いたい場合、下記のプラグインを併用ください。
 * http://newrpg.seesaa.net/article/475509661.html
 * NRP_EvalPluginCommand.js
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 *
 * @param windowX
 * @text ウィンドウX座標
 * @type number
 * @default 0
 * @desc スキル選択シーンのウィンドウX座標
 *
 * @param windowY
 * @text ウィンドウY座標
 * @type number
 * @default 0
 * @desc スキル選択シーンのウィンドウY座標
 *
 * @param windowWidth
 * @text ウィンドウ幅
 * @type number
 * @default 0
 * @desc スキル選択シーンのウィンドウ幅。0の場合、画面最大にします。
 *
 * @param windowHeight
 * @text ウィンドウ高さ
 * @type number
 * @default 0
 * @desc スキル選択シーンのウィンドウ高さ。0の場合、画面最大にします。
 */

(() => {
	"use strict";

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const parameters = PluginManager.parameters(pluginName);
	const param = {};
	param.windowX = Number(parameters['windowX'] || 0);
	param.windowY = Number(parameters['windowY'] || 0);
	param.windowWidth = Number(parameters['windowWidth'] || 0);
	param.windowHeight = Number(parameters['windowHeight'] || 0);
	param.windowWidth = param.windowWidth === 0 ? Graphics.boxWidth : param.windowWidth;
	param.windowHeight = param.windowHeight === 0 ? Graphics.boxHeight : param.windowHeight;

	const MNKR_SkillChoice = {
		choose: '',
		actorId: 0,
		selectSkillId: 0,
		variableId: 0
	};

	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);

		if (command === 'MNKR_SkillChoice') {
			MNKR_SkillChoice.choose = args[0];
			MNKR_SkillChoice.actorId = Number(args[1]);
			switch (MNKR_SkillChoice.choose) {
				case 'select':
					MNKR_SkillChoice.variableId = Number(args[2]);
					SceneManager.push(MNKR_Scene_SkillChoice);
					break;
				case 'learn':
					MNKR_SkillChoice.skillId = Number(args[2]);
					$gameActors.actor(MNKR_SkillChoice.actorId).learnSkill(MNKR_SkillChoice.skillId);
					break;
				case 'forget':
					MNKR_SkillChoice.skillId = Number(args[2]);
					$gameActors.actor(MNKR_SkillChoice.actorId).forgetSkill(MNKR_SkillChoice.skillId);
					break;
				default:
			}
		}
	};

	//-----------------------------------------------------------------------------
	// MNKR_Scene_SkillChoice

	function MNKR_Scene_SkillChoice() {
		this.initialize.apply(this, arguments);
	}

	MNKR_Scene_SkillChoice.prototype = Object.create(Scene_MenuBase.prototype);
	MNKR_Scene_SkillChoice.prototype.constructor = MNKR_Scene_SkillChoice;

	MNKR_Scene_SkillChoice.prototype.create = function () {
		Scene_MenuBase.prototype.create.call(this);
		this.createSkillChoiceWindow();
	};

	MNKR_Scene_SkillChoice.prototype.createSkillChoiceWindow = function () {
		this._skillChoiceWindow = new MNKR_Window_SkillChoice(0, 0);
		this._skillChoiceWindow.setHandler('ok', this.onItemOk.bind(this));
		this._skillChoiceWindow.setHandler('cancel', this.onItemCancel.bind(this));
		this.addWindow(this._skillChoiceWindow);
	};

	MNKR_Scene_SkillChoice.prototype.onItemOk = function () {
		MNKR_SkillChoice.selectSkillId = this._skillChoiceWindow.item().id;
		$gameVariables.setValue(MNKR_SkillChoice.variableId, MNKR_SkillChoice.selectSkillId);
		this.popScene();
	};

	MNKR_Scene_SkillChoice.prototype.onItemCancel = function () {
		this.popScene();
	};

	//-----------------------------------------------------------------------------
	// MNKR_Window_SkillChoice

	function MNKR_Window_SkillChoice() {
		this.initialize.apply(this, arguments);
	}

	MNKR_Window_SkillChoice.prototype = Object.create(Window_SkillList.prototype);
	MNKR_Window_SkillChoice.prototype.constructor = MNKR_Window_SkillChoice;

	MNKR_Window_SkillChoice.prototype.initialize = function () {
		Window_SkillList.prototype.initialize.call(this, param.windowX, param.windowY, param.windowWidth, param.windowHeight);
		this._actor = $gameActors.actor(MNKR_SkillChoice.actorId);
		this._data = this._actor.skills();
		this.refresh();
		this.select(0);
		this.activate();
	};

	MNKR_Window_SkillChoice.prototype.refresh = function () {
		Window_Selectable.prototype.refresh.call(this);
	};

	MNKR_Window_SkillChoice.prototype.drawItem = function (index) {
		const skill = this._data[index];
		if (skill) {
			var rect = this.itemRect(index);
			rect.width -= this.textPadding();
			this.drawItemName(skill, rect.x, rect.y, rect.width);
			this.changePaintOpacity(1);
		}
	};

	MNKR_Window_SkillChoice.prototype.isEnabled = function () {
		return true;
	};

})();
