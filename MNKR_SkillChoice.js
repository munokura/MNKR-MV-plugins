/*
 * --------------------------------------------------
 * MNKR_SkillChoice.js
 *   Ver.0.0.5
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
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const MNKR_SkillChoice = {
        choose: null,
        actorId: null,
        modeSkill: false,
        variableId: null
    };

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            MNKR_SkillChoice.choose = args[0];
            MNKR_SkillChoice.actorId = Number(args[1]);
            switch (MNKR_SkillChoice.choose) {
                case 'select':
                    MNKR_SkillChoice.modeSkill = true;
                    MNKR_SkillChoice.variableId = Number(args[2]);
                    this._params = [MNKR_SkillChoice.variableId, MNKR_SkillChoice.actorId];
                    if (!$gameMessage.isBusy()) {
                        this.setupItemChoice(this._params);
                        this._index++;
                        this.setWaitMode('message');
                    }
                    return false;
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

    const _Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
    Window_ItemList.prototype.makeItemList = function () {
        if (MNKR_SkillChoice.modeSkill) {
            this._data = $gameActors.actor(MNKR_SkillChoice.actorId).skills();
            const item = this._data;
        } else {
            _Window_ItemList_makeItemList.call(this);
        }
    };

    const _Window_ItemList_drawAllItems = Window_ItemList.prototype.drawAllItems;
    Window_ItemList.prototype.drawAllItems = function () {
        if (MNKR_SkillChoice.modeSkill) {
            const topIndex = this.topIndex();
            for (let i = 0; i < this.maxPageItems(); i++) {
                const index = topIndex + i;
                if (index < this.maxItems()) {
                    this.drawSkill(index);
                }
            }
        } else {
            _Window_ItemList_drawAllItems.call(this);
        }
    };

    Window_ItemList.prototype.drawSkill = function (index) {
        const item = this._data[index];
        if (item) {
            const rect = this.itemRect(index);
            rect.width -= this.textPadding();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
    };

    const _Window_EventItem_onOk = Window_EventItem.prototype.onOk;
    Window_EventItem.prototype.onOk = function () {
        _Window_EventItem_onOk.call(this);
        MNKR_SkillChoice.modeSkill = false;
    };

    const _Window_EventItem_onCancel = Window_EventItem.prototype.onCancel;
    Window_EventItem.prototype.onCancel = function () {
        _Window_EventItem_onCancel.call(this);
        MNKR_SkillChoice.modeSkill = false;
    };

})();
