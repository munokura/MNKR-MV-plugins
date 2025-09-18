/*
 * --------------------------------------------------
 * SceneFormation_MNKR_ParamPatch.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*
 * 2020/05/06 1.0.0 公開
 */

 /*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/SceneFormation_MNKR_ParamPatch.js
@plugindesc SceneFormation Only three ability values are displayed in the scene: attack power, defense power, and agility.
@author munokura
@license MIT

@help
This is a patch plugin for SceneFormation ver. 1.093 (hereafter referred to as
SceneFormation).

SceneFormation is required to function.
https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Menu/SceneFormation.js

Place this plugin below SceneFormation in the Plugin Manager.

Sets SceneFormation's scene display ability values to attack, defense, and
agility.

There are no plugin commands or settings.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission from the
author, and there are no restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/SceneFormation_MNKR_ParamPatch.js
@plugindesc SceneFormation シーン表示される能力値を攻撃力、防御力、敏捷性の３つだけにします。
@author Munokura
@license MIT

@help
並び替えシーン SceneFormation ver1.093 （以降SceneFormation）用の
パッチプラグインです。
動作には SceneFormation が必要です。
https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Menu/SceneFormation.js

プラグイン管理で、このプラグインをSceneFormationの下方に配置してください。

SceneFormationのシーン表示能力値を攻撃力、防御力、敏捷性の３つにします。

プラグインコマンドや設定はありません。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

 (function () {

    'use strict';
    const originalPluginName = 'SceneFormation';
    const originalPluginParameters = PluginManager.parameters(originalPluginName);
    const statusBlockWidth = Number(originalPluginParameters['Status Block Width'] || 372);

    Window_FormationStatus.prototype.drawParameters = function (x, y) {
        var blockWidth = statusBlockWidth / 2 - 6;
        var paramWidth = blockWidth / 3;

        var paramId = 0 + 2;
        var y2 = y + 32 * (0 % 3);
        var x2 = x + Math.floor(0 / 3) * blockWidth;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x2 + (12 * Math.floor(0 / 3)), y2, paramWidth * 2);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x2 + paramWidth * 2 + (12 * Math.floor(0 / 3)), y2, paramWidth, 'right');

        var paramId = 1 + 2;
        var y2 = y + 32 * (1 % 3);
        var x2 = x + Math.floor(1 / 3) * blockWidth;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x2 + (12 * Math.floor(1 / 3)), y2, paramWidth * 2);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x2 + paramWidth * 2 + (12 * Math.floor(1 / 3)), y2, paramWidth, 'right');

        var paramId = 4 + 2;
        var y2 = y + 32 * (2 % 3);
        var x2 = x + Math.floor(2 / 3) * blockWidth;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x2 + (12 * Math.floor(2 / 3)), y2, paramWidth * 2);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x2 + paramWidth * 2 + (12 * Math.floor(2 / 3)), y2, paramWidth, 'right');
    };

})();