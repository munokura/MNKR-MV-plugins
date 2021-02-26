/*
 * --------------------------------------------------
 * MNKR_AltMenuScreen3.js
 *   Ver.0.1.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:ja
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_AltMenuScreen3.js
 * @plugindesc メニュー画面にアクターの顔画像の代わりに立ち絵を表示できます。
 * @author 神無月サスケ (改変 munokura)
 * 
 * @help
 * メニュー画面にアクターの顔画像の代わりに立ち絵を表示できます。
 * メニューそれぞれのシーンに背景画像を付けることが出来ます。
 *
 * アクターのメモに以下のように書いてください:
 * <stand_picture:ファイル名> ファイル名が、そのアクターの立ち絵になります。
 *   ファイルは img/pictures に置いてください。
 *
 * 望ましいアクター立ち絵のサイズ：
 * 幅：3列:240px, 4列：174px
 * 高さ： コマンドウィンドウ 1行:444px 2行:408px
 * 
 * アクターのメモに<stand_offset_x> <stand_offset_y> を入れると
 * 立ち絵の表示位置指定が出来ます。
 * <stand_picture:ファイル名>で指定したアクター表示にのみ反映されます。
 * 通常の顔画像には反映されません。
 * 
 * 立ち絵を横にずらしたい場合
 * <stand_offset_x:10>
 * ※10の部分をずらす量に指定してください。マイナスだと左に移動します。
 *
 * 立ち絵を縦にずらしたい場合
 * <stand_offset_y:10>
 * ※10の部分をずらす量に指定してください。マイナスだと上に移動します。
 * 
 * 
 * このプラグインには、プラグインコマンドはありません。
 * 
 * このプラグインは AltMenuScreen2MZ を元ととして
 * AltMenuScreen3を改変したものです。
 * 質問は改変者へお願いいたします。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param displayWindow
 * @text ウィンドウ枠表示
 * @desc ウィンドウ枠を表示。デフォルト:false
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param bgBitmapMenu
 * @text メニュー背景
 * @desc メニュー背景にする画像ファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapItem
 * @text アイテム画面背景
 * @desc アイテム画面背景にする画像ファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapSkill
 * @text スキル画面背景
 * @desc スキル画面背景にする画像ファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapEquip
 * @text 装備画面背景
 * @desc 装備画面背景にする画像ファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapStatus
 * @text ステータス画面背景
 * @desc ステータス画面背景にする画像ファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapOptions
 * @text オプション画面背景
 * @desc オプション画面背景にする画像ファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapFile
 * @text セーブ／ロード画面背景
 * @desc セーブ／ロード画面背景にする画像ファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapGameEnd
 * @text ゲーム終了画面背景
 * @desc ゲーム終了画面背景にする画像ファイルです。
 * img/pictures に置いてください。
 * @default 
 * @dir img/pictures/
 * @type file
 * 
 * @param maxColsMenu
 * @text アクター表示最大数
 * @desc アクターを表示するウィンドウの1画面の登録最大数。
 * 0にすると、パーティ人数で自動調整
 * @type number
 * @default 4
 * 
 * @param commandRows
 * @text コマンド行数
 * @desc コマンドウィンドウの行数です。
 * @type number
 * @min 1
 * @default 2
 *
 * @param isDisplayStatus
 * @text ステータス表示
 * @desc ステータスを表示するかしないかを選びます。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param displayMapName
 * @text マップ名表示
 * @desc 画面左下にマップ名を表示するかを選びます。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param locationString
 * @text マップ名ラベル
 * @desc マップ名の前に付ける文字。システムカラーで描画されます。
 * @type string
 * @default 現在地:
 * 
 * 
 * @noteParam stand_picture
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actors
 */

(function () {
    "use strict";

    // set parameters
    var pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    var parameters = PluginManager.parameters(pluginName);
    var bgBitmapMenu = parameters['bgBitmapMenu'] || '';
    var bgBitmapItem = parameters['bgBitmapItem'] || '';
    var bgBitmapSkill = parameters['bgBitmapSkill'] || '';
    var bgBitmapEquip = parameters['bgBitmapEquip'] || '';
    var bgBitmapStatus = parameters['bgBitmapStatus'] || '';
    var bgBitmapOptions = parameters['bgBitmapOptions'] || '';
    var bgBitmapFile = parameters['bgBitmapFile'] || '';
    var bgBitmapGameEnd = parameters['bgBitmapGameEnd'] || '';
    var maxColsMenuWnd = Number(parameters['maxColsMenu'] || 4);
    var rowsCommandWnd = Number(parameters['commandRows'] || 2);
    var isDisplayStatus = String(parameters['isDisplayStatus']) === 'true';
    var isDisplayMapName = String(parameters['displayMapName']) === 'true';
    var locationString = parameters['locationString'] || '';
    var displayWindow = String(parameters['displayWindow']) === 'true';
    //
    // make transparent windows for each scene in menu.
    //
    var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
        _Scene_Menu_create.call(this);
        this._statusWindow.x = 0;
        this._statusWindow.y = this._commandWindow.height;
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        // make transparent for all windows at menu scene.
        if (!displayWindow) {
            this._statusWindow.opacity = 0;
            this._goldWindow.opacity = 0;
            this._commandWindow.opacity = 0;
        }
        this.createMapNameWindow();
    };

    var _Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        _Scene_Item_create.call(this);
        if (!displayWindow) {
            this._helpWindow.opacity = 0;
            this._categoryWindow.opacity = 0;
            this._itemWindow.opacity = 0;
            this._actorWindow.opacity = 0;
        }
    };

    var _Scene_Skill_create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function () {
        _Scene_Skill_create.call(this);
        if (!displayWindow) {
            this._helpWindow.opacity = 0;
            this._skillTypeWindow.opacity = 0;
            this._statusWindow.opacity = 0;
            this._itemWindow.opacity = 0;
            this._actorWindow.opacity = 0;
        }
    };

    var _Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function () {
        _Scene_Equip_create.call(this);
        if (!displayWindow) {
            this._helpWindow.opacity = 0;
            this._statusWindow.opacity = 0;
            this._commandWindow.opacity = 0;
            this._slotWindow.opacity = 0;
            this._itemWindow.opacity = 0;
        }
    };

    var _Scene_Status_create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function () {
        _Scene_Status_create.call(this);
        if (!displayWindow) {
            this._statusWindow.opacity = 0;
        }
    };

    var _Scene_Options_create = Scene_Options.prototype.create;
    Scene_Options.prototype.create = function () {
        _Scene_Options_create.call(this);
        if (!displayWindow) {
            this._optionsWindow.opacity = 0;
        }
    };

    var _Scene_File_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function () {
        _Scene_File_create.call(this);
        if (!displayWindow) {
            this._helpWindow.opacity = 0;
            this._listWindow.opacity = 0;
        }
    };

    var _Scene_GameEnd_create = Scene_GameEnd.prototype.create;
    Scene_GameEnd.prototype.create = function () {
        _Scene_GameEnd_create.call(this);
        if (!displayWindow) {
            this._commandWindow.opacity = 0;
        }
    };

    //
    // display current map name
    //

    function Window_MapNameAlt3() {
        this.initialize.apply(this, arguments);
    }

    Window_MapNameAlt3.prototype = Object.create(Window_MapName.prototype);
    Window_MapNameAlt3.prototype.constructor = Window_MapNameAlt3;

    Window_MapNameAlt3.prototype.initialize = function () {
        Window_MapName.prototype.initialize.call(this);
    };

    Window_MapNameAlt3.prototype.windowWidth = function () {
        return Number(Graphics.boxWidth - 240);
    };

    Window_MapNameAlt3.prototype.update = function () {
        // do nothing
    };

    var mapName = function () {
        var name = $gameMap.displayName();
        return name ? name : $dataMapInfos[$gameMap.mapId()].name;
    };

    Window_MapNameAlt3.prototype.refresh = function () {
        this.contents.clear();
        this.x = 0;
        this.y = Graphics.boxHeight - this.height;
        if (mapName()) {
            this.changeTextColor(this.systemColor());
            var textWidth = this.textWidth(locationString) + 8;
            var contentsWidth = this.contentsWidth();
            if (textWidth) {
                this.drawText(locationString, 4, 0, contentsWidth - 4, 'left');
            }
            this.resetTextColor();
            var orgX = 4 + textWidth;
            this.drawText(mapName(), orgX, 0, contentsWidth - orgX, 'left');
            this.contentsOpacity = 255;
        }
    };

    Scene_Menu.prototype.createMapNameWindow = function () {
        if (isDisplayMapName) {
            this._mapNameWindow = new Window_MapNameAlt3();
            this.addChild(this._mapNameWindow);
            if (!displayWindow) {
                this._mapNameWindow.opacity = 0;
            } else {
                this._mapNameWindow.opacity = 255;
            }
        }
    };

    var _Scene_Menu_terminate = Scene_Menu.prototype.terminate;
    Scene_Menu.prototype.terminate = function () {
        _Scene_Menu_terminate.call(this);
        if (isDisplayMapName) {
            this.removeChild(this._mapNameWindow);
        }
    };

    //
    // load bitmap that set in plugin parameter
    //
    var _Scene_Menu_createBackground = Scene_Menu.prototype.createBackground;
    Scene_Menu.prototype.createBackground = function () {
        if (bgBitmapMenu) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
                ImageManager.loadPicture(bgBitmapMenu);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Menu_createBackground.call(this);
    };

    var _Scene_Item_createBackground = Scene_Item.prototype.createBackground;
    Scene_Item.prototype.createBackground = function () {
        if (bgBitmapItem) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
                ImageManager.loadPicture(bgBitmapItem);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Item_createBackground.call(this);
    };

    var _Scene_Skill_createBackground = Scene_Skill.prototype.createBackground;
    Scene_Skill.prototype.createBackground = function () {
        if (bgBitmapSkill) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
                ImageManager.loadPicture(bgBitmapSkill);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Skill_createBackground.call(this);
    };

    var _Scene_Equip_createBackground = Scene_Equip.prototype.createBackground;
    Scene_Equip.prototype.createBackground = function () {
        if (bgBitmapEquip) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
                ImageManager.loadPicture(bgBitmapEquip);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Equip_createBackground.call(this);
    };

    var _Scene_Status_createBackground =
        Scene_Status.prototype.createBackground;
    Scene_Status.prototype.createBackground = function () {
        if (bgBitmapStatus) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
                ImageManager.loadPicture(bgBitmapStatus);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Status_createBackground.call(this);
    };

    var _Scene_Options_createBackground =
        Scene_Options.prototype.createBackground;
    Scene_Options.prototype.createBackground = function () {
        if (bgBitmapOptions) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
                ImageManager.loadPicture(bgBitmapOptions);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_Options_createBackground.call(this);
    };

    var _Scene_File_createBackground = Scene_File.prototype.createBackground;
    Scene_File.prototype.createBackground = function () {
        if (bgBitmapFile) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
                ImageManager.loadPicture(bgBitmapFile);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_File_createBackground.call(this);
    };

    var _Scene_GameEnd_createBackground =
        Scene_GameEnd.prototype.createBackground;
    Scene_GameEnd.prototype.createBackground = function () {
        if (bgBitmapGameEnd) {
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap =
                ImageManager.loadPicture(bgBitmapGameEnd);
            this.addChild(this._backgroundSprite);
            return;
        }
        // if background file is invalid, it does original process.
        _Scene_GameEnd_createBackground.call(this);
    };

    //
    // alt menu screen processes
    //
    Window_MenuCommand.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_MenuCommand.prototype.maxCols = function () {
        return 4;
    };

    Window_MenuCommand.prototype.numVisibleRows = function () {
        return rowsCommandWnd;
    };

    Window_MenuStatus.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    };

    Window_MenuStatus.prototype.windowHeight = function () {
        var h1 = this.fittingHeight(1);
        var h2 = this.fittingHeight(rowsCommandWnd);
        return Graphics.boxHeight - h1 - h2;
    };

    Window_MenuStatus.prototype.maxCols = function () {
        var realMaxColsMenuWnd = maxColsMenuWnd === 0 ? $gameParty.members().length : maxColsMenuWnd;
        return realMaxColsMenuWnd;
    };

    Window_MenuStatus.prototype.numVisibleRows = function () {
        return 1;
    };

    var _Window_MenuStatus_drawItem = Window_MenuStatus.prototype.drawItem;
    Window_MenuStatus.prototype.drawItem = function (index) {
        var actor = $gameParty.members()[index];
        var bitmapName = $dataActors[actor.actorId()].meta.stand_picture;
        var bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null;
        if (bitmap && !bitmap.isReady()) {
            bitmap.addLoadListener(_Window_MenuStatus_drawItem.bind(this, index));
        } else {
            _Window_MenuStatus_drawItem.apply(this, arguments);
        }
    };

    Window_MenuStatus.prototype.drawItemImage = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        // load stand_picture
        var bitmapName = $dataActors[actor.actorId()].meta.stand_picture;
        var bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null;
        var offX = $dataActors[actor.actorId()].meta.stand_offset_x ? Number($dataActors[actor.actorId()].meta.stand_offset_x) : 0;
        var offY = $dataActors[actor.actorId()].meta.stand_offset_y ? Number($dataActors[actor.actorId()].meta.stand_offset_y) : 0;
        var w = Math.min(rect.width, (bitmapName ? bitmap.width : 144));
        var h = Math.min(rect.height, (bitmapName ? bitmap.height : 144));
        var lineHeight = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        if (bitmap) {
            var sx = (bitmap.width > w) ? (bitmap.width - w) / 2 : 0;
            var sy = (bitmap.height > h) ? (bitmap.height - h) / 2 : 0;
            var dx = (bitmap.width > rect.width) ? rect.x :
                rect.x + (rect.width - bitmap.width) / 2;
            var dy = (bitmap.height > rect.height) ? rect.y :
                rect.y + (rect.height - bitmap.height) / 2;
            this.contents.bltStand(bitmap, sx - offX, sy - offY, w, h, dx, dy);
        } else { // when bitmap is not set, do the original process.
            this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2.5, w, h);
        }
        this.changePaintOpacity(true);
    };

    Window_MenuStatus.prototype.drawItemStatus = function (index) {
        if (!isDisplayStatus) {
            return;
        }
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        var x = rect.x;
        var y = rect.y;
        var width = rect.width;
        var bottom = y + rect.height;
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y + lineHeight * 0, width);
        this.drawActorLevelWidth(actor, x, y + lineHeight * 1, width);
        this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
        this.drawActorHp(actor, x, bottom - lineHeight * 3, width);
        this.drawActorMp(actor, x, bottom - lineHeight * 2, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
    };

    Window_MenuStatus.prototype.drawActorLevelWidth = function (actor, x, y, width) {
        width = Math.min(width, 128);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x, y, width, 'right');
    };

    var _Window_MenuActor_initialize = Window_MenuActor.prototype.initialize;
    Window_MenuActor.prototype.initialize = function () {
        _Window_MenuActor_initialize.call(this);
        this.y = this.fittingHeight(2);
    };

    Bitmap.prototype.bltStand = function (source, sx, sy, sw, sh, dx, dy, dw, dh) {
        dw = dw || sw;
        dh = dh || sh;
        this._context.globalCompositeOperation = 'source-over';
        this._context.drawImage(source._canvas, sx, sy, sw, sh, dx, dy, dw, dh);
        this._setDirty();
    };

})();