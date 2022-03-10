/*
 * --------------------------------------------------
 * MNKR_RandomShop.js
 *   Ver.0.0.1
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_RandomShop.js
 * @plugindesc 商品リストがランダムになるショップを作れるようになります。
 * @author munokura
 *
 * @help
 * 製作途中です。
 * 最終的にローグライク向けの仕様に完成させる予定です。
 * 
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
 * 例：
 * ◆プラグインコマンド：MNKR_RandomShop 2 4
 * ◆ショップの処理：ポーション
 * ：　　　　　　　：ハイポーション
 * ：　　　　　　　：ショートソード
 * ：　　　　　　　：ハードレザー
 * ：　　　　　　　：ポーション
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */


(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  let MNKR_RandomShop = false;
  let minRange = 0;
  let maxRange = 0;

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
      MNKR_RandomShop = false;
      let goods = [this._params];
      while (this.nextEventCode() === 605) {
        this._index++;
        goods.push(this.currentCommand().parameters);
      }
      let randomGoods = this.MNKR_RandomGoods(goods);
      SceneManager.push(Scene_Shop);
      SceneManager.prepareNextScene(randomGoods, this._params[4]);
    } else {
      return _Game_Interpreter_command302.call(this);
    }
  };

  Game_Interpreter.prototype.MNKR_RandomGoods = function (goods) {
    maxRange = maxRange > 0 ? maxRange : 1;
    let goodsCount = 0;
    let randomGoods = [];
    goodsCount = Math.floor((Math.random() * maxRange) + minRange);
    for (let i = 0; i < goodsCount; i++) {
      randomGoods.push(goods[Math.floor(Math.random() * goods.length)]);
    }
    return randomGoods;
  }

})();
