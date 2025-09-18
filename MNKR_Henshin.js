/*
 * --------------------------------------------------
 * MNKR_Henshin.js
 *   Ver.1.0.2
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_Henshin.js
@plugindesc You can swap actors using plugin commands.
@author munokura
@license MIT License

@help
You can swap actors using plugin commands.
The party order remains the same.

You can swap actors on the map or during battle.
This is intended for use in situations such as protagonist changes and
transformations.

Plugin Command
MNKR_Henshin Pre-transformation actor ID Post-transformation actor ID

Usage Example
MNKR_Henshin 1 8
The actor with ID 1 will be swapped with the actor with ID 8.

Notes
Nothing will happen in the following situations:
- If the party does not have a pre-transformation actor
- If the party has a post-transformation actor

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
Modifications and redistribution are permitted without permission from the
author, and there are no restrictions on usage (commercial, 18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_Henshin.js
@plugindesc プラグインコマンドでアクターを入れ替えられます。
@author munokura

@help
プラグインコマンドでアクターを入れ替えられます。
パーティの並び順がそのままで入れ替わります。

マップでも戦闘中でも入れ替えられます。
主人公の交代や変身を表現する等への使用を想定しています。

プラグインコマンド
MNKR_Henshin 変身前アクターID 変身後アクターID

使用例
MNKR_Henshin 1 8
ID1のアクターがID8のアクターと入れ替わります。

注意点
下記の状況では、何も起こりません。
- パーティに変身前のアクターがいない場合
- パーティに変身後のアクターがいる場合

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
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