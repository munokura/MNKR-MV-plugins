/*
 * --------------------------------------------------
 * MNKR_LastActionData.js
 *   Ver.0.0.2
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_LastActionData.js
@plugindesc You can assign the most recent action data to a variable.
@author munokura
@license MIT License

@help
You can assign the most recent action data to a variable.

--Plugin Command---

MNKR_LastActionData Variable ID Data Type

--Variable ID
The numeric value is the variable ID.

--Data Type
Skill / S - ID of the most recently used skill
Item / I - ID of the most recently used item
ActionActor / AA - ID of the actor who performed the most recent action
ActionEnemy / AE - Index of the enemy character who performed the most recent
action
TargetActor / TA - Index of the enemy character who performed the most recent
action
TargetEnemy / TE - Index of the enemy character who was targeted most recently

Usage Example
MNKR_LastActionData 1 AA
Effect: Assigns the ID of the actor who performed the most recent action to
variable ID1.

---Script---

Assign the following script using "Variable Operation."

- ID of the most recently used skill
$gameTemp.lastActionData(0)

- ID of the most recently used item
$gameTemp.lastActionData(1)

- ID of the actor who performed the most recently used action
$gameTemp.lastActionData(2)

- Index of the most recently used enemy character
$gameTemp.lastActionData(3)

- ID of the most recently targeted actor
$gameTemp.lastActionData(4)

- Index of the most recently targeted enemy character
$gameTemp.lastActionData(5)

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
Modification and redistribution are permitted without permission from the
author, and there are no restrictions on use (commercial, 18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_LastActionData.js
@plugindesc 直前の行動データを変数に代入できます。
@author munokura

@help
直前の行動データを変数に代入できます。

---プラグインコマンド---

MNKR_LastActionData 変数ID データ種別

--変数ID
数値が変数IDになります。

--データ種別
Skill / S - 直前に使用したスキルのID
Item  / I - 直前に使用したアイテムのID
ActionActor / AA - 直前に行動したアクターのID
ActionEnemy / AE - 直前に行動した敵キャラのインデックス
TargetActor / TA - 直前に行動した敵キャラのインデックス
TargetEnemy / TE - 直前に対象となった敵キャラのインデックス

使用例
MNKR_LastActionData 1 AA
効果：変数ID1 に 直前に行動したアクターのID を代入

---スクリプト---

「変数の操作」で下記スクリプトを代入します。

- 直前に使用したスキルのID
$gameTemp.lastActionData(0)

- 直前に使用したアイテムのID
$gameTemp.lastActionData(1)

- 直前に行動したアクターのID
$gameTemp.lastActionData(2)

- 直前に行動した敵キャラのインデックス
$gameTemp.lastActionData(3)

- 直前に対象となったアクターのID
$gameTemp.lastActionData(4)

- 直前に対象となった敵キャラのインデックス
$gameTemp.lastActionData(5)

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
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command == pluginName) {
			// args = args.map(function (element) {
			// 	return Window_Base.prototype.convertEscapeCharacters.call(this, element);
			// }, this);
			const variableId = Number(args[0]);
			const lastAction = lastActionType(args[1].toLowerCase());
			$gameVariables.setValue(variableId, $gameTemp.lastActionData(lastAction));
		}
	};

	function lastActionType(type) {
		switch (type) {
			case 's':
			case 'skill':
				return 0;
			case 'i':
			case 'item':
				return 1;
			case 'aa':
			case 'actionactor':
				return 2;
			case 'ae':
			case 'actionenemy':
				return 3;
			case 'ta':
			case 'targetactor':
				return 4;
			case 'targetenemy':
			case 'te':
				return 5;
		}
	};

	const _Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function () {
		_Game_Temp_initialize.call(this);
		this._lastActionData = [0, 0, 0, 0, 0, 0];
	};

	Game_Temp.prototype.lastActionData = function (type) {
		return this._lastActionData[type] || 0;
	};

	Game_Temp.prototype.setLastActionData = function (type, value) {
		this._lastActionData[type] = value;
	};

	Game_Temp.prototype.setLastUsedSkillId = function (skillID) {
		this.setLastActionData(0, skillID);
	};

	Game_Temp.prototype.setLastUsedItemId = function (itemID) {
		this.setLastActionData(1, itemID);
	};

	Game_Temp.prototype.setLastSubjectActorId = function (actorID) {
		this.setLastActionData(2, actorID);
	};

	Game_Temp.prototype.setLastSubjectEnemyIndex = function (enemyIndex) {
		this.setLastActionData(3, enemyIndex);
	};

	Game_Temp.prototype.setLastTargetActorId = function (actorID) {
		this.setLastActionData(4, actorID);
	};

	Game_Temp.prototype.setLastTargetEnemyIndex = function (enemyIndex) {
		this.setLastActionData(5, enemyIndex);
	};

	const _Game_Action_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function (target) {
		_Game_Action_apply.call(this, target);
		this.updateLastTarget(target);
	};

	const _Game_Action_applyGlobal = Game_Action.prototype.applyGlobal;
	Game_Action.prototype.applyGlobal = function () {
		_Game_Action_applyGlobal.call(this);
		this.updateLastUsed();
		this.updateLastSubject();
	};

	Game_Action.prototype.updateLastUsed = function () {
		const item = this.item();
		if (DataManager.isSkill(item)) {
			$gameTemp.setLastUsedSkillId(item.id);
		} else if (DataManager.isItem(item)) {
			$gameTemp.setLastUsedItemId(item.id);
		}
	};

	Game_Action.prototype.updateLastSubject = function () {
		const subject = this.subject();
		if (subject.isActor()) {
			$gameTemp.setLastSubjectActorId(subject.actorId());
		} else {
			$gameTemp.setLastSubjectEnemyIndex(subject.index() + 1);
		}
	};

	Game_Action.prototype.updateLastTarget = function (target) {
		if (target.isActor()) {
			$gameTemp.setLastTargetActorId(target.actorId());
		} else {
			$gameTemp.setLastTargetEnemyIndex(target.index() + 1);
		}
	};

})();