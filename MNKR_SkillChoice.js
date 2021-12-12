/*
 * --------------------------------------------------
 * MNKR_SkillChoice.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_SkillChoice.js
 * @plugindesc スキル選択の処理とスキルの増減のプラグインコマンドを追加します。
 * @author munokura
 *
 * @help
 * スキル選択の処理とスキルの増減のプラグインコマンドを追加します。
 * 
 * スキル選択の処理
 * MNKR_SkillChoice select 変数ID アクターID
 * アクターIDで指定したスキルの一覧ウィンドウを開き、
 * 選択したスキルのIDを指定変数に代入します。
 * 
 * MNKR_SkillChoice learn アクターID スキルID
 * 
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            const choose = args[0];
            const selectParams = [Number(args[1]), Number(args[2])]
            switch (choose) {
                case 'select':
                    if (!$gameMessage.isBusy()) {
                        this.setupSkillChoice(selectParams);
                        console.log(selectParams);
                        this._index++;
                        this.setWaitMode('message');
                    }
                    return false;
                    break;
                default:
            }
        }
    };

    Game_Interpreter.prototype.setupSkillChoice = function (params) {
        $gameMessage.setSkillChoice(params[0], params[1]);
        console.log('setupSkillChoice');
        console.log(params);
    };

    Game_Message.prototype.setSkillChoice = function (variableId, skillId) {
        console.log('setSkillChoice');
        console.log(variableId);
        console.log(skillId);
        this._skillChoiceVariableId = variableId;
        this._skillChoiceSkillId = skillId;
    };

    Game_Message.prototype.skillChoiceItypeId = function () {
        console.log('skillChoiceItypeId');
        return this._skillChoiceSkillId;
    };

    Game_Message.prototype.skillChoiceVariableId = function () {
        console.log('skillChoiceVariableId');
        return this._skillChoiceVariableId;
    };

    function Window_EventSkill() {
        this.initialize.apply(this, arguments);
    }

    Window_EventSkill.prototype = Object.create(Scene_MenuBase.prototype);
    // Window_EventSkill.prototype = Object.create(Window_SkillList.prototype);
    // Window_EventSkill.prototype = Object.create(Window_ItemList.prototype);
    Window_EventSkill.prototype.constructor = Window_EventSkill;

    Window_EventSkill.prototype.initialize = function (messageWindow) {
        console.log('initialize');
        this._messageWindow = messageWindow;
        var width = Graphics.boxWidth;
        var height = this.windowHeight();
        Scene_MenuBase.prototype.initialize.call(this, 0, 0, width, height);
        // Window_SkillList.prototype.initialize.call(this, 0, 0, width, height);
        // Window_ItemList.prototype.initialize.call(this, 0, 0, width, height);
        this.openness = 0;
        this.deactivate();
        this.setHandler('ok', this.onOk.bind(this));
        this.setHandler('cancel', this.onCancel.bind(this));
    };

    Window_EventSkill.prototype.windowHeight = function () {
        console.log('windowHeight');
        return this.fittingHeight(this.numVisibleRows());
    };

    Window_EventSkill.prototype.numVisibleRows = function () {
        console.log('numVisibleRows');
        return 4;
    };

    Window_EventSkill.prototype.start = function () {
        console.log('start');
        this.refresh();
        this.updatePlacement();
        this.select(0);
        this.open();
        this.activate();
    };

    Window_EventSkill.prototype.updatePlacement = function () {
        console.log('updatePlacement');
        if (this._messageWindow.y >= Graphics.boxHeight / 2) {
            this.y = 0;
        } else {
            this.y = Graphics.boxHeight - this.height;
        }
    };

    Window_EventSkill.prototype.includes = function (skill) {
        console.log('includes');
        var itypeId = $gameMessage.skillChoiceItypeId();
        return DataManager.isSkill(skill) && skill.itypeId === itypeId;
    };

    Window_EventSkill.prototype.isEnabled = function (skill) {
        console.log('isEnabled');
        return true;
    };

    Window_EventSkill.prototype.onOk = function () {
        console.log('onOk');
        var skill = this.skill();
        var skillId = skill ? skill.id : 0;
        $gameVariables.setValue($gameMessage.skillChoiceVariableId(), skillId);
        this._messageWindow.terminateMessage();
        this.close();
    };

    Window_EventSkill.prototype.onCancel = function () {
        console.log('onCancel');
        $gameVariables.setValue($gameMessage.skillChoiceVariableId(), 0);
        this._messageWindow.terminateMessage();
        this.close();
    };

})();
