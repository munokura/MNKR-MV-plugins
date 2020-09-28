//===========================================================================
// TMPlugin - お金でレベルアップ
// バージョン: 1.2.1
// 最終更新日: 2017/01/17
// 配布元    : http://hikimoki.sakura.ne.jp/
//---------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//===========================================================================

/*:
 * @plugindesc 経験値ではなく変数を消費して任意のタイミングで
 * アクターをレベルアップさせることができます。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/) 改変 munokura
 *
 * @param variable ID
 * @text レベルアップ変数ID
 * @type variable
 * @desc レベルアップに消費する変数IDです。
 * @default 11
 *
 * @param levelUpCommand
 * @text コマンド表示テキスト
 * @desc メニューに表示するレベルアップコマンド（空にすれば無効）
 * 初期値: レベルアップ
 * @default レベルアップ
 *
 * @param currentVariables
 * @text 項目表示テキスト
 * @desc ステータスに表示する変数の項目名
 * 初期値: パーティEXP
 * @default パーティEXP
 *
 * @param learnSkill
 * @text スキルの表示テキスト
 * @desc ステータスに表示する覚えるスキルの項目名
 * 初期値: 覚えるスキル
 * @default 覚えるスキル
 *
 * @param levelUpSe
 * @text レベルアップSE
 * @desc レベルアップ時に鳴らす効果音のファイル名
 * 初期値: Up4
 * @default Up4
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param levelUpSeParam
 * @text レベルアップSEパラメータ
 * @desc レベルアップ時に鳴らす効果音のパラメータ
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 *
 * @param useButton
 * @text アクター変更ボタン表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc アクター変更のボタンを表示
 * 表示:true / 非表示:false / デフォルト:true
 * @default true
 *
 * @help
 * TMGoldLevelUp - お金でレベルアップ ver1.2.1
 * 上記プラグインを改変したものです。
 *
 *   メニューコマンドにレベルアップコマンドが追加され、
 *   変数を消費することでアクターのレベルを上げることができるようになります。
 *
 * 注意点:
 *
 * 戦闘で変数を変化させるには、
 * バトルイベントや下記のプラグイン等を使用してください。
 *
 *   Pon Battle Gain Variable 2（ぽんぽこねるそん様作）
 *   https://plugin.fungamemake.com/archives/23488
 *   戦闘勝利時に指定の変数に倒した敵に設定した値を加算します。
 *
 * メニュー画面に変数を表示するウィンドウを追加したい場合、
 * 下記のプラグイン等を使用してください。
 * 
 *   メニューラベル（tomoaky様作）
 *   https://plugin.fungamemake.com/archives/2337
 *   メニューシーンに変数の値を表示します。
 *
 * 使い方:
 *
 *   levelUpCommand のコマンド名を削除して空にすれば
 *   メニューからレベルアップコマンドを削除することができます。
 *   この場合はプラグインコマンドを使ってイベントからレベルアップシーンを
 *   呼び出してください。
 *
 *
 * プラグインコマンド:
 *
 *   MNKR_CallLevelUp
 *   レベルアップシーンを呼び出す。
 *
 *
 * メモ欄タグ（アクター）:
 *
 *   <VariablesLevelUpRate:1.5>
 *     メモ欄にこのタグがついているアクターはレベルアップに必要な変数量が
 *     1.5 倍になります。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

var Imported = Imported || {};
Imported.TMVariablesLevelUp = true;

var TMParam = TMParam || {};

var TMPlugin = TMPlugin || {};

TMPlugin.VariablesLevelUp = {};
TMPlugin.VariablesLevelUp.Parameters = PluginManager.parameters('MNKR_TM_VariablesLevelUp');
TMPlugin.VariablesLevelUp.LevelUpCommand  = TMPlugin.VariablesLevelUp.Parameters['levelUpCommand'];
TMPlugin.VariablesLevelUp.CurrentVariables  = TMPlugin.VariablesLevelUp.Parameters['currentVariables'];
TMPlugin.VariablesLevelUp.LearnSkill  = TMPlugin.VariablesLevelUp.Parameters['learnSkill'];
TMPlugin.VariablesLevelUp.LevelUpSe = JSON.parse(TMPlugin.VariablesLevelUp.Parameters['levelUpSeParam'] || '{}');
TMPlugin.VariablesLevelUp.LevelUpSe.name = TMPlugin.VariablesLevelUp.Parameters['levelUpSe'] || '';
TMPlugin.VariablesLevelUp.UseButton = TMPlugin.VariablesLevelUp.Parameters['useButton'] === 'true';

(function() {

'use strict';


var parameters = PluginManager.parameters('MNKR_TM_VariablesLevelUp');

var VariableID = Number(parameters['variable ID'] || 11);

  //---------------------------------------------------------------------------
  // TextManager
  //

  Object.defineProperty(TextManager, 'VariablesLevelUp', {
    get: function() { return TMPlugin.VariablesLevelUp.LevelUpCommand; },
    configurable: true
  });

  //---------------------------------------------------------------------------
  // Game_Actor
  //

  Game_Actor.prototype.nextRequiredVariables = function() {
    var result = this.nextRequiredExp() * +(this.actor().meta.VariablesLevelUpRate || 1);
    return Math.floor(result);
  };

  //---------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'MNKR_CallLevelUp') {
      SceneManager.push(Scene_VariablesLevelUp);
    };
  };

  //---------------------------------------------------------------------------
  // Window_MenuCommand
  //

  var _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
  Window_MenuCommand.prototype.addOriginalCommands = function() {
    _Window_MenuCommand_addOriginalCommands.call(this);
    if (TMPlugin.VariablesLevelUp.LevelUpCommand) {
      this.addCommand(TMPlugin.VariablesLevelUp.LevelUpCommand, 'levelUp', true);
    };
  };

  function Window_VariablesLevelUpCommand() {
    this.initialize.apply(this, arguments);
  };

  Window_VariablesLevelUpCommand.prototype = Object.create(Window_HorzCommand.prototype);
  Window_VariablesLevelUpCommand.prototype.constructor = Window_VariablesLevelUpCommand;

  Window_VariablesLevelUpCommand.prototype.initialize = function() {
    Window_HorzCommand.prototype.initialize.call(this, 0, 0);
  };

  Window_VariablesLevelUpCommand.prototype.windowWidth = function() {
    return Graphics.boxWidth;
  };

  Window_VariablesLevelUpCommand.prototype.maxCols = function() {
    return 2;
  };

  Window_VariablesLevelUpCommand.prototype.makeCommandList = function() {
    this.addCommand('レベルアップ', 'levelUp', this.canLevelUp());
    this.addCommand('キャンセル',   'cancelCommand');
  };

  Window_VariablesLevelUpCommand.prototype.canLevelUp = function() {
    return this._actor && !this._actor.isMaxLevel() &&
           $gameVariables.value(VariableID) >= this._actor.nextRequiredVariables();
  };

  Window_VariablesLevelUpCommand.prototype.setActor = function(actor) {
    this._actor = actor;
    this.refresh();
  };

  Window_VariablesLevelUpCommand.prototype.playOkSound = function() {
    if (this.currentSymbol() === 'levelUp') {
      AudioManager.playSe(TMPlugin.VariablesLevelUp.LevelUpSe);     // レベルアップ効果音を鳴らす
    } else {
      SoundManager.playOk();
    };
  };

  //---------------------------------------------------------------------------
  // Window_VariablesLevelUpStatus
  //

  function Window_VariablesLevelUpStatus() {
    this.initialize.apply(this, arguments);
  };

  Window_VariablesLevelUpStatus.prototype = Object.create(Window_Selectable.prototype);
  Window_VariablesLevelUpStatus.prototype.constructor = Window_VariablesLevelUpStatus;

  Window_VariablesLevelUpStatus.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
  };

  Window_VariablesLevelUpStatus.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
      this._actor = actor;
      this.refresh();
    };
  };

  Window_VariablesLevelUpStatus.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
      if (!this._actor.isMaxLevel()) {
        this._tempActor = JsonEx.makeDeepCopy(this._actor);
        this._tempActor.levelUp();
      } else {
        this._tempActor = null;
      };
      var lineHeight = this.lineHeight();
      this.drawBlock1(lineHeight * 0);
      this.drawHorzLine(lineHeight * 1);
      this.drawBlock2(lineHeight * 2 - 20);
      this.drawHorzLine(lineHeight * 6 - 20);
      this.drawBlock3(lineHeight * 7 - 40);
    }
  };

  Window_VariablesLevelUpStatus.prototype.drawBlock1 = function(y) {
    this.drawActorName(this._actor, 6, y);
    this.drawActorClass(this._actor, 192, y);
    this.drawActorNickname(this._actor, 432, y);
  };

  Window_VariablesLevelUpStatus.prototype.drawBlock2 = function(y) {
    this._needRefresh = false;
    this.drawActorFace(this._actor, 12, y);
    if (ImageManager.isReady()) {
      this.drawButton(140, y);
    } else {
      this._needRefresh = true;
    };
    this.drawBasicInfo(204, y);
    this.drawExpInfo(456, y);
  };

  Window_VariablesLevelUpStatus.prototype.drawButton = function(x, y) {
    if (TMPlugin.VariablesLevelUp.UseButton) {
      if ($gameParty.size() <= 1) return;
      var bitmap = ImageManager.loadSystem('ButtonSet');
      this.contents.blt(bitmap, 96, 0, 48, 48, x, y);
      this.contents.blt(bitmap, 48, 0, 48, 48, x, y + 96);
    };
  };

  Window_VariablesLevelUpStatus.prototype.drawBlock3 = function(y) {
    this.drawParameters(48, y);
    this.drawSkills(432, y);
  };

  Window_VariablesLevelUpStatus.prototype.drawHorzLine = function(y) {
    var lineY = y + 7;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
  };

  Window_VariablesLevelUpStatus.prototype.lineColor = function() {
    return this.normalColor();
  };

  Window_VariablesLevelUpStatus.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    this.drawActorHp(this._actor, x, y + lineHeight * 2);
    this.drawActorMp(this._actor, x, y + lineHeight * 3);
  };

  Window_VariablesLevelUpStatus.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 8; i++) {
      var y2 = y + lineHeight * i;
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(i), x, y2, 120);
      this.resetTextColor();
      this.drawText(this._actor.param(i), x + 140, y2, 48, 'right');
      if (this._tempActor) {
        this.drawRightArrow(x + 188, y2);
        this.drawNewParam(x + 222, y2, i);
      };
    };
  };

  Window_VariablesLevelUpStatus.prototype.drawRightArrow = function(x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', x, y, 32, 'center');
  };

  Window_VariablesLevelUpStatus.prototype.drawNewParam = function(x, y, paramId) {
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(newValue, x, y, 48, 'right');
  };

  Window_VariablesLevelUpStatus.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expNext = TextManager.expNext.format(TextManager.level);
    var value = this._actor.isMaxLevel() ? '-------' : this._actor.nextRequiredVariables();
    this.changeTextColor(this.systemColor());
    this.drawText(expNext, x, y + lineHeight * 0, 270);
    this.drawText(TMPlugin.VariablesLevelUp.CurrentVariables, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value, x, y + lineHeight * 1, 270, 'right');
    this.drawText($gameVariables.value(VariableID), x, y + lineHeight * 3, 270 ,'right');
  };

  Window_VariablesLevelUpStatus.prototype.drawSkills = function(x, y) {
    var lineHeight = this.lineHeight();
    this.changeTextColor(this.systemColor());
    this.drawText(TMPlugin.VariablesLevelUp.LearnSkill, x, y + lineHeight * 0, 270);
    this.resetTextColor();
    if (this._tempActor) {
      var i = 0;
      this._tempActor.currentClass().learnings.forEach(function(learning) {
        if (learning.level === this._tempActor._level) {
          i++;
          var skill = $dataSkills[learning.skillId];
          this.drawItemName(skill, x, y + lineHeight * i);
        };
      }, this);
    };
  };

  Window_VariablesLevelUpStatus.prototype.isHitUpButton = function() {
    var x = this.parent.x + this.x + this.standardPadding() + 140;
    var y = this.parent.y + this.y + this.standardPadding() + this.lineHeight() * 2 - 20;
    return TouchInput.x >= x && TouchInput.x < x + 48 &&
           TouchInput.y >= y && TouchInput.y < y + 48;
  };

  Window_VariablesLevelUpStatus.prototype.isHitDownButton = function() {
    var x = this.parent.x + this.x + this.standardPadding() + 140;
    var y = this.parent.y + this.y + this.standardPadding() + this.lineHeight() * 2 + 76;
    return TouchInput.x >= x && TouchInput.x < x + 48 &&
           TouchInput.y >= y && TouchInput.y < y + 48;
  };

  Window_VariablesLevelUpStatus.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (this._needRefresh) {
      if (ImageManager.isReady()) {
        var y = this.lineHeight() * 2 - 20;
        this.drawActorFace(this._actor, 12, y);
        this.drawButton(140, y);
      }
    }
  };

  //---------------------------------------------------------------------------
  // Scene_Menu
  //

  var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
  Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler('levelUp', this.commandPersonal.bind(this));
  };

  var _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
  Scene_Menu.prototype.onPersonalOk = function() {
    switch (this._commandWindow.currentSymbol()) {
    case 'levelUp':
        SceneManager.push(Scene_VariablesLevelUp);
        break;
    default:
      _Scene_Menu_onPersonalOk.call(this);
      break;
    };
  };

  //---------------------------------------------------------------------------
  // Scene_VariablesLevelUp
  //

  function Scene_VariablesLevelUp() {
      this.initialize.apply(this, arguments);
  };

  Scene_VariablesLevelUp.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_VariablesLevelUp.prototype.constructor = Scene_VariablesLevelUp;

  Scene_VariablesLevelUp.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_VariablesLevelUp.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createStatusWindow();
  };

  Scene_VariablesLevelUp.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._statusWindow.refresh();
  };

  Scene_VariablesLevelUp.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_VariablesLevelUpCommand();
    this._commandWindow.setHandler('levelUp',       this.commandLevelUp.bind(this));
    this._commandWindow.setHandler('cancelCommand', this.popScene.bind(this));
    this._commandWindow.setHandler('pagedown',      this.nextActor.bind(this));
    this._commandWindow.setHandler('pageup',        this.previousActor.bind(this));
    this._commandWindow.setHandler('cancel',        this.popScene.bind(this));
    this.addWindow(this._commandWindow);
  };

  Scene_VariablesLevelUp.prototype.createStatusWindow = function() {
    var wy = this._commandWindow.height;
    var ww = Graphics.boxWidth;
    var wh = Graphics.boxHeight - this._commandWindow.height;
    this._statusWindow = new Window_VariablesLevelUpStatus(0, wy, ww, wh);
    this.addWindow(this._statusWindow);
    this.refreshActor();
  };

  Scene_VariablesLevelUp.prototype.commandLevelUp = function() {
    var actor = this.actor();
    $gameVariables.setValue(VariableID,$gameVariables.value(VariableID)-this._actor.nextRequiredVariables());
    actor.changeExp(actor.currentExp() + actor.nextRequiredExp(), false);
    this._commandWindow.refresh();
    this._statusWindow.refresh();
    this._commandWindow.activate();
  };

  Scene_VariablesLevelUp.prototype.refreshActor = function() {
    var actor = this.actor();
    this._commandWindow.setActor(actor);
    this._statusWindow.setActor(actor);
  };

  Scene_VariablesLevelUp.prototype.onActorChange = function() {
    this.refreshActor();
    this._commandWindow.activate();
  };

  Scene_VariablesLevelUp.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if (TMPlugin.VariablesLevelUp.UseButton && $gameParty.size() > 1 && TouchInput.isTriggered()) {
      if (this._statusWindow.isHitUpButton()) {
        this.previousActor();
        SoundManager.playCursor();
      } else if (this._statusWindow.isHitDownButton()) {
        this.nextActor();
        SoundManager.playCursor();
      };
    };
  };

  TMParam.Scene_VariablesLevelUp = Scene_VariablesLevelUp;

})();
