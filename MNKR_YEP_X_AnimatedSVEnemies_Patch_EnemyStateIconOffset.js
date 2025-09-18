/*
 * --------------------------------------------------
 * MNKR_YEP_X_AnimatedSVEnemies_Patch_EnemyStateIconOffset.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_YEP_X_AnimatedSVEnemies_Patch_EnemyStateIconOffset.js
@plugindesc Patch to make MNKR_EnemyStateIconOffset work when using YEP_X_AnimatedSVEnemies
@author munokura
@license MIT License

@help
When using MNKR_EnemyStateIconOffset and YEP_X_AnimatedSVEnemies
simultaneously,
MNKR_EnemyStateIconOffset does not work due to the influence of
YEP_X_AnimatedSVEnemies.
This is a patch plugin to solve this problem.

Place it below YEP_X_AnimatedSVEnemies in the plugin management list.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this plugin without permission from the
author,
and there are no restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_YEP_X_AnimatedSVEnemies_Patch_EnemyStateIconOffset.js
@plugindesc YEP_X_AnimatedSVEnemies使用時にMNKR_EnemyStateIconOffsetを動作させるパッチ
@author munokura

@help
MNKR_EnemyStateIconOffset と YEP_X_AnimatedSVEnemies とを同時に使用する時、
YEP_X_AnimatedSVEnemies の影響で MNKR_EnemyStateIconOffset が動作しません。
これを解決するパッチプラグインです。

プラグイン管理リストでYEP_X_AnimatedSVEnemiesの下側に配置してください。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/

(() => {
  "use strict";

  Sprite_Enemy.prototype.updateStateIconHeight = function () {
  };

})();