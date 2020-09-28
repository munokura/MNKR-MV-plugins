/*
 * --------------------------------------------------
 * MNKR_EnemyIcon Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @param Default Icon
 * @text デフォルトアイコン
 * @type string
 * @desc メモタグを入れない場合に表示するアイコン。デフォルト16
 * 0にすると、非表示で左に詰まります。
 * @default 16
 *
 * @plugindesc 戦闘画面で敵キャラの名前の前にアイコンを表示します。
 * @help
 * 戦闘画面で敵キャラの名前の前にアイコンを表示します。
 *
 * 敵キャラのメモ欄に下記のようにタグを入れてください。
 * <EnemyIcon:アイコンID>
 *
 * 例
 * <EnemyIcon:64>
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

(function() {
    'use strict';
    var parameters = PluginManager.parameters('MNKR_EnemyIcon');
    var defaultIcon = parseInt(parameters['Default Icon'] || 16);

    const _Window_BattleEnemy_drawItem = Window_BattleEnemy.prototype.drawItem
    Window_BattleEnemy.prototype.drawItem = function(index) {
        this.resetTextColor();
        var enemy = this._enemies[index];
        var icon = parseInt(enemy.enemy().meta.EnemyIcon) || defaultIcon;
        if (icon) {
            var name = enemy.name();
            var rect = this.itemRectForText(index);
            var iconBoxWidth = Window_Base._iconWidth + 4;
            this.drawIcon(icon, rect.x + 2, rect.y + 2);
            this.drawText(name, rect.x + iconBoxWidth, rect.y, rect.width - iconBoxWidth);
        } else {
            _Window_BattleEnemy_drawItem.apply(this, arguments);
        };
    };
    
})();