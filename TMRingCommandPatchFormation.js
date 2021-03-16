/*
 * --------------------------------------------------
 * TMRingCommandPatchFormation.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */
/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/TMRingCommandPatchFormation.js
 * @plugindesc TMRingCommandPatchFormation の並べ替え表示を簡易にします。
 * @author munokura
 *
 * @help
 * TMRingCommandPatchFormation のパッチプラグインです。
 * TMRingCommandPatchFormation の並べ替え表示を簡易にします。
 * プラグイン管理で TMRingCommandPatchFormation の下側に配置してください。
 * 
 * ウィンドウの位置と大きさの調整は GraphicalDesignMode.js を使用してください。
 * https://triacontane.blogspot.com/2016/03/gui.html
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

  const _Window_Base_drawActorSimpleStatus = Window_Base.prototype.drawActorSimpleStatus;
  Window_Base.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
    const isScene = SceneManager._scene.constructor.name === 'Scene_RCFormation';

    if (isScene) {
      this.drawActorName(actor, x, y);
    } else {
      _Window_Base_drawActorSimpleStatus.call(this, actor, x, y, width);
    }
  };

})();