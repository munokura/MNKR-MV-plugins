/*
 * --------------------------------------------------
 * MNKR_ChangeEnemyHue.js
 *   Ver.0.0.3
 * Copyright (c) 2022 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChangeEnemyHue.js
 * @plugindesc ステートが付与された敵キャラの色相を変更できます。
 * @author munokura
 *
 * @help
 * ステートが付与された敵キャラの色相を変更できます。
 * 
 * ステートのメモ欄に下記のタグを入力してください。
 * <MNKR_ChangeEnemyHue:色相値>
 * 色相値は0以上360以下で指定してください。
 * タグが書かれたステートを付与された敵キャラの色相を変更します。
 * 複数のステートが関係する場合、ステートIDが小さいものを優先します。
 * 
 * 記入例
 * <MNKR_ChangeEnemyHue:100>
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

  const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
  Sprite_Enemy.prototype.initMembers = function () {
    _Sprite_Enemy_initMembers.call(this);
    this._battlerMetaHue = false;
  }

  const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
  Sprite_Enemy.prototype.updateBitmap = function () {
    const enemyStatesArray = this._enemy.states();
    const hasHueStateObject = enemyStatesArray.find(value => value.meta.MNKR_ChangeEnemyHue);
    if (hasHueStateObject) {
      const metaHue = Number(hasHueStateObject.meta.MNKR_ChangeEnemyHue);
      if (this._battlerHue !== metaHue) {
        const name = this._enemy.battlerName();
        this._battlerHue = metaHue;
        this.loadBitmap(name, metaHue);
        this._battlerMetaHue = true;
      }
    } else {
      _Sprite_Enemy_updateBitmap.call(this);
    }
  };

  const _Sprite_Enemy_initVisibility = Sprite_Enemy.prototype.initVisibility;
  Sprite_Enemy.prototype.initVisibility = function () {
    const hasMetaHue = this._battlerMetaHue;
    if (!hasMetaHue) {
      _Sprite_Enemy_initVisibility.call(this);
    }
  };

})();
