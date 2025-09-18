/*
 * --------------------------------------------------
 * MNKR_RandomShop.js
 *   Ver.0.1.0
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
//=============================================================================
// MG_RandomShop.js
// ----------------------------------------------------------------------------
// (C)2020 M.GAMES mo-to
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 0.8.0 2020-11-08
// ----------------------------------------------------------------------------
// [Ci-en](18禁): https://ci-en.dlsite.com/creator/2737
// [Twitter](18禁): https://twitter.com/_M_GAMES_
//=============================================================================

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_RandomShop.js
@plugindesc You will be able to create a shop with a randomized product list.
@author M.GAMES mo-to,munokura
@license MIT License

@help
This allows you to create a shop with a randomized product list.
Items will be restocked as the shop owner enters and exits.
This is ideal for temporary shops.

Plugin Command
MNKR_RandomShop range Minimum number of items in stock Maximum number of items
in stock

--- Basic Usage ---
Immediately after executing the plugin command,
execute the "Shop Processing" event command.
From the shop's product list,
this will generate a product list within the range specified by the plugin
command.

If you do not use the plugin command,
"Shop Processing" will function as a normal shop.

Usage Example: Event Command
-----
◆Plugin Command: MNKR_RandomShop range 2 4
◆Shop Processing: Potion
: : Hi-Potion
: : Short Sword
: : Hard Leather
-----

--- Advanced ---
-- Adding Items --
MNKR_RandomShop add [Item Type (i/w/a)] [Starting ID] [Ending ID]

Example: Add items ID1 to ID10
MNKR_RandomShop add i 1 5

-- Opening a Shop --
MNKR_RandomShop open 1 (Optional)
Opens the shop prepared with MNKR_RandomShop add.

Adding the last 1 makes the shop a "buy-only" shop.

Omitting it allows buying and selling.

-- Example --
Open a random shop (2-4 items) for item IDs 7-9,
weapon IDs 1-5,
and armor IDs 2-6.

Execute the following plugin commands in order:
MNKR_RandomShop range 2 4
MNKR_RandomShop add i 7 9
MNKR_RandomShop add w 1 5
MNKR_RandomShop add a 2 6
MNKR_RandomShop open

This plugin was modified for RPG Maker MV using MG_RandomShop.js by M.GAMES
mo-to as a reference.

Please contact the modifier for any inquiries regarding this plugin.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission, and there are
no restrictions on its use (commercial, 18+, etc.).

@param stockOutWord
@text Sold out words
@desc The text that will be displayed on the price tag when the item is sold out
@type string
@default 品切れ
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_RandomShop.js
@plugindesc 商品リストがランダムになるショップを作れるようになります。
@author M.GAMES mo-to / 改変:munokura

@help
商品リストがランダムになるショップを作れるようになります。
入退店を繰り返すと商品が再入荷されます。
その場限りの店などの使い方に向いているでしょう。

プラグインコマンド
MNKR_RandomShop range 品揃え最小数 品揃え最大数

--- 基本的な使い方 ---
プラグインコマンドを実行直後に、
イベントコマンドの「ショップの処理」を実行してください。
ショップの商品リストから、
プラグインコマンドで指定した範囲の商品リストを生成するショップになります。

プラグインコマンドを使用しなければ、
「ショップの処理」は通常のショップとして機能します。

使用例イベントコマンド
-----
◆プラグインコマンド：MNKR_RandomShop range 2 4
◆ショップの処理：ポーション
：　　　　　　　：ハイポーション
：　　　　　　　：ショートソード
：　　　　　　　：ハードレザー
-----

--- 応用編 ---
-- 品揃えを追加する --
MNKR_RandomShop add [商品種別(i/w/a)] [開始ID] [最終ID]

例：アイテムをID1からID10を追加
MNKR_RandomShop add i 1 5

-- ショップを開く --
MNKR_RandomShop open 1(省略可能)
MNKR_RandomShop add で用意されたショップを開きます。

最後の1を入れると「購入のみ」のショップになります。
省略すると、売買可能です。

-- 実用例 --
アイテムID7から9、
武器ID1から5、
防具ID2から6の
ランダムショップ(2個から4個)を開く

以下のプラグインコマンドを順に実行
MNKR_RandomShop range 2 4
MNKR_RandomShop add i 7 9
MNKR_RandomShop add w 1 5
MNKR_RandomShop add a 2 6
MNKR_RandomShop open

M.GAMES mo-to 氏作の MG_RandomShop.js を参考に
RPGツクールMV用に作り変えました。
このプラグインへの問い合わせは改変者へお願いいたします。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param stockOutWord
@text 売り切れ時ワード
@desc 売り切れのとき値札に表示されるテキストです
@type string
@default 品切れ
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_stockOutWord = parameters['stockOutWord'] || '品切れ';

  let MNKR_RandomShop = false;
  let minRange = 0;
  let maxRange = 0;
  const goodsList = [];

  //-----------------------------------------------------------------------------
  // Game_Interpreter

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === pluginName) {
      switch (args[0]) {
        case 'open':
          const onlyBuy = Number(args[1]) === 1;
          const randomGoods = this.MNKR_RandomGoods(goodsList);
          SceneManager.push(Scene_MNKR_RandomShop);
          SceneManager.prepareNextScene(randomGoods, onlyBuy);
          break;
        case 'add':
          const categoryWord = args[1];
          const categoryId = this.MNKR_categoryId(categoryWord);
          const startId = Number(args[2]);
          const endId = Number(args[3]);
          this.MNKR_AddGoods(categoryId, startId, endId);
          break;
        case 'range':
          MNKR_RandomShop = true;
          minRange = Number(args[1] || 1);
          maxRange = Number(args[2] || 1);
      }
    }
  };

  const _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
  Game_Interpreter.prototype.command302 = function () {
    if (MNKR_RandomShop && !$gameParty.inBattle()) {
      const goods = [this._params];
      const onlyBuy = this._params[4];
      while (this.nextEventCode() === 605) {
        this._index++;
        goods.push(this.currentCommand().parameters);
      }
      const randomGoods = this.MNKR_RandomGoods(goods);
      SceneManager.push(Scene_MNKR_RandomShop);
      SceneManager.prepareNextScene(randomGoods, onlyBuy);
      return true;
    } else {
      return _Game_Interpreter_command302.call(this);
    }
  };

  Game_Interpreter.prototype.MNKR_RandomGoods = function (goods) {
    maxRange = maxRange > 0 ? maxRange : 1;
    goods[0].splice(4, 1);
    for (let i = 0; i < goods.length; i++) {
      goods[i].push(true);
    }
    const goodsCount = Math.floor((Math.random() * maxRange) + minRange);
    const randomGoods = [];
    for (let i = 0; i < goodsCount; i++) {
      randomGoods.push(goods[Math.floor(Math.random() * goods.length)].slice());
    }
    return randomGoods;
  }

  Game_Interpreter.prototype.MNKR_categoryId = function (categoryWord) {
    if (categoryWord === 'i') {
      return 0;
    }
    if (categoryWord === 'w') {
      return 1;
    }
    if (categoryWord === 'a') {
      return 2;
    }
  }

  Game_Interpreter.prototype.MNKR_AddGoods = function (categoryId, startId, endId) {
    for (let i = startId; i < endId + 1; i++) {
      goodsList.push([categoryId, i, 0, 0]);
    }
  };

  //-----------------------------------------------------------------------------
  // Scene_MNKR_RandomShop

  function Scene_MNKR_RandomShop() {
    this.initialize.apply(this, arguments);
  }

  Scene_MNKR_RandomShop.prototype = Object.create(Scene_Shop.prototype);
  Scene_MNKR_RandomShop.prototype.constructor = Scene_MNKR_RandomShop;

  Scene_MNKR_RandomShop.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_MNKR_RandomShop.prototype.createCommandWindow = function () {
    this._commandWindow = new Window_ShopCommand(this._goldWindow.x, this._purchaseOnly);
    this._commandWindow.y = this._helpWindow.height;
    this._commandWindow.setHandler('buyRandom', this.commandBuy.bind(this));
    this._commandWindow.setHandler('sell', this.commandSell.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
  };

  Scene_MNKR_RandomShop.prototype.onBuyOk = function () {
    this._item = this._buyWindow.item();
    this._buyWindow.hide();
    this.doBuy(1);
    this.onNumberOk.call(this);
  };

  Scene_MNKR_RandomShop.prototype.doBuy = function (number) {
    $gameParty.loseGold(number * this.buyingPrice());
    $gameParty.gainItem(this._item, number);
    this._goods[this._buyWindow.index()][4] = false;
    this.activateBuyWindow();
  };

  const _Scene_MNKR_RandomShop_popScene = Scene_MNKR_RandomShop.prototype.popScene;
  Scene_MNKR_RandomShop.prototype.popScene = function () {
    MNKR_RandomShop = false;
    goodsList.length = 0;
    _Scene_MNKR_RandomShop_popScene.call(this);
  };

  //-----------------------------------------------------------------------------
  // Window_ShopCommand

  const _Window_ShopCommand_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
  Window_ShopCommand.prototype.makeCommandList = function () {
    if (MNKR_RandomShop) {
      this.addCommand(TextManager.buy, 'buyRandom');
      this.addCommand(TextManager.sell, 'sell', !this._purchaseOnly);
      this.addCommand(TextManager.cancel, 'cancel');
    } else {
      _Window_ShopCommand_makeCommandList.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_ShopBuy

  const _Window_ShopBuy_isCurrentItemEnabled = Window_ShopBuy.prototype.isCurrentItemEnabled;
  Window_ShopBuy.prototype.isCurrentItemEnabled = function () {
    if (MNKR_RandomShop) {
      const hasEnabled = this.isEnabled(this._data[this.index()]) && this._shopGoods[this.index()][4];
      return hasEnabled;
    }
    return _Window_ShopBuy_isCurrentItemEnabled.call(this);
  };

  const _Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
  Window_ShopBuy.prototype.drawItem = function (index) {
    if (MNKR_RandomShop) {
      const item = this._data[index];
      const rect = this.itemRect(index);
      const priceWidth = 96;
      rect.width -= this.textPadding();
      const stock = this._shopGoods[index][4];
      const displayPrice = stock ? this.price(item) : PRM_stockOutWord;
      this.changePaintOpacity(this.isEnabled(item));
      this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
      this.drawText(displayPrice, rect.x + rect.width - priceWidth, rect.y, priceWidth, 'right');
      this.changePaintOpacity(true);
    } else {
      _Window_ShopBuy_drawItem.call(this, index);
    }
  };

})();
