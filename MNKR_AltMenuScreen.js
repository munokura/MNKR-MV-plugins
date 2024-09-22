//============================================================================
// AltMenuScreen.js
//============================================================================

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_AltMenuScreen.js
 * @plugindesc メニュー画面のレイアウトを変更します。
 * @author Yoji Ojima (改変 ムノクラ)
 *
 * @help
 * # 機能
 * RPGツクールMV公式プラグイン(AltMenuScreen.js)を改変したものです。
 * メインメニュー画面をシンプルにしましたす。
 *
 * このプラグインには、プラグインコマンドはありません。
 *
 * # 注意事項
 * 質問は改変者へお願いいたします。
 *
 *
 * # 利用規約:
 * - GGG製品利用規約を守ってください。
 * それ以外の制限はありません。
 * 作者に無断で改変、再配布が可能です。
 * 利用形態（商用、18禁利用等）についても制限はありません。
 */

(function () {

    Window_Base.prototype.drawActorLevel = function (actor, x, y, width) {
        width = width || 168;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x, y, width, 'right');
    };

    var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
        _Scene_Menu_create.call(this);
        this._statusWindow.x = 0;
        this._statusWindow.y = this._commandWindow.height + 232;	//munokura
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
    };

    Window_MenuCommand.prototype.windowWidth = function () {
        return Graphics.boxWidth / 2;	//munokura
    };

    Window_MenuCommand.prototype.maxCols = function () {
        return 2;	//munokura
    };

    Window_MenuCommand.prototype.numVisibleRows = function () {
        return 4;	//munokura
    };

    Window_MenuStatus.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_MenuStatus.prototype.windowHeight = function () {
        var h1 = this.fittingHeight(1);
        var h2 = this.fittingHeight(2);
        return Graphics.boxHeight - h1 - h2 - 232;	//munokura
    };

    Window_MenuStatus.prototype.maxCols = function () {
        //        return 4;
        return $gameParty.members().length;	//munokura
    };

    Window_MenuStatus.prototype.numVisibleRows = function () {
        return 1;
    };

    Window_MenuStatus.prototype.drawItemImage = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var w = Math.min(rect.width, 144);
        var h = Math.min(rect.height, 144);
        var lineHeight = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        //        this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2.5, w, h);	//munokura
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawItemStatus = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var bottom = y + rect.height;
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x, bottom - lineHeight * 5, width);	//munokura
        this.drawActorLevel(actor, x, bottom - lineHeight * 4, width);	//munokura
        //        this.drawActorClass(actor, x, bottom - lineHeight * 4, width);	//munokura
        this.drawActorHp(actor, x, bottom - lineHeight * 3, width);
        this.drawActorMp(actor, x, bottom - lineHeight * 2, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    var _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function () {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };

})();
