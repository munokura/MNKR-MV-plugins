/*
 * --------------------------------------------------
 * MNKR_EnemyIcon.js
 *   Ver.1.1.0
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
 * アイコンIDはカンマ区切りで複数を指定できます。
 *
 * 例
 * <MNKR_EnemyIcon:64,65>
 * 
 * 注意事項
 * 
 * <MNKR_EnemyIcon:0,65>
 * のように0以下の数値を入れるとアイコンが表示されません。
 * 
 * また、敵キャラの名前の枠の幅を超えたアイコン数（デフォルトでは9個以上）を
 * 指定するとアイコンは縮まりません。
 * アイコンが枠をはみ出し、敵キャラ名が表示されません。
 *
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
 * 
 * Ver.1.1.0
 * アイコンを複数表示可能に機能追加
 * 
 * @param defaultIcon
 * @text デフォルトアイコン
 * @type number
 * @desc メモタグを入れない場合に表示するアイコン。デフォルト16
 * 0にすると、非表示で左に詰まります。
 * @default 16
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    const PRM_defaultIcon = Number(parameters['defaultIcon'] || 0);

    const _Window_BattleEnemy_drawItem = Window_BattleEnemy.prototype.drawItem
    Window_BattleEnemy.prototype.drawItem = function (index) {
        const enemyObj = this._enemies[index];
        const icons = enemyObj.enemy().meta.MNKR_EnemyIcon;
        const iconArr = icons ? icons.split(',').map(Number) : [PRM_defaultIcon];
        if (iconArr[0] > 0) {
            const iconMargin = Window_Base._iconWidth + 2;
            this.resetTextColor();
            const name = enemyObj.name();
            const rect = this.itemRectForText(index);
            const iconBoxWidth = iconMargin * iconArr.length + 2;
            for (let i in iconArr) {
                this.drawIcon(iconArr[i], rect.x + iconMargin * i, rect.y + 2);
            }
            this.drawText(name, rect.x + iconBoxWidth, rect.y, rect.width - iconBoxWidth);
        } else {
            _Window_BattleEnemy_drawItem.call(this, index);
        };
    };

})();
