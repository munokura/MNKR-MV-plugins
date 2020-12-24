﻿/*
 * --------------------------------------------------
 * MNKR_Henshin Ver.1.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_Henshin.js
 * @plugindesc プラグインコマンドでアクターを入れ替えられます。
 * @author munokura
 *
 * @help
 * プラグインコマンドでアクターを入れ替えられます。
 * パーティの並び順がそのままで入れ替わります。
 * 
 * マップでも戦闘中でも入れ替えられます。
 * 主人公の交代や変身を表現する等への使用を想定しています。
 * 
 * 
 * プラグインコマンド
 * MNKR_Henshin 変身前アクターID 変身後アクターID
 * 
 * 使用例
 * MNKR_Henshin 1 8
 * ID1のアクターがID8のアクターと入れ替わります。
 * 
 * 注意点
 * 下記の状況では、何も起こりません。
 * - パーティに変身前のアクターがいない場合
 * - パーティに変身後のアクターがいる場合
 * 
 * 
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {

  "use strict";
  const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.apply(this, arguments);

    if (command == pluginName) {
      const before = Number(args[0]);
      const after = Number(args[1]);

      if ($gameParty._actors.contains(before) && !$gameParty._actors.contains(after)) {
        $gameParty._actors.splice($gameParty._actors.indexOf(before), 1, after);
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
      }
    }
  };

})();