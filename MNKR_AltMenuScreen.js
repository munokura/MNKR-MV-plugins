//============================================================================
// AltMenuScreen.js
// Ver 1.1.0
//============================================================================

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_AltMenuScreen.js
@plugindesc Change the layout of the menu screen.
@author Yoji Ojima
@license MIT

@help
# Features
This is a modified version of the official RPG Maker MV plugin
(AltMenuScreen.js).

Simplifies the main menu screen.

This plugin does not have any plugin commands.

# Notes
Please contact the modifier with any questions.

# Terms of Use:
- Please abide by the GGG Product Terms of Use.
https://rpgmakerofficial.com/support/rule/
There are no other restrictions.
You may modify and redistribute this plugin without permission from the
author.
There are also no restrictions on how it can be used (commercial, 18+, etc.).

@param actorCols
@text Actors Displayed
@desc The number of registrations per screen in the actor display window on the main menu screen. If set to 0, it will automatically adjust based on the number of party members.
@type number
@default 4
@min 0
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_AltMenuScreen.js
@plugindesc メニュー画面のレイアウトを変更します。
@author Yoji Ojima (改変 munokura)

@help
# 機能
RPGツクールMV公式プラグイン(AltMenuScreen.js)を改変したものです。
メインメニュー画面をシンプルにします。

このプラグインには、プラグインコマンドはありません。

# 注意事項
質問は改変者へお願いいたします。

# 利用規約:
- GGG製品利用規約を守ってください。
https://rpgmakerofficial.com/support/rule/
それ以外の制限はありません。
作者に無断で改変、再配布が可能です。
利用形態（商用、18禁利用等）についても制限はありません。

@param actorCols
@text アクター表示数
@desc メインメニュー画面のアクター表示ウィンドウの1画面の登録数。0にすると、パーティ人数で自動調整
@type number
@min 0
@default 4
*/

(() => {
    "use strict";
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);

    const param = {};
    param.actorCols = Number(parameters['actorCols'] || 0);

    Window_Base.prototype.drawActorLevel = function (actor, x, y, width) {
        width = width || 168;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x, y, width, 'right');
    };

    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
        _Scene_Menu_create.call(this);
        this._statusWindow.x = 0;
        this._statusWindow.y = this._commandWindow.height + 232;
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        this._goldWindow.y = 0;
    };

    Window_MenuCommand.prototype.windowWidth = function () {
        return Graphics.boxWidth / 2;
    };

    Window_MenuCommand.prototype.maxCols = function () {
        return 2;
    };

    Window_MenuCommand.prototype.numVisibleRows = function () {
        return 4;
    };

    Window_MenuStatus.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_MenuStatus.prototype.windowHeight = function () {
        const h1 = this.fittingHeight(1);
        const h2 = this.fittingHeight(2);
        return Graphics.boxHeight - h1 - h2 - 232;
    };

    Window_MenuStatus.prototype.maxCols = function () {
        //        return 4;
        const cols = param.actorCols === 0 ? $gameParty.members().length : param.actorCols;
        return cols;
    };

    Window_MenuStatus.prototype.numVisibleRows = function () {
        return 1;
    };

    Window_MenuStatus.prototype.drawItemImage = function (index) {
    };

    Window_MenuStatus.prototype.drawItemStatus = function (index) {
        const actor = $gameParty.members()[index];
        const rect = this.itemRectForText(index);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        const bottom = y + rect.height;
        const lineHeight = this.lineHeight();
        this.drawActorName(actor, x, bottom - lineHeight * 5, width);
        this.drawActorLevel(actor, x, bottom - lineHeight * 4, width);
        this.drawActorHp(actor, x, bottom - lineHeight * 3, width);
        this.drawActorMp(actor, x, bottom - lineHeight * 2, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    const _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function () {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };

})();
