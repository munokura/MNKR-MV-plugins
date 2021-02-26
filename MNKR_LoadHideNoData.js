/*
 * --------------------------------------------------
 * MNKR_LoadHideNoData.js
 *   Ver.1.0.0
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_LoadHideNoData.js
 * @plugindesc コンティニュー/セーブ時にセーブされていないスロットを非表示にします。
 * @author munokura
 *
 * @help
 * コンティニュー/セーブ時にセーブされていないスロットを非表示にします。
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
