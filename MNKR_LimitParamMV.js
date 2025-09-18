/*
 * --------------------------------------------------
 * MNKR_LimitParamMV.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_LimitParamMV.js
@plugindesc Specify the upper and lower limits of basic ability scores.
@author munokura
@license MIT License

@help
Specifies the upper and lower limits of basic ability scores.

In RPG Maker MV's core script, the upper limits are as follows:
Max HP: 999999
Max MP: 9999
Other basic ability scores: 999

The lower limits in the core script are as follows:
Max MP: 0
Other basic ability scores: 1

These values can be specified for each ability using the plugin.
The plugin's default maximum value, "Infinity," specifies infinity.

Note:
Do not specify a lower limit greater than the upper limit.
In that case, the lower limit will be the same as the upper limit.

The upper and lower limits that can be specified in the database ability curve
are different from the limits specified in the core script.
This plugin only changes the core script specifications.

You can change ability scores beyond the default limits using event commands
such as
◆Increase/Decrease Ability Score: Harold, Defense - 1

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, R18, etc.).

@param upperParam
@text Ability Score Limit

@param upperHp
@text Max HP
@desc Specifies the upper limit of maximum HP.
@type combo
@default Infinity
@parent upperParam
@option Infinity

@param upperMp
@text Max MP
@desc Specifies the upper limit of maximum MP.
@type combo
@default Infinity
@parent upperParam
@option Infinity

@param upperAtk
@text Attack Power
@type combo
@default Infinity
@parent upperParam
@option Infinity

@param upperDef
@text Defense power
@desc Specifies the upper limit of defense power.
@type combo
@default Infinity
@parent upperParam
@option Infinity

@param upperMat
@text magic power
@desc Specifies the upper limit of magical power.
@type combo
@default Infinity
@parent upperParam
@option Infinity

@param upperMdf
@text magic defense
@desc Specifies the upper limit of magic defense.
@type combo
@default Infinity
@parent upperParam
@option Infinity

@param upperAgi
@text Agility
@desc Specifies the upper limit for agility.
@type combo
@default Infinity
@parent upperParam
@option Infinity

@param upperLuk
@text luck
@desc Specifies the upper limit of luck.
@type combo
@default Infinity
@parent upperParam
@option Infinity

@param lowerParam
@text Ability Score Lower Limit

@param lowerHp
@text Max HP
@desc Specifies the lower limit of maximum HP.
@default 0
@parent lowerParam

@param lowerMp
@text Max MP
@desc Specifies the lower limit of maximum MP.
@default 0
@parent lowerParam

@param lowerAtk
@text Attack Power
@desc Specifies the minimum attack power.
@default 0
@parent lowerParam

@param lowerDef
@text Defense power
@desc Specifies the lower limit of defense power.
@default 0
@parent lowerParam

@param lowerMat
@text magic power
@desc Specifies the minimum value of magic power.
@default 0
@parent lowerParam

@param lowerMdf
@text magic defense
@desc Specifies the lower limit of magic defense.
@default 0
@parent lowerParam

@param lowerAgi
@text Agility
@desc Specifies the lower limit for agility.
@default 0
@parent lowerParam

@param lowerLuk
@text luck
@desc Specifies the lower limit of luck.
@default 0
@parent lowerParam
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_LimitParamMV.js
@plugindesc 基本能力値の上限値と下限値を指定します。
@author munokura

@help
基本能力値の上限値と下限値を指定します。

RPGツクールMVのコアスクリプトでは上限は下記です。
最大HP : 999999
最大MP : 9999
その他の基本能力値 : 999

コアスクリプトの下限は下記です。
最大MP : 0
その他の基本能力値 : 1

これらの値をプラグインで能力毎に指定できます。
プラグインのデフォルトで最大値に入っている「Infinity」は無限を指定します。

注意
  下限値の指定は上限値より大きくしないでください。
  その場合、下限値は上限値と同じになります。

  データベースの能力値曲線で指定できる上限と下限は、
  コアスクリプトの仕様である限界と異なります。
  このプラグインではコアスクリプトの仕様のみを変更します。

  デフォルトの限界を越えた能力値の変更は
  ◆能力値の増減：ハロルド, 防御力 - 1
  等のイベントコマンドを使用することで可能です。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。

@param upperParam
@text 能力値上限

@param upperHp
@text 最大HP
@default Infinity
@type combo
@option Infinity
@desc 最大HPの上限値を指定します。
ツクールデフォルト : 999999
@parent upperParam

@param upperMp
@text 最大MP
@default Infinity
@type combo
@option Infinity
@desc 最大MPの上限値を指定します。
ツクールデフォルト : 9999
@parent upperParam

@param upperAtk
@text 攻撃力
@default Infinity
@type combo
@option Infinity
ツクールデフォルト : 999
@parent upperParam

@param upperDef
@text 防御力
@default Infinity
@type combo
@option Infinity
@desc 防御力の上限値を指定します。
ツクールデフォルト : 999
@parent upperParam

@param upperMat
@text 魔法力
@default Infinity
@type combo
@option Infinity
@desc 魔法力の上限値を指定します。
ツクールデフォルト : 999
@parent upperParam

@param upperMdf
@text 魔法防御
@default Infinity
@type combo
@option Infinity
@desc 魔法防御の上限値を指定します。
ツクールデフォルト : 999
@parent upperParam

@param upperAgi
@text 俊敏性
@default Infinity
@type combo
@option Infinity
@desc 俊敏性の上限値を指定します。
ツクールデフォルト : 999
@parent upperParam

@param upperLuk
@text 運
@default Infinity
@type combo
@option Infinity
@desc 運の上限値を指定します。
ツクールデフォルト : 999
@parent upperParam

@param lowerParam
@text 能力値下限

@param lowerHp
@text 最大HP
@default 0
@desc 最大HPの下限値を指定します。
ツクールデフォルト : 1
@parent lowerParam

@param lowerMp
@text 最大MP
@default 0
@desc 最大MPの下限値を指定します。
ツクールデフォルト : 0
@parent lowerParam

@param lowerAtk
@text 攻撃力
@default 0
@desc 攻撃力の下限値を指定します。
ツクールデフォルト : 1
@parent lowerParam

@param lowerDef
@text 防御力
@default 0
@desc 防御力の下限値を指定します。
ツクールデフォルト : 1
@parent lowerParam

@param lowerMat
@text 魔法力
@default 0
@desc 魔法力の下限値を指定します。
ツクールデフォルト : 1
@parent lowerParam

@param lowerMdf
@text 魔法防御
@default 0
@desc 魔法防御の下限値を指定します。
ツクールデフォルト : 1
@parent lowerParam

@param lowerAgi
@text 俊敏性
@default 0
@desc 俊敏性の下限値を指定します。
ツクールデフォルト : 1
@parent lowerParam

@param lowerLuk
@text 運
@default 0
@desc 運の下限値を指定します。
ツクールデフォルト : 1
@parent lowerParam
*/

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);

  const upperHp = Math.ceil(Math.abs(parameters['upperHp'] || Infinity));
  const upperMp = Math.ceil(Math.abs(parameters['upperMp'] || Infinity));
  const upperAtk = Math.ceil(Math.abs(parameters['upperAtk'] || Infinity));
  const upperDef = Math.ceil(Math.abs(parameters['upperDef'] || Infinity));
  const upperMat = Math.ceil(Math.abs(parameters['upperMat'] || Infinity));
  const upperMdf = Math.ceil(Math.abs(parameters['upperMdf'] || Infinity));
  const upperAgi = Math.ceil(Math.abs(parameters['upperAgi'] || Infinity));
  const upperLuk = Math.ceil(Math.abs(parameters['upperLuk'] || Infinity));

  const lowerHp = Math.ceil(Math.abs(parameters['lowerHp'])) < upperHp ? Math.ceil(Math.abs(parameters['lowerHp'])) : upperHp;
  const lowerMp = Math.ceil(Math.abs(parameters['lowerMp'])) < upperMp ? Math.ceil(Math.abs(parameters['lowerMp'])) : upperMp;
  const lowerAtk = Math.ceil(Math.abs(parameters['lowerAtk'])) < upperAtk ? Math.ceil(Math.abs(parameters['lowerAtk'])) : upperAtk;
  const lowerDef = Math.ceil(Math.abs(parameters['lowerDef'])) < upperDef ? Math.ceil(Math.abs(parameters['lowerDef'])) : upperDef;
  const lowerMat = Math.ceil(Math.abs(parameters['lowerMat'])) < upperMat ? Math.ceil(Math.abs(parameters['lowerMat'])) : upperMat;
  const lowerMdf = Math.ceil(Math.abs(parameters['lowerMdf'])) < upperMdf ? Math.ceil(Math.abs(parameters['lowerMdf'])) : upperMdf;
  const lowerAgi = Math.ceil(Math.abs(parameters['lowerAgi'])) < upperAgi ? Math.ceil(Math.abs(parameters['lowerAgi'])) : upperAgi;
  const lowerLuk = Math.ceil(Math.abs(parameters['lowerLuk'])) < upperLuk ? Math.ceil(Math.abs(parameters['lowerLuk'])) : upperLuk;

  const _Game_BattlerBase_paramMax = Game_BattlerBase.prototype.paramMax;
  Game_BattlerBase.prototype.paramMax = function (paramId) {
    switch (paramId) {
      case 0:
        if (upperHp < 1) {
          return 1;
        }
        return upperHp;
      case 1:
        return upperMp;
      case 2:
        return upperAtk;
      case 3:
        return upperDef;
      case 4:
        return upperMat;
      case 5:
        return upperMdf;
      case 6:
        return upperAgi;
      case 7:
        return upperLuk;
    }
    return _Game_BattlerBase_paramMax.call(this, paramId);
  };

  const _Game_BattlerBase_paramMin = Game_BattlerBase.prototype.paramMin;
  Game_BattlerBase.prototype.paramMin = function (paramId) {
    switch (paramId) {
      case 0:
        if (lowerHp < 1) {
          return 1;
        }
        return lowerHp;
      case 1:
        return lowerMp;
      case 2:
        return lowerAtk;
      case 3:
        return lowerDef;
      case 4:
        return lowerMat;
      case 5:
        return lowerMdf;
      case 6:
        return lowerAgi;
      case 7:
        return lowerLuk;
    }
    return _Game_BattlerBase_paramMin.call(this, paramId);
  };

})();