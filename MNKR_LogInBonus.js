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
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_LogInBonus.js
@plugindesc We provide a plugin command that simplifies login bonus implementation.
@author munokura
@license MIT License

@help
Provides a plugin command to simplify login bonus implementation.

1. Check Bonus Acquisition Conditions
MNKR_LogInBonus checkBonus variable ID
If the bonus acquisition conditions are met when the plugin command is
executed, the switch turns ON. If not, it turns OFF.

Usage Example
MNKR_LogInBonus checkBonus 1
If the bonus acquisition conditions are met when the plugin command is
executed, switch ID 1 turns ON.
If not, it turns OFF.

2. Bonus Acquisition
MNKR_LogInBonus getBonus common event ID
If the bonus acquisition conditions are met, the time value variable is
updated and the common event is executed.
If the common event ID is omitted, only the time value variable is updated.

Usage Example
MNKR_LogInBonus getBonus 1
If the bonus acquisition conditions are met, the time value variable is
updated and common event ID 1 is executed.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).

@param timeVariable
@text Time-value variables
@desc Specify the variable to save the time value. If 0, it will not work.
@type variable
@default 0

@param updateHours
@text Login bonus update time
@desc Enter the time in 24-hour format. Check if the time has passed.
@type number
@default 0
@max 23
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_LogInBonus.js
@plugindesc ログインボーナス実装を簡易にするプラグインコマンドを提供します。
@author munokura

@help
ログインボーナス実装を簡易にするプラグインコマンドを提供します。

1.ボーナス取得条件確認
MNKR_LogInBonus checkBonus 変数ID
プラグインコマンド実行時にボーナス取得条件を満たす場合スイッチをON。満たしていない場合、OFFにします。

使用例
MNKR_LogInBonus checkBonus 1
プラグインコマンド実行時にボーナス取得条件を満たす場合スイッチID1をON。
満たしていない場合、OFFにします。

2.ボーナス取得
MNKR_LogInBonus getBonus コモンイベントID
ボーナス取得条件を満たす場合、時刻値変数を更新し、コモンイベントを実行します。
コモンイベントIDを省略した場合、時刻値変数を更新のみします。

使用例
MNKR_LogInBonus getBonus 1
ボーナス取得条件を満たす場合、時刻値変数を更新し、コモンイベントID1を実行します。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param timeVariable
@text 時刻値変数
@type variable
@default 0
@desc 時刻値を保存する変数を指定。0の場合は動作しません。

@param updateHours
@text ログインボーナス更新時刻
@type number
@max 23
@default 0
@desc 24時制の時刻を入力。この時間を過ぎているか確認します。
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
