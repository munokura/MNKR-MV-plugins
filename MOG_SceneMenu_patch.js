/*
 * --------------------------------------------------
 * MOG_SceneMenu.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://fungamemake.com/
@plugindesc Adds the ability to customize the menu in MOG_SceneMenu.js.
@author munokura
@license MIT License

@help
Adds the ability to customize the MOG_SceneMenu.js menu.
Place it below MOG_SceneMenu in the Plugin Manager.

@param cursorRepeate
@text Enable left and right menu loop
@type boolean
@on valid
@off invalid
@default true

@param commandZoom
@text Enable command zoom
@desc Enable zooming when selecting commands in the main menu
@type boolean
@on valid
@off invalid
@default false

@param selectionZoom
@text Actor Selection Zoom Enabled
@desc Enable zooming when selecting an actor
@type boolean
@on valid
@off invalid
@default false

@param commandSpaceX
@text Command X Interval
@desc Main menu command Horizontal Spacing
@type number
@default 48

@param commandSpaceY
@text Command Y Spacing
@desc Main Menu Command Vertical Spacing
@type number
@default 48
*/

/*:ja
@target MV

@param cursorRepeate
@text メニュー左右ループ有効化
@type boolean
@on 有効
@off 無効
@default true

@param commandZoom
@text コマンドズーム有効化
@type boolean
@on 有効
@off 無効
@desc メインメニューのコマンド選択時ズーム動作を有効化
@default false

@param selectionZoom
@text アクター選択ズーム有効化
@type boolean
@on 有効
@off 無効
@desc アクター選択時ズーム動作を有効化
@default false

@param commandSpaceX
@text コマンドX間隔
@type number
@desc メインメニューのコマンド横方向間隔
@default 48

@param commandSpaceY
@text コマンドY間隔
@type number
@desc メインメニューのコマンド縦方向間隔
@default 48

@plugindesc
MOG_SceneMenu.js のメニューをカスタマイズする機能を追加します。
@author munokura

@help
MOG_SceneMenu.js のメニューをカスタマイズする機能を追加します。
プラグイン管理でMOG_SceneMenuの下側に配置してください。
*/

(function () {
	'use strict';
	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const parameters = PluginManager.parameters(pluginName);
	const param = {};
	param.cursorRepeate = parameters['cursorRepeate'] === 'true';
	param.commandZoom = parameters['commandZoom'] === 'true';
	param.selectionZoom = parameters['selectionZoom'] === 'true';
	param.commandSpaceX = Number(parameters['commandSpaceX'] || 48);
	param.commandSpaceY = Number(parameters['commandSpaceY'] || 48);

	const _Window_MenuCommand_processCursorMove = Window_MenuCommand.prototype.processCursorMove;
	Window_MenuCommand.prototype.processCursorMove = function () {
		if (param.cursorRepeate) {
			if (this.isCursorMovable()) {
				var lastIndex = this.index();
				if (Input.isRepeated('down') || Input.isRepeated('right')) {
					this.cursorDown(true);	//ecf5DTTzl6h6lJj02氏改変
				}
				if (Input.isRepeated('up') || Input.isRepeated('left')) {
					this.cursorUp(true);	//ecf5DTTzl6h6lJj02氏改変
				}
				if (this.index() !== lastIndex) {
					SoundManager.playCursor();
				}
			}
		} else {
			_Window_MenuCommand_processCursorMove.call(this);
		}
	};

	const _Scene_Menu_updateCommands = Scene_Menu.prototype.updateCommands;
	Scene_Menu.prototype.updateCommands = function () {
		if (param.commandZoom) {
			_Scene_Menu_updateCommands.call(this);
		} else {
			for (var i = 0; i < this._commands.length; i++) {
				if (this.isComEnabled(i)) {
					var nx = this._statusWindow.active ? Moghunter.scMenu_ComWX : this._compos[i][0];
					var ny = this._statusWindow.active ? Moghunter.scMenu_ComWY : this._compos[i][1];
					if (this._commandWindow.isCurrentItemEnabled()) {
						this._commands[i].opacity += 20
					};
				} else {
					var nx = this._compos[i][0];
					var ny = this._compos[i][1];
					if (this._commands[i].opacity > 180 || this._statusWindow.active) {
						this._commands[i].opacity -= 10
						if (this._commands[i].opacity < 180 && !this._statusWindow.active) {
							this._commands[i].opacity = 180
						}
					}
					if (!this._statusWindow.active && this._commands[i].opacity < 180) {
						this._commands[i].opacity += 10;
						if (this._commands[i].opacity > 180) {
							this._commands[i].opacity = 180
						}
					}
					this._comzoom[i] = 0;
				}
				this._commands[i].x = this.commandMoveTo(this._commands[i].x, nx);
				this._commands[i].y = this.commandMoveTo(this._commands[i].y, ny);
			}
		}
	}

	const _Scene_Menu_updateSelection = Scene_Menu.prototype.updateSelection;
	Scene_Menu.prototype.updateSelection = function () {
		if (param.selectionZoom) {
			_Scene_Menu_updateSelection.call(this);
		} else {
			if (this._statusWindow.active) {
				this._selField.opacity += 15;
				if (this._selField.x > 0) {
					this._selField.x -= 4
					if (this._selField.x < 0) {
						this._selField.x = 0
					};
				}
			} else {
				if (this._selField.x < 50) {
					this._selField.x += 4
					if (this._selField.x > 50) {
						this._selField.x = 50
					};
				};
				this._selField.opacity -= 15;
			}
			for (var i = 0; i < this._selection.length; i++) {
				if (this._statusWindow._index < this._selMax) {
					var nindex = 0
					if (i > this._selMax) {
						this._selection[i].vsb = false;
					} else {
						this._selection[i].vsb = true;
					}
				} else {
					var ni = this._statusWindow._index - this._selMax
					var nindex = ((4 + this._facesBitmaps[i].width) * (ni));
					if (i < ni || i > ni + this._selMax) {
						this._selection[i].vsb = false;
					} else {
						this._selection[i].vsb = true;
					}
				}
				if (i === this._statusWindow._index) {
					this._selection[i].opacity += 15;
					if (this._selzoom[i] === 0) {
						this._selzoom[i] = 1;
					} else {
						this._selzoom[i] = 0;
					}
				} else {
					if (!this._selection[i].vsb) {
						this._selection[i].opacity -= 15;
					} else if (this._selection[i].vsb) {
						if (this._selection[i].opacity < 160) {
							this._selection[i].opacity += 15;
							if (this._selection[i].opacity > 160) {
								this._selection[i].opacity = 160
							};
						}
						if (this._selection[i].opacity > 160) {
							this._selection[i].opacity -= 15;
							if (this._selection[i].opacity < 160) {
								this._selection[i].opacity = 160
							};
						};
					} else {
						if (this._selection[i].opacity > 160) {
							this._selection[i].opacity -= 10
							if (this._selection[i].opacity < 160) {
								this._selection[i].opacity = 160
							};
						}
					}
					this._selzoom[i] = 0;
				}
				var nx = this._selectionPos[i][0] - nindex;
				var ny = this._selectionPos[i][1];
				this._selection[i].x = this.commandMoveTo(this._selection[i].x, nx);
				this._selection[i].y = this.commandMoveTo(this._selection[i].y, ny);
			}
			this.updateArrow();
		}
	};

	Scene_Menu.prototype.createCommands = function () {
		this._commands = [];
		this._compos = [];
		this._comzoom = [];
		var h = 0
		this._comField = new Sprite();
		this._field.addChild(this._comField);
		for (var i = 0; i < this._comList.length; i++) {
			this._commands[i] = new Sprite(this._comBitmaps[i]);
			this._commands[i].anchor.x = 0.5;
			this._commands[i].anchor.y = 0.5;
			this._commands[i].y = -64;
			this._commands[i].opacity = 255;
			this._compos[i] = [Moghunter.scMenu_ComX + (param.commandSpaceX * i), Moghunter.scMenu_ComY + (param.commandSpaceY * h)];
			this._comzoom[i] = 0;
			this._comField.addChild(this._commands[i]);
			h = h === 0 ? 1 : 0;
		};
	};

})();
