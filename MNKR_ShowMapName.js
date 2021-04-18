/*
 * --------------------------------------------------
 * MNKR_ShowMapName.js
 *   Ver.0.0.3
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_ShowMapName.js
 * @plugindesc マップ名を表示したままにします。
 * @author munokura
 *
 * @help
 * マップ名を表示したままにします。
 * 
 * マップのメモ欄に
 * <MNKR_ShowMapName>
 * と入れたマップに反映されます。
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * 
 * @param globalSetting
 * @text 全マップでマップ名表示
 * @desc 全マップでマップ名を表示したままにします。
 * @type boolean
 * @on 全マップ
 * @off タグがあるマップ
 * @default false
 */

(() => {
  "use strict";

  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
  const parameters = PluginManager.parameters(pluginName);
  const globalSetting = parameters['globalSetting'] === 'true';

  const _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function () {
    _Scene_Map_start.call(this);
    const showMapName = $dataMap.meta.MNKR_ShowMapName || globalSetting;
    if (showMapName) {
      this._mapNameWindow.open();
    }
  };

  const _Window_MapName_update = Window_MapName.prototype.update;
  Window_MapName.prototype.update = function () {
    const showMapName = $dataMap.meta.MNKR_ShowMapName || globalSetting;
    if (showMapName) {
      Window_Base.prototype.update.call(this);
      this.updateFadeIn();
    } else {
      _Window_MapName_update.call(this);
    }
  };

  const _Window_MapName_updateFadeIn = Window_MapName.prototype.updateFadeIn;
  Window_MapName.prototype.updateFadeIn = function () {
    const showMapName = $dataMap.meta.MNKR_ShowMapName || globalSetting;
    if (showMapName) {
      if (this.contentsOpacity < 256) {
        this.contentsOpacity += 16;
      }
    } else {
      _Window_MapName_updateFadeIn.call(this);
    }
  };

  const _Game_Screen_startFadeOut = Game_Screen.prototype.startFadeOut;
  Game_Screen.prototype.startFadeOut = function (duration) {
    const showMapName = $dataMap.meta.MNKR_ShowMapName || globalSetting;
    if (showMapName) {
      $gameMap.disableNameDisplay();
    }
    _Game_Screen_startFadeOut.call(this, duration);
  };

  const _Game_Screen_startFadeIn = Game_Screen.prototype.startFadeIn;
  Game_Screen.prototype.startFadeIn = function (duration) {
    const showMapName = $dataMap.meta.MNKR_ShowMapName || globalSetting;
    if (showMapName) {
      $gameMap.enableNameDisplay();
    }
    _Game_Screen_startFadeIn.call(this, duration);
  };

})();