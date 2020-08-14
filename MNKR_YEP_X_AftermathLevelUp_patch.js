/*
 * --------------------------------------------------
 * YEP_X_AftermathLevelUp_patch Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc YEP_X_AftermathLevelUp で運を非表示にします。
 * @author munokura
 *
 * @help
 * YEP_X_AftermathLevelUp で運を非表示にします。
 * プラグイン管理で YEP_X_AftermathLevelUp の下側に配置してください。
 */


Window_VictoryLevelUp.prototype.drawDarkRects = function() {
    for (var i = 0; i < 8; ++i) {
      var rect = this.itemRect(i);
      this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
    }
};

Window_VictoryLevelUp.prototype.drawStatChanges = function() {
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
