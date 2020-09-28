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
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
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
