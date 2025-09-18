/*
 * --------------------------------------------------
 * MNKR_ReverseMp.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ReverseMp.js
@plugindesc Changes the MP display to accumulated consumption.
@author munokura
@license MIT License

@help
Changes the MP display to cumulative consumption.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ReverseMp.js
@plugindesc MPの表示を蓄積消費量に変更します。
@author munokura

@help
MPの表示を蓄積消費量に変更します。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
    "use strict";

    Window_Base.prototype.drawActorMp = function (actor, x, y, width) {
        width = width || 186;
        var color1 = this.mpGaugeColor1();
        var color2 = this.mpGaugeColor2();
        this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.mpA, x, y, 44);
        const reverseMp = actor.mmp - actor.mp;
        this.drawCurrentAndMax(reverseMp, actor.mmp, x, y, width,
            this.mpColor(actor), this.normalColor());
    };

    Game_BattlerBase.prototype.mpRate = function () {
        return this.mmp > 0 ? (this.mmp - this.mp) / this.mhp : this.mmp;
    };

})();