/*
 * --------------------------------------------------
 * MNKR_LoadHideNoData Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc コンティニュー/セーブ時にセーブされていないスロットを非表示にします。
 * @author munokura
 *
 * @help
 * コンティニュー/セーブ時にセーブされていないスロットを非表示にします。
 */

(function () {
    'use strict';

    Window_SavefileList.prototype.drawItem = function (index) {
        let id = index + 1;
        let valid = DataManager.isThisGameFile(id);
        let info = DataManager.loadSavefileInfo(id);
        let rect = this.itemRectForText(index);
        this.resetTextColor();
        if (this._mode === 'load') {
            this.changePaintOpacity(valid);
        }
        if (info) {
            this.drawFileId(id, rect.x, rect.y);
            this.changePaintOpacity(valid);
            this.drawContents(info, rect, valid);
            this.changePaintOpacity(true);
        }
    };

})();
