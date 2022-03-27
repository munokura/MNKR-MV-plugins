/*
 * --------------------------------------------------
 * MNKR_RangeItemShop.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_RangeItemShop.js
 * @plugindesc ショップの品揃えを範囲指定で設定できるプラグインコマンドが使えます。
 * @author munokura
 *
 * @help
 * ショップの品揃えを範囲指定で設定できるプラグインコマンドが使えます。
 * 
 * -- 品揃えを追加する --
 * MNKR_RangeItemShop add [商品種別(i/w/a)] [開始ID] [最終ID]
 * 
 * 例：アイテムをID1からID10を追加
 * MNKR_RangeItemShop add i 1 5
 * 
 * 
 * -- ショップを開く --
 * MNKR_RangeItemShop addで準備されたショップを開きます。
 * MNKR_RangeItemShop open 1(省略可能)
 * 
 * 最後の1を入れると「購入のみ」のショップになります。
 * 省略すると、売買可能です。
 * 
 * -- 実用例 --
 * アイテムID7から9、武器ID1から5、防具ID2から6のショップを開く
 * 
 * MNKR_RangeItemShop add i 7 9
 * MNKR_RangeItemShop add w 1 5
 * MNKR_RangeItemShop add a 2 6
 * MNKR_RangeItemShop open
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 */


(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  const goodsList = [];

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command === pluginName) {
      switch (args[0]) {
        case 'open':
          const onlyBuy = Number(args[1]) === 1;
          SceneManager.push(Scene_Shop);
          SceneManager.prepareNextScene(goodsList, onlyBuy);
          break;
        case 'add':
          const categoryWord = args[1];
          const categoryId = this.MNKR_categoryId(categoryWord);
          const startId = Number(args[2]);
          const endId = Number(args[3]);
          this.MNKR_AddGoods(categoryId, startId, endId);
          break;
      }
    }
  };

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

  const _Scene_Shop_popScene = Scene_Shop.prototype.popScene;
  Scene_Shop.prototype.popScene = function () {
    _Scene_Shop_popScene.call(this);
    goodsList.length = 0;
  };

})();
