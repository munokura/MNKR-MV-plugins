/*
 * --------------------------------------------------
 * MNKR_BeforeCommonPatch.js
 *   Ver.0.0.1
 * Copyright (c) 2024 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @base BeforeCommon
 * @orderAfter BeforeCommon
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_BeforeCommonPatch.js
 * @plugindesc 発動前コモン(BeforeCommon.js)のパッチ。バトルログに使用を表示してからコモンイベントを実行するプラグインコマンドを追加します。
 * @author ecf5DTTzl6h6lJj02 (改変:ムノクラ)
 *
 * @help
 * 発動前コモン(BeforeCommon.js)のパッチプラグインです。
 * プラグイン管理リストで、このプラグインをBeforeCommonの下側に配置してください。
 * 
 * 発動前コモンを使用したスキル・アイテムでの動作は、
 * スキル・アイテム使用->コモンイベント->使用メッセージ->ダメージ表示
 * となります。
 * 
 * 追加されたプラグインコマンドをコモンイベントに使用すると、
 * スキル・アイテム使用->使用メッセージ->コモンイベント->ダメージ表示
 * に変化します。
 * 
 * 
 * ▼使い方：
 * スキル・アイテムを実行する前のコモンイベントの最初で、
 * このプラグインコマンドを実行してください。
 * プラグインコマンドを実行しない場合、
 * このパッチは動作しない通常のプラグイン動作となります。
 * 
 * プラグインコマンド
 * MNKR_BeforeCommonPatch コモンイベント実行前のウェイト数値（省略可能）
 * 
 * 記述例：使用メッセージ後、60ウェイト後にコモンイベント実行
 * MNKR_BeforeCommonPatch 60
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * ▼謝辞：
 * ツクマテでいつもご指導いただいているecf5DTTzl6h6lJj02氏の
 * 投稿コードを参考に作成しました。
 * この件のみならず、いつも的確なご助言をいただいていることに感謝いたします。
 * 今回のコードは下記の投稿を参考にしています。
 * https://tm.lucky-duet.com/viewtopic.php?f=99&t=14992#p54077
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters('BeforeCommon');
    const indexVariableId = Number(parameters['IndexVariableID']);

    let useBeforeMessage = false;

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command === pluginName) {

            // スキル使用者のインデックスを取得する
            const userIndex = $gameVariables.value(indexVariableId);

            // スキル使用者の取得
            // インデックスが 1000 未満ならエネミーのインデックスなので、
            // 処理を分岐する。
            const user = userIndex < 1000 ? $gameParty.members()[userIndex] : $gameTroop.members()[userIndex - 1000];

            // スキル使用者の名前を取得
            const userName = user.name();

            // アクションの取得
            const action = user.currentAction();

            // 使用したスキルの取得
            const item = action.item();

            // スキル名の取得
            const skillName = item.name;

            // 行動開始メッセージの取得
            const message1 = item.message1;
            const message2 = item.message2;

            // 行動開始モーション
            BattleManager._logWindow.push('performActionStart', user, action);
            BattleManager._logWindow.push('waitForMovement');

            // 行動開始メッセージの表示
            if (DataManager.isSkill(item)) {
                if (message1) {
                    BattleManager._logWindow.push('addText', userName + item.message1.format(item.name));
                }
                if (message2) {
                    BattleManager._logWindow.push('addText', item.message2.format(item.name));
                }
                useBeforeMessage = true;
            } else {
                BattleManager._logWindow.push('addText', TextManager.useItem.format(subject.name(), item.name));
                useBeforeMessage = true;
            }

            // コモンイベント前ウェイト
            const beforeCommonWait = Number(args[0]);
            if (beforeCommonWait > 0) {
                this.wait(beforeCommonWait);
            }

        }
    };

    //-----------------------------------------------------------------------------
    // Window_BattleLog

    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function (subject, item) {
        if (useBeforeMessage) {
            const numMethods = this._methods.length;
            if (this._methods.length === numMethods) {
                this.push("wait");
            }
            useBeforeMessage = false;
        } else {
            _Window_BattleLog_displayAction.call(this, subject, item);
        }
    };

})();
