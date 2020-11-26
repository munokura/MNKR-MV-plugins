//=============================================================================
// MNKR_AltMenuScreen3.js (ver0.0.1)
//=============================================================================

/*
 * ▼ムノクラによる変更点
 * 1.トリアコンタン氏の下記修正を取り入れました。
 *   1.0.1 2016/07/22
 *   リザーブメンバーの立ち絵が初回表示時に正しく表示されない問題の修正
 * 
 * 2.ウィンドウ枠を表示するか選択肢の追加
 * 
 * 3.アクターのメモタグ<stand_offset_x> <stand_offset_y> で
 *   立ち絵の表示位置指定機能を追加
 *   <stand_picture:ファイル名>で指定したアクター表示にのみ反映されます。
 *   通常の顔画像には反映されません。
 * 4.場所ウィンドウの幅計算を変更
 * 
 * 5.プラグインパラメーターの調整
 */

//=============================================================================
// AltMenuScreen3.js (ver1.0.1)
//=============================================================================
// [History]
// 2015.Nov.23 1.0.0 First Release
// 2018.Sep.19 1.0.1 add function to display current mapname.

/*:ja
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_AltMenuScreen3.js
 * @plugindesc レイアウトの異なるメニュー画面
 * @author 神無月サスケ, Yoji Ojima (改変:ムノクラ)
 * 
 * @help
 * このプラグインは試作中です。
 * 現在、立ち絵の位置を大きく変更すると表示できなくなる不具合があります。
 * 
 * このプラグインには、プラグインコマンドはありません。
 *
 *  AltMenuscreen との違いは以下です:
 *  - メニューそれぞれのシーンに背景ビットマップを付けることが出来ます。
 *  - アクターに立ち絵を利用します。
 *
 * アクターのメモに以下のように書いてください:
 * <stand_picture:ファイル名> ファイル名が、そのアクターの立ち絵になります。
 *   ファイルは img/pictures に置いてください。
 *
 * 望ましいアクター立ち絵のサイズ：
 * 幅：3列:240px, 4列：174px
 * 高さ： コマンドウィンドウ 1行:444px 2行:408px
 *
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
 * @desc メニュー背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapItem
 * @text アイテム画面背景
 * @desc アイテム画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapSkill
 * @text スキル画面背景
 * @desc スキル画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapEquip
 * @text 装備画面背景
 * @desc 装備画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapStatus
 * @text ステータス画面背景
 * @desc ステータス画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapOptions
 * @text オプション画面背景
 * @desc オプション画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapFile
 * @text セーブ／ロード画面背景
 * @desc セーブ／ロード画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * @require 1
 * @dir img/pictures/
 * @type file
 * 
 * @param bgBitmapGameEnd
 * @text ゲーム終了画面背景
 * @desc ゲーム終了画面背景にするビットマップファイルです。
 * img/pictures に置いてください。
 * @default 
 * 
 * @param maxColsMenu
 * @text アクター表示最大数
 * @desc アクターを表示するウィンドウの1画面の登録最大数です。
 * @default 4
 * 
 * @param commandRows
 * @text コマンド行数
 * @desc コマンドウィンドウの行数です。
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
 * @param display map name
 * @text マップ名表示
 * @desc 画面左下にマップ名を表示するかを選びます。
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * 
 * @param location string
 * @text マップ名ラベル
 * @desc マップ名の前に付ける文字。システムカラーで描画されます。
 * @default 現在地:
 * 
 * 
 * @noteParam stand_picture
 * @noteRequire 1
 * @noteDir img/pictures/
 * @noteType file
 * @noteData actor
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
    var isDisplayMapName = String(parameters['display map name']) === 'true';
    var locationString = parameters['location string'] || '';
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
        return maxColsMenuWnd;
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

    Window_MenuStatus.prototype._refreshArrows = function () {
        Window.prototype._refreshArrows.call(this);
        var w = this._width;
        var h = this._height;
        var p = 24;
        var q = p / 2;

        this._downArrowSprite.rotation = 270 * Math.PI / 180;
        this._downArrowSprite.move(w - q, h / 2);
        this._upArrowSprite.rotation = 270 * Math.PI / 180;
        this._upArrowSprite.move(q, h / 2);
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
            this.contents.blt(bitmap, sx - offX, sy - offY, w, h, dx, dy);
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
        this.drawActorLevel(actor, x, y + lineHeight * 1, width);
        this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
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