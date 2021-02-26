/*
 * --------------------------------------------------
 * MNKR_YEP_X_AftermathLevelUp_patch.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_YEP_X_AftermathLevelUp_patch.js
 * @plugindesc YEP_X_AftermathLevelUp で運を非表示にします。
 * @author munokura
 *
 * @help
 * YEP_X_AftermathLevelUp で運を非表示にします。
 * プラグイン管理で YEP_X_AftermathLevelUp の下側に配置してください。
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(function () {
  'use strict';

  Window_VictoryLevelUp.prototype.drawDarkRects = function () {
    for (var i = 0; i < 8; ++i) {
      var rect = this.itemRect(i);
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
  };

  Window_VictoryLevelUp.prototype.drawStatChanges = function () {
    this.contents.fontSize = Yanfly.Param.ALUFontSize;
    for (var i = 0; i < 8; ++i) {
      var rect = this.itemRect(i);
      this.drawRightArrow(rect);
      this.drawParamName(i, rect);
      this.drawCurrentParam(i, rect);
      this.drawNewParam(i, rect);
      this.drawParamDifference(i, rect);
    }
  };

})();
