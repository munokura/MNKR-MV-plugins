/*
 * --------------------------------------------------
 * SRD_SummonCore_MNKR_PatchSkill.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*
 * 2020/05/12 1.0.0 公開
 */

 /*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/SRD_SummonCore_MNKR_PatchSkill.js
 * @plugindesc SRD_SummonCoreで召喚されたアクターがレベルに合わせたスキルを習得しないのを習得するように変更するパッチプラグイン
 * @author Munokura
 * @license MIT
 * 
 * @help
 * Summon Core Version 1.05 用のパッチプラグインです。
 * 動作にはSummon Coreが必要です。
 * http://sumrndm.site/summon-core/
 * 
 * プラグイン管理で、このプラグインをSRD_SummonCoreの下側に配置してください。
 * 
 * Summon Core では召喚アクターのレベルを指定できますが、
 * レベル毎の習得スキルを設定していて、初期レベルが1の場合、
 * レベル1の習得スキルのみを習得した状態で召喚されます。
 * 
 * このパッチプラグインは、この問題を解決します。
 * 召喚レベルに合わせてスキルを習得した状態で召喚されます。
 * 
 * 注意点
 * Summon Core Version 1.05 では、
 * データベースで召喚されるアクターの初期レベルを99等の高レベルに設定していて、
 * 低いレベルで召喚した場合、初期レベルで習得済みの全スキルを習得した状態で召喚されます。
 * この問題はこのパッチプラグインでも解消していません。
 * よって、データベースで召喚されるアクターの初期レベルは1にしておくことをお勧めします。
 * 
 *
 * プラグインコマンドや設定はありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

var SRD = SRD || {};
SRD.SummonCoreMnkrPatchSkill = SRD.SummonCoreMnkrPatchSkill || {};
SRD.NotetagGetters = SRD.NotetagGetters || [];

var Imported = Imported || {};
Imported["SRD SummonCore MNKR Patch Skill"] = "1.0.0";

(function (_, N) {

    "use strict";

    _.meetsRequirements = Imported["SumRndmDde Summon Core"];

    _.alertNeedSummonCore = function () {
        alert("The 'SRD_SummonCore' plugin is required for using the 'SRD_SummonBattlerImages' plugin.");
        if (confirm("Do you want to open the download page to 'SRD_SummonCore'?")) {
            window.open('http://sumrndm.site/summon-core/');
        }
    };

    if (!_.meetsRequirements) {
        _.alertNeedSummonCore();
    }


    const _Game_Summon_initialize = Game_Summon.prototype.initialize;
    Game_Summon.prototype.initialize = function (actorId, level, turns, introAni, exitAni, masterId) {
        var ret = _Game_Summon_initialize.apply(this, arguments);
        this.currentClass().learnings.forEach(function (learning) {
            if (learning.level <= this._level) {
                this.learnSkill(learning.skillId);
            }
        }, this);
        return ret;
    };

})(SRD.SummonCoreMnkrPatchSkill, SRD.NotetagGetters);