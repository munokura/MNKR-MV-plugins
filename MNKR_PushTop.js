/*
 * --------------------------------------------------
 * MNKR_PushTop.js
 *   Ver.0.0.4
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_PushTop.js
@plugindesc You can use a plugin command to temporarily sort a specified actor to the top and then restore it to its original state.
@author munokura
@license MIT License

@help
You can use the plugin command to sort a specified actor to the top,
and the plugin command to restore the original order.

Plugin Command (MNKR_PushTop push)
MNKR_PushTop push Actor ID Prevent Reordering (0/1)

Leaves the party order as is, puts the actor ID at the top,
and prevents (selects) further reordering.
The order before reordering is remembered.
If the specified actor ID is not in the party,
that actor will join the party.

Example
MNKR_PushTop push 2 1
Leaves the party order as is, puts actor ID 2 at the top,
and prevents further reordering.
If the specified actor ID is not in the party,
that actor will join the party.

Plugin Command (MNKR_PushTop return)
MNKR_PushTop return Actor ID Unlock reordering (0/1)

Restores the party order saved when MNKR_PushTop push was used.
Actors added using MNKR_PushTop push will be removed from the party.
Specifies whether to disable reordering.

Example
MNKR_PushTop return 1
Restores the party order saved when MNKR_PushTop push was used.
Actors added using MNKR_PushTop push will be removed from the party.
Unlocks reordering.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
Modification and redistribution are permitted without permission from the
author, and there are no restrictions on use (commercial, 18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_PushTop.js
@plugindesc 指定のアクターを一時的に先頭に並べ替え、元に戻すプラグインコマンドが使えます。
@author munokura

@help
指定アクターを先頭に並べ替えをするプラグインコマンド、
元に戻すプラグインコマンドが使えます。

プラグインコマンド（MNKR_PushTop push）
MNKR_PushTop push アクターID 並び替えの禁止(0/1)

パーティの並び順をそのままに、先頭をアクターIDにし、
その後の並び替えを禁止（選択）にします。
並び替え前の並びを記憶します。
指定されたアクターIDがパーティにいない場合、
そのアクターがパーティに加わります。

例
MNKR_PushTop push 2 1
パーティの並び順をそのままに、先頭をアクターID2にし、
その後の並び替えを禁止にします。
指定されたアクターIDがパーティにいない場合、
そのアクターがパーティに加わります。

プラグインコマンド（MNKR_PushTop return）
MNKR_PushTop return アクターID 並び替えの禁止解除(0/1)

MNKR_PushTop push 使用時に記憶したパーティの並び順に戻します。
MNKR_PushTop push 使用で加えられたアクターはパーティから外れます。
並び替えの禁止を解除するか指定します。

例
MNKR_PushTop return 1
MNKR_PushTop push 使用時に記憶したパーティの並び順に戻します。
MNKR_PushTop push 使用で加えられたアクターはパーティから外れます。
並び替えの禁止を解除します。

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

    if (command === pluginName) {

      // args = args.map(function (element) {
      //   return Window_Base.prototype.convertEscapeCharacters.call(this, element);
      // }, this);

      let pushActor = 0;
      let formation = false;
      switch (args[0]) {
        case 'push':
          pushActor = Number(args[1]);
          formation = args[2] === '1';
          $gameParty._lastActors = $gameParty._actors.clone();
          if ($gameParty.members().contains($gameActors.actor(pushActor))) {
            $gameParty.removeActor(pushActor);
          }
          $gameParty._actors.unshift(pushActor);
          $gamePlayer.refresh();
          $gameMap.requestRefresh();
          if (formation) {
            $gameSystem.disableFormation();
          }
          break;
        case 'return':
          formation = args[1] === '1';
          $gameParty._actors = $gameParty._lastActors;
          $gamePlayer.refresh();
          $gameMap.requestRefresh();
          if (formation) {
            $gameSystem.enableFormation()
          }
          break;
      }
    }
  };

})();