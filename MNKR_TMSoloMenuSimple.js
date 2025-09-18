/*
 * --------------------------------------------------
 * MNKR_TMSoloMenuSimple Ver.0.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// TMPlugin - 一人旅メニュー
// バージョン: 0.1.3b
// 最終更新日: 2018/10/22
// 配布元    : https://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2018 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TMSoloMenuSimple.js
@plugindesc When traveling alone, skip actor selection.
@author tomoaky,munokura
@license MIT License

@help
This is a modification of TMPlugin - Solo Travel Menu ver. 0.1.3b.
Only the actor selection process in menu scenes has been omitted.

There are no plugin commands.

About this plugin
This is a modified version of a plugin created for RPG Maker MV.
Please contact the original author for any inquiries.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
This plugin may be modified and redistributed without permission from the
author, and there are no restrictions on its use (commercial, 18+, etc.).

@param forceChangeSoloMenu
@text Solo travel feature
@desc Default: Always omit actor selection (true)
@type boolean
@on Always ON
@off Varies depending on the number of people in the party
@default true
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TMSoloMenuSimple.js
@plugindesc 一人旅の時、アクター選択を省略します

@author tomoaky (改変 munokura)

@param forceChangeSoloMenu
@text 一人旅機能
@type boolean
@on 常時ON
@off パーティの人数で変化
@desc 初期値: 常にアクター選択を省略 (true)
@default true

@help
TMPlugin - 一人旅メニュー ver0.1.3b の改変です。
メニュー系シーンでのアクター選択の処理が省略される部分のみを残しました。

  プラグインコマンドはありません。

このプラグインについて
  RPGツクールMV用に作成されたプラグインを改変したものです。
  お問い合わせは改変者へお願いいたします。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

var Imported = Imported || {};
Imported.TMSoloMenu = true;

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  var parameters = PluginManager.parameters(pluginName);
  var forceChangeSoloMenu = JSON.parse(parameters['forceChangeSoloMenu'] || 'true');

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  Game_Party.prototype.isSoloMenuValid = function () {
    return forceChangeSoloMenu || this.size() === 1;
  };

  //-----------------------------------------------------------------------------
  // Window_SoloItemStatus
  //

  function Window_SoloItemStatus() {
    this.initialize.apply(this, arguments);
  }

  Window_SoloItemStatus.prototype = Object.create(Window_Base.prototype);
  Window_SoloItemStatus.prototype.constructor = Window_SoloItemStatus;

  Window_SoloItemStatus.prototype.initialize = function (x, y, width) {
    Window_Base.prototype.initialize.call(this, x, y, width, this.fittingHeight(1));
    this.refresh();
  };

  Window_SoloItemStatus.prototype.refresh = function () {
    var x = 0;
    var actor = $gameParty.leader();
    this.contents.clear();
    if (soloItemStatus[0] > 0) {
      this.drawActorName(actor, x, 0, soloItemStatus[0]);
      x += soloItemStatus[0] + 16;
    }
    if (soloItemStatus[1] > 0) {
      this.drawActorIcons(actor, x, 0, soloItemStatus[1]);
      x += soloItemStatus[1] + 16;
    }
    if (soloItemStatus[2] > 0) {
      this.drawActorHp(actor, x, 0, soloItemStatus[2]);
      x += soloItemStatus[2] + 16;
    }
    if (soloItemStatus[3] > 0) {
      this.drawActorMp(actor, x, 0, soloItemStatus[3]);
      x += soloItemStatus[3] + 16;
    }
    if (soloItemStatus[4] > 0) {
      this.drawActorTp(actor, x, 0, soloItemStatus[4]);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_Menu
  //

  var _Scene_Menu_commandPersonal = Scene_Menu.prototype.commandPersonal;
  Scene_Menu.prototype.commandPersonal = function () {
    if ($gameParty.isSoloMenuValid()) {
      $gameParty.setTargetActor($gameParty.leader());
      this.onPersonalOk();
    } else {
      _Scene_Menu_commandPersonal.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_ItemBase
  //

  var _Scene_ItemBase_itemTargetActors = Scene_ItemBase.prototype.itemTargetActors;
  Scene_ItemBase.prototype.itemTargetActors = function () {
    var action = new Game_Action(this.user());
    action.setItemObject(this.item());
    if ($gameParty.isSoloMenuValid() && action.isForFriend()) {
      return [$gameParty.leader()];
    } else {
      return _Scene_ItemBase_itemTargetActors.call(this);
    }
  };

  var _Scene_ItemBase_determineItem = Scene_ItemBase.prototype.determineItem;
  Scene_ItemBase.prototype.determineItem = function () {
    var action = new Game_Action(this.user());
    action.setItemObject(this.item());
    if ($gameParty.isSoloMenuValid() && action.isForFriend()) {
      if (this.canUse()) {
        this.useItem();
        this._itemWindow.refresh();
        if (this._soloStatusWindow) this._soloStatusWindow.refresh();
      } else {
        SoundManager.playBuzzer();
      }
      this._itemWindow.activate();
    } else {
      _Scene_ItemBase_determineItem.call(this);
    }
  };

})();
