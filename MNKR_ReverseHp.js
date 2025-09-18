/*
 * --------------------------------------------------
 * MNKR_ReverseHp.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ReverseHp.js
@plugindesc Changes the display of HP to accumulated damage.
@author munokura
@license MIT License

@help
Changes the HP display to show accumulated damage.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ReverseHp.js
@plugindesc HPの表示を蓄積ダメージに変更します。
@author munokura

@help
HPの表示を蓄積ダメージに変更します。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    "use strict";

    Window_Base.prototype.drawActorHp = function (actor, x, y, width) {
        width = width || 186;
        var color1 = this.hpGaugeColor1();
        var color2 = this.hpGaugeColor2();
        this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.hpA, x, y, 44);
        const reverseHp = actor.mhp - actor.hp;
        this.drawCurrentAndMax(reverseHp, actor.mhp, x, y, width,
            this.hpColor(actor), this.normalColor());
    };

    Game_BattlerBase.prototype.hpRate = function () {
        return (this.mhp - this.hp) / this.mhp;
    };

})();