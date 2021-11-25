/*
 * --------------------------------------------------
 * MNKR_LogInBonus.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_LogInBonus.js
 * @plugindesc ログインボーナス実装を簡易にするプラグインコマンドを提供します。
 * @author munokura
 *
 * @help
 * ログインボーナス実装を簡易にするプラグインコマンドを提供します。
 * 
 * 1.ボーナス取得条件確認
 * MNKR_LogInBonus checkBonus 変数ID
 * プラグインコマンド実行時にボーナス取得条件を満たす場合スイッチをON。満たしていない場合、OFFにします。
 * 
 * 使用例
 * MNKR_LogInBonus checkBonus 1
 * プラグインコマンド実行時にボーナス取得条件を満たす場合スイッチID1をON。
 * 満たしていない場合、OFFにします。
 * 
 * 
 * 2.ボーナス取得
 * MNKR_LogInBonus getBonus コモンイベントID
 * ボーナス取得条件を満たす場合、時刻値変数を更新し、コモンイベントを実行します。
 * コモンイベントIDを省略した場合、時刻値変数を更新のみします。
 * 
 * 使用例
 * MNKR_LogInBonus getBonus 1
 * ボーナス取得条件を満たす場合、時刻値変数を更新し、コモンイベントID1を実行します。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param timeVariable
 * @text 時刻値変数
 * @type variable
 * @default 0
 * @desc 時刻値を保存する変数を指定。0の場合は動作しません。
 *
 * @param updateHours
 * @text ログインボーナス更新時刻
 * @type number
 * @max 23
 * @default 0
 * @desc 24時制の時刻を入力。この時間を過ぎているか確認します。
 *
 */

(() => {
    "use strict";

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const param = {};
    param.timeVariable = Number(parameters['timeVariable'] || 0);
    param.updateHours = Number(parameters['updateHours'] || 0);

    function fetchTimeObj() {
        const timeObj = {};
        timeObj.base = new Date();
        timeObj.year = timeObj.base.getFullYear();
        timeObj.month = timeObj.base.getMonth();
        timeObj.date = timeObj.base.getDate();
        timeObj.hours = timeObj.base.getHours();
        return timeObj;
    };

    function isBonus() {
        const nowObj = fetchTimeObj();
        const recentBonusDate = nowObj.hours >= param.updateHours ? nowObj.date : nowObj.date - 1;
        const recentBonusStamp = new Date(nowObj.year, nowObj.month, recentBonusDate, param.updateHours).getTime();
        const canBonus = recentBonusStamp > $gameVariables.value(param.timeVariable) ? true : false;
        return canBonus;
    };

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === pluginName) {
            if (param.timeVariable > 0) {
                const registerCommand = args[0];
                const selectId = Number(args[1] || 0);
                switch (registerCommand) {
                    case 'checkBonus':
                        if (selectId > 0) {
                            const canBonus = isBonus();
                            $gameSwitches.setValue(selectId, canBonus);
                        }
                        break;
                    case 'getBonus':
                        const canBonus = isBonus();
                        if (canBonus) {
                            const stamp = new Date().getTime();
                            $gameVariables.setValue(param.timeVariable, stamp);
                            if (selectId > 0) {
                                $gameTemp.reserveCommonEvent(selectId);
                            }
                        }
                        break;
                    default:
                }
            }
        }
    };

})();
