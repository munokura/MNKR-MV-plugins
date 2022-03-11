/*
 * --------------------------------------------------
 * MNKR_RandomShop.js
 *   Ver.0.0.3
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
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_RandomShop.js
 * @plugindesc 商品リストがランダムになるショップを作れるようになります。
 * @author M.GAMES mo-to / 改変:munokura
 *
 * @help
 * 商品リストがランダムになるショップを作れるようになります。
 * 
 * プラグインコマンド
 * MNKR_RandomShop 品揃え最小数 品揃え最大数
 * 
 * 
 * 使い方
 * プラグインコマンドを実行直後に、
 * イベントコマンドの「ショップの処理」を実行してください。
 * ショップの商品リストから、
 * プラグインコマンドで指定した範囲の商品リストを生成するショップになります。
 * 
 * プラグインコマンドを使用しなければ、
 * 「ショップの処理」は通常のショップとして機能します。
 * 
 * 使用例イベントコマンド
 * -----
 * ◆プラグインコマンド：MNKR_RandomShop 2 4
 * ◆ショップの処理：ポーション
 * ：　　　　　　　：ハイポーション
 * ：　　　　　　　：ショートソード
 * ：　　　　　　　：ハードレザー
 * -----
 * 入退店を繰り返すと商品が再入荷されます。
 * その場限りの店などの使い方に向いているでしょう。
 * 
 * 
 * M.GAMES mo-to 氏作の MG_RandomShop.js を参考に
 * RPGツクールMV用に作り変えました。
 * このプラグインへの問い合わせは改変者へお願いいたします。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param stockOutWord
 * @text 売り切れ時ワード
 * @desc 売り切れのとき値札に表示されるテキストです
 * @type string
 * @default 品切れ
 */


(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_stockOutWord = parameters['stockOutWord'] || '品切れ';

  let MNKR_RandomShop = false;
  let minRange = 0;
  let maxRange = 0;

  //-----------------------------------------------------------------------------
  // Game_Interpreter

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === pluginName) {
      MNKR_RandomShop = true;
      minRange = Number(args[0] || 1);
      maxRange = Number(args[1] || 1);
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
      randomGoods.push(goods[Math.floor(Math.random() * goods.length)].map(function (n) { return n; }));
    }
    return randomGoods;
  }

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
    this._commandWindow.setHandler('cancel', this.MNKR_popScene.bind(this));
    this.addWindow(this._commandWindow);
  };

  Scene_MNKR_RandomShop.prototype.MNKR_popScene = function () {
    MNKR_RandomShop = false;
    this.popScene();
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
