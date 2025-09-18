/*
 * --------------------------------------------------
 * MNKR_HideParam.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_HideParam.js
@plugindesc Hides the specified items in each scene.
@author munokura
@license MIT License

@help
Hides specified items in each scene (items, skills, equipment, stats, sorting,
and battle).

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, 18+, etc.).

@param level
@desc Specifies whether to display the level.
@type boolean
@on display
@off hidden
@default false

@param exp
@text Experience points
@desc Specify whether to display experience-related information.
@type boolean
@on display
@off hidden
@default false

@param hpGauge
@text HP Gauge
@desc Specifies whether to display the gauge.
@type boolean
@on display
@off hidden
@default false

@param mpGauge
@text MP Gauge
@desc Specifies whether to display the gauge.
@type boolean
@on display
@off hidden
@default false

@param tpGauge
@text TP gauge
@desc Specifies whether to display the gauge.
@type boolean
@on display
@off hidden
@default false

@param atk
@text Attack Power
@desc Specify whether to display attack power.
@type boolean
@on display
@off hidden
@default false

@param def
@text Defense power
@desc Specify whether to display defensive power.
@type boolean
@on display
@off hidden
@default false

@param mat
@text magic power
@desc Specify whether to display magic power.
@type boolean
@on display
@off hidden
@default false

@param mdf
@text magic defense
@desc Specifies whether to display magic defense.
@type boolean
@on display
@off hidden
@default false

@param agi
@text agility
@desc Specifies whether to display agility.
@type boolean
@on display
@off hidden
@default false

@param luk
@text luck
@desc Specify whether to display luck.
@type boolean
@on display
@off hidden
@default false
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_HideParam.js
@plugindesc 各シーンで指定項目を非表示にします。
@author munokura

@help
各シーン（アイテム・スキル・装備・ステータス・並び替え・戦闘）で
指定項目を非表示にします。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param level
@text レベル
@type boolean
@on 表示
@off 非表示
@default false
@desc レベルを表示するか指定します。

@param exp
@text 経験値
@type boolean
@on 表示
@off 非表示
@default false
@desc 経験値関係情報を表示するか指定します。

@param hpGauge
@text HPゲージ
@type boolean
@on 表示
@off 非表示
@default false
@desc ゲージを表示するか指定します。

@param mpGauge
@text MPゲージ
@type boolean
@on 表示
@off 非表示
@default false
@desc ゲージを表示するか指定します。

@param tpGauge
@text TPゲージ
@type boolean
@on 表示
@off 非表示
@default false
@desc ゲージを表示するか指定します。

@param atk
@text 攻撃力
@type boolean
@on 表示
@off 非表示
@default false
@desc 攻撃力を表示するか指定します。

@param def
@text 防御力
@type boolean
@on 表示
@off 非表示
@default false
@desc 防御力を表示するか指定します。

@param mat
@text 魔法力
@type boolean
@on 表示
@off 非表示
@default false
@desc 魔法力を表示するか指定します。

@param mdf
@text 魔法防御
@type boolean
@on 表示
@off 非表示
@default false
@desc 魔法防御を表示するか指定します。

@param agi
@text 敏捷性
@type boolean
@on 表示
@off 非表示
@default false
@desc 敏捷性を表示するか指定します。

@param luk
@text 運
@type boolean
@on 表示
@off 非表示
@default false
@desc 運を表示するか指定します。
*/

(() => {

  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const PRM_level = parameters['level'] === 'true';
  const PRM_exp = parameters['exp'] === 'true';
  const PRM_hpGauge = parameters['hpGauge'] === 'true';
  const PRM_mpGauge = parameters['mpGauge'] === 'true';
  const PRM_tpGauge = parameters['tpGauge'] === 'true';
  const PRM_displayParam = [];
  PRM_displayParam.push(parameters['atk'] === 'true');
  PRM_displayParam.push(parameters['def'] === 'true');
  PRM_displayParam.push(parameters['mat'] === 'true');
  PRM_displayParam.push(parameters['mdf'] === 'true');
  PRM_displayParam.push(parameters['agi'] === 'true');
  PRM_displayParam.push(parameters['luk'] === 'true');
  const hasHideParam = PRM_displayParam.some((element) => element === false);

  const _Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
  Window_Base.prototype.drawActorHp = function (actor, x, y, width) {
    if (PRM_hpGauge) {
      _Window_Base_drawActorHp.call(this, actor, x, y, width);
    }
  };

  const _Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
  Window_Base.prototype.drawActorMp = function (actor, x, y, width) {
    if (PRM_mpGauge) {
      _Window_Base_drawActorMp.call(this, actor, x, y, width);
    }
  };

  const _Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
  Window_Base.prototype.drawActorTp = function (actor, x, y, width) {
    if (PRM_tpGauge) {
      _Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
  };

  const _Window_Base_drawActorLevel = Window_Base.prototype.drawActorLevel;
  Window_Base.prototype.drawActorLevel = function (actor, x, y) {
    if (PRM_level) {
      _Window_Base_drawActorLevel.call(this, actor, x, y);
    }
  };

  const _Window_Status_drawActorLevel = Window_Status.prototype.drawActorLevel;
  Window_Status.prototype.drawActorLevel = function (actor, x, y) {
    if (PRM_level) {
      _Window_Status_drawActorLevel.call(this, actor, x, y);
    }
  };

  const _Window_Status_drawExpInfo = Window_Status.prototype.drawExpInfo;
  Window_Status.prototype.drawExpInfo = function (x, y) {
    if (PRM_exp) {
      _Window_Status_drawExpInfo.call(this, x, y);
    }
  };

  const _Window_Status_drawParameters = Window_Status.prototype.drawParameters;
  Window_Status.prototype.drawParameters = function (x, y) {
    if (hasHideParam) {
      const lineHeight = this.lineHeight();
      let statusLineY = 0;
      for (var i = 0; i < 6; i++) {
        if (PRM_displayParam[i]) {
          var paramId = i + 2;
          var y2 = y + lineHeight * statusLineY;
          statusLineY++;
          this.changeTextColor(this.systemColor());
          this.drawText(TextManager.param(paramId), x, y2, 160);
          this.resetTextColor();
          this.drawText(this._actor.param(paramId), x + 160, y2, 60, 'right');
        }
      }
    } else {
      _Window_Status_drawParameters.call(this, x, y);
    }
  };

  const _Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
  Window_EquipStatus.prototype.refresh = function () {
    if (hasHideParam) {
      this.contents.clear();
      if (this._actor) {
        this.drawActorName(this._actor, this.textPadding(), 0);
        let equipLineY = 1;
        for (let i = 0; i < 6; i++) {
          if (PRM_displayParam[i]) {
            this.drawItem(0, this.lineHeight() * (equipLineY), 2 + i);
            equipLineY++;
          }
        }
      }
    } else {
      _Window_EquipStatus_refresh.call(this);
    }
  };

})();
