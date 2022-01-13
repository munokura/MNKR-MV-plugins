/*
 * --------------------------------------------------
 * MNKR_ChangeSizeUI.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ChangeSizeUI.js
 * @plugindesc UIエリアの大きさを指定します。
 * @author munokura
 *
 * @help
 * UIエリアの大きさを指定します。
 * 
 * 解像度の指定は公式プラグインCommunity_Basic.js等を使用してください。
 * このプラグインはCommunity_Basic.jsよりも下に配置してください。
 * 
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 * @param boxWidth
 * @text UIエリアの幅
 * @type number
 * @default 816
 *
 * @param boxHeight
 * @text UIエリアの高さ
 * @type number
 * @default 624
 */


(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const param = {};
  param.boxWidth = Number(parameters['boxWidth'] || 816);
  param.boxHeight = Number(parameters['boxHeight'] || 624);

  const _SceneManager_initGraphics = SceneManager.initGraphics;
  SceneManager.initGraphics = function () {
    _SceneManager_initGraphics.call(this);
    Graphics.boxWidth = param.boxWidth;
    Graphics.boxHeight = param.boxHeight;
  };

})();
