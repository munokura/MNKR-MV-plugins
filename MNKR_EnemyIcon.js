/*
 * --------------------------------------------------
 * MNKR_EnemyIcon.js
 *   Ver.1.0.3
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_EnemyIcon.js
 * @plugindesc 戦闘画面で敵キャラの名前の前にアイコンを表示します。
 * @help
 * 戦闘画面で敵キャラの名前の前にアイコンを表示します。
 *
 * 敵キャラのメモ欄に下記のようにタグを入れてください。
 * <MNKR_EnemyIcon:アイコンID>
 *
 * 例
 * <MNKR_EnemyIcon:64>
 *
 * プラグインコマンドはありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @param defaultIcon
 * @text デフォルトアイコン
 * @type number
 * @desc メモタグを入れない場合に表示するアイコン。デフォルト16
 * 0にすると、非表示で左に詰まります。
 * @default 16
 *
 */

(function () {
    'use strict';
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_defaultIcon = Number(parameters['defaultIcon'] || 0);

    const _Window_BattleEnemy_drawItem = Window_BattleEnemy.prototype.drawItem
    Window_BattleEnemy.prototype.drawItem = function (index) {
        this.resetTextColor();
        const enemyObj = this._enemies[index];
        const iconId = Number(enemyObj.enemy().meta.MNKR_EnemyIcon) || PRM_defaultIcon;
        if (iconId > 0) {
            const name = enemyObj.name();
            const rect = this.itemRectForText(index);
            const iconBoxWidth = Window_Base._iconWidth + 4;
            this.drawIcon(iconId, rect.x + 2, rect.y + 2);
            this.drawText(name, rect.x + iconBoxWidth, rect.y, rect.width - iconBoxWidth);
        } else {
            _Window_BattleEnemy_drawItem.call(this, index);
        };
    };

})();
