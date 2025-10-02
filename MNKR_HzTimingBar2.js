/*
 * --------------------------------------------------
 * MNKR_HzTimingBar2.js (Refactored)
 * Ver.0.0.2
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*
Copyright (c) <2016> <hiz>
This software is released under the MIT License.
*/

/*:
@target MV
@plugindesc タイミングを合わせてボタン入力するタイミングバーを実行します。
@author hiz (改変 munokura)

@help
このプラグインはHzTimingBarを改変したものです。
タイミングを合わせてボタン入力するタイミングバーを実行します。
プラグインコマンドでタイミングバーを設定・実行します。

---

# 遊び方

カーソルが左から右に動きます。
指定された範囲内でタイミング良く決定ボタンを押してください。

* 何もない範囲で入力すると、その時点で失敗(結果=0)となります。
* ヒット(結果=1)やクリティカル(結果=2)の範囲で入力すると
スコアが記録されます。
複数回ヒット/クリティカル範囲で入力した場合、最も高いスコアが採用されます。
* 入力必須範囲が設定されている場合、その全てで入力しないと、
たとえヒット/クリティカル範囲で入力しても最終結果は失敗(0)になります。

バーが右端に到達するか、クリア条件
(必須、ヒット、クリティカルの全てをヒット済)を満たした時点で終了し、
最終結果が指定された変数に代入されます。

---

# プラグインコマンド

HzTimingBar [var_no] [hit_area] [critical_area] [require_area] [x] [y]

## 引数の説明

* \[var\_no\](必須)
結果を格納する変数番号です。
失敗: 0, ヒット: 1, クリティカル: 2 が代入されます。

* \[hit\_area\](必須)
ヒット範囲の開始位置と終了位置を%で指定します。(例: 70-90)

* \[critical\_area\](任意)
クリティカル範囲を指定します。
(例: 90-95)指定しない場合はクリティカルは発生しません。

* \[require\_area\](任意)
入力必須範囲を指定します。角括弧[]で囲み、複数指定も可能です。
(例: [10-20] または [10-20,40-60])指定しない場合は必須入力はありません。

* \[x\], \[y\](任意)
バーの表示位置(中心座標)を指定します。
指定しない場合は画面の中央に表示されます。

---

# コマンド例

* 結果は変数1番へ。ヒット範囲は70-90、クリティカルは90-95。
HzTimingBar 1 70-90 90-95

* 上記に加え、10-30と40-60の両方の範囲で入力しないと失敗。
HzTimingBar 1 70-90 90-95 [10-30,40-60]

* 表示座標を(413, 20)に指定。
HzTimingBar 1 80-90 90-95 [10-20] 413 20


# プラグインの問い合わせについて
問い合わせは改変者へお願いいたします。


# 利用規約
MITライセンスです。
https://opensource.org/licenses/mit-license.php
作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
についても制限はありません。

# 謝辞
機能追加の助力をいただきましたWTR氏に感謝いたします。

@param barWidth
@text バーの幅
@desc タイミングバーの幅を指定。
@type number
@default 500

@param requireMissEnd
@text 必須エリア未入力時即終了
@desc ONの場合、必須エリアを未入力で通過した時点で失敗と判定し、タイミングバーを終了。
@type boolean
@on ON
@off OFF
@default true

@param showCursorTrail
@text カーソル残像表示
@desc ONの場合、入力した位置にカーソルの残像を表示。
@type boolean
@on ON
@off OFF
@default true

@param requiredSe
@text 必須エリアヒット時SE
@desc 必須エリアにヒットした時に再生するSE。
@type struct<SE>
@default {"name":"Decision2","volume":"90","pitch":"100","pan":"0"}

@param hitSe
@text ヒットエリアヒット時SE
@desc ヒットエリアにヒットした時に再生するSE。
@type struct<SE>
@default {"name":"Attack2","volume":"90","pitch":"100","pan":"0"}

@param criticalSe
@text クリティカルエリアヒット時SE
@desc クリティカルエリアにヒットした時に再生するSE。
@type struct<SE>
@default {"name":"Attack3","volume":"90","pitch":"100","pan":"0"}

@param missSe
@text 入力時（失敗）SE
@desc エリア外で入力した時や、時間切れで失敗した時のSE。
@type struct<SE>
@default {"name":"Buzzer1","volume":"90","pitch":"100","pan":"0"}

@param requiredAnimation
@text 必須エリアヒット時アニメーション
@desc 'カーソル残像表示'ONが必要。必須エリアにヒットした時に再生するアニメーションID。
@type animation
@default 0

@param criticalAnimation
@text クリティカルエリアヒット時アニメーション
@desc 'カーソル残像表示'ONが必要。クリティカルエリアにヒットした時に再生するアニメーションID。
@type animation
@default 0

@param hitAnimation
@text ヒットエリアヒット時アニメーション
@desc 'カーソル残像表示'ONが必要。ヒットエリアにヒットした時に再生するアニメーションID。
@type animation
@default 0
*/

/*~struct~SE:
@param name
@text ファイル名
@desc 再生するSEファイル名。
@type file
@dir audio/se/

@param volume
@text 音量
@desc SEの音量。(0-100)
@type number
@min 0
@max 100
@default 90

@param pitch
@text ピッチ
@desc SEのピッチ。(50-150)
@type number
@min 50
@max 150
@default 100

@param pan
@text パン
@desc SEのパン（定位）。(-100-100)
@type number
@min -100
@max 100
@default 0
*/

(() => {
	'use strict';


	// =================================================================
	// Plugin Parameters
	// =================================================================
	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const params = PluginManager.parameters(pluginName);
	const PRM_varWidth = Number(params['barWidth'] || 500);
	const PRM_requireMissEnd = params['requireMissEnd'] === 'true';
	const PRM_showCursorTrail = params['showCursorTrail'] === 'true';
	const PRM_requiredAnimation = Number(params['requiredAnimation'] || 0);
	const PRM_criticalAnimation = Number(params['criticalAnimation'] || 0);
	const PRM_hitAnimation = Number(params['hitAnimation'] || 0);

	const parseSeParam = (param) => {
		const parsed = JSON.parse(param || '{}');
		return {
			name: parsed.name || '',
			volume: Number(parsed.volume || 90),
			pitch: Number(parsed.pitch || 100),
			pan: Number(parsed.pan || 0)
		};
	};

	const SE_SETTINGS = {
		required: parseSeParam(params['requiredSe']),
		hit: parseSeParam(params['hitSe']),
		critical: parseSeParam(params['criticalSe']),
		miss: parseSeParam(params['missSe'])
	};

	// =================================================================
	// Constants
	// =================================================================
	const RESULT_TYPE = Object.freeze({
		MISS: 0,
		HIT: 1,
		CRITICAL: 2
	});

	const TIMING_BAR_SETTINGS = Object.freeze({
		HEIGHT: 10,
		RADIUS: 4,
		DELAY_FRAMES: 20, // 開始前の待機フレーム
		MAX_FRAMES: 100, // バーの左端から右端までのフレーム数
		CURSOR_SPEED: 1,
		COLORS: {
			FRAME_BG: "#FFFFFF",
			FRAME_BORDER: "#000000",
			REQUIRED: "#43D197",
			HIT: "#EBCE41",
			CRITICAL: "#E47237",
			CURSOR_FILL: "#000000",
			CURSOR_STROKE: "#FFFFFF",
			CURSOR_TRAIL_FILL: "#666666",
			CURSOR_TRAIL_STROKE: "#FFFFFF"
		}
	});

	// =================================================================
	// Utility Functions
	// =================================================================

	/**
	 * SEを再生します。
	 * @param {object} seObject - {name, volume, pitch, pan} を含むSEオブジェクト
	 */
	const playSe = (seObject) => {
		if (seObject && seObject.name) {
			AudioManager.playSe(seObject);
		}
	};

	/**
	 * 角丸長方形のパスを作成します。
	 * @param {CanvasRenderingContext2D} ctx - 描画コンテキスト
	 * @param {number} x - X座標
	 * @param {number} y - Y座標
	 * @param {number} width - 幅
	 * @param {number} height - 高さ
	 * @param {number} radius - 角の半径
	 */
	const roundedRectangle = (ctx, x, y, width, height, radius) => {
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);
		ctx.closePath();
	};

	/**
	 * プラグインコマンドの引数を解析してオブジェクトに変換します。
	 * @param {string[]} args - プラグインコマンドの引数配列
	 * @returns {object} 解析された設定オブジェクト
	 */
	const parseCommandArgs = (args) => {
		const parseRange = (rangeStr) => {
			if (!rangeStr || !rangeStr.includes('-')) return null;
			return rangeStr.split('-').map(Number);
		};

		const parseMultiRange = (multiRangeStr) => {
			if (!multiRangeStr || !multiRangeStr.startsWith('[')) return [];
			const content = multiRangeStr.substring(1, multiRangeStr.length - 1);
			if (!content) return [];
			return content.split(',').map(parseRange).filter(r => r);
		};

		return {
			variableId: Number(args[0]),
			hitArea: parseRange(args[1]) || [0, 0],
			criticalArea: parseRange(args[2]) || null,
			requiredAreas: parseMultiRange(args[3]),
			x: args[4] ? Number(args[4]) : Graphics.boxWidth / 2,
			y: args[5] ? Number(args[5]) : Graphics.boxHeight / 2
		};
	};

	// =================================================================
	// Game_Interpreter
	// =================================================================

	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.toUpperCase() === 'HZTIMINGBAR') {
			const options = parseCommandArgs(args);
			if (options.variableId > 0) {
				this._timingBar = new TimingBar(options);
				this.setWaitMode('hzTimingBar');
			} else {
				console.error('HzTimingBar: 変数番号が正しく指定されていません。');
			}
		}
	};

	const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
	Game_Interpreter.prototype.updateWaitMode = function () {
		if (this._waitMode === 'hzTimingBar') {
			this._timingBar.update();
			if (this._timingBar.isFinished()) {
				this._timingBar.terminate();
				this._timingBar = null;
				this.setWaitMode('');
				return false;
			}
			return true;
		}
		return _Game_Interpreter_updateWaitMode.call(this);
	};

	// =================================================================
	// TimingBar (Prototype-based)
	// =================================================================

	/**
	 * TimingBarオブジェクトのコンストラクタ
	 * @param {object} options - 設定オブジェクト
	 */
	function TimingBar(options) {
		this.initialize(options);
	}

	/**
	 * オブジェクトの初期化
	 * @param {object} options - 設定オブジェクト
	 */
	TimingBar.prototype.initialize = function (options) {
		this._options = options;
		this._frame = -TIMING_BAR_SETTINGS.DELAY_FRAMES;
		this._isPlaying = true;

		// 結果の初期化
		this._result = RESULT_TYPE.MISS;
		this._hitAchieved = !this._options.hitArea;
		this._criticalAchieved = !this._options.criticalArea;
		this._requiredFlags = new Array(this._options.requiredAreas.length).fill(false);
		this._requiredAreasCleared = false;

		$gameVariables.setValue(this._options.variableId, RESULT_TYPE.MISS);

		this._createUi();
		SceneManager._scene._spriteset.addChild(this._container);
	};

	/**
	 * 終了したかどうかを返します
	 * @returns {boolean}
	 */
	TimingBar.prototype.isFinished = function () {
		return !this._isPlaying;
	};

	/**
	 * 毎フレームの更新処理
	 */
	TimingBar.prototype.update = function () {
		if (!this._isPlaying) return;

		this._updateFrame();
		this._updateCursor();
		this._handleInput();
		this._checkEndConditions();
	};

	/**
	 * 終了処理
	 */
	TimingBar.prototype.terminate = function () {
		if (this._container) {
			SceneManager._scene._spriteset.removeChild(this._container);
			this._container = null;
		}
	};

	// ----------------------------------------------------------------
	// Private: UI Creation
	// ----------------------------------------------------------------

	/**
	 * 全てのUIコンポーネントを作成します
	 * @private
	 */
	TimingBar.prototype._createUi = function () {
		this._container = new Sprite();
		this._container.x = this._options.x - PRM_varWidth / 2;
		this._container.y = this._options.y - TIMING_BAR_SETTINGS.HEIGHT / 2;

		this._createFrame();
		this._createAreas();
		this._createCursor();

		// 残像スプライトの配列
		this._trails = [];
	};

	/**
	 * バーの背景と枠を作成します
	 * @private
	 */
	TimingBar.prototype._createFrame = function () {
		const { HEIGHT, RADIUS, COLORS } = TIMING_BAR_SETTINGS;
		const bmp = new Bitmap(PRM_varWidth + 4, HEIGHT + 4);
		const ctx = bmp.context;

		roundedRectangle(ctx, 2, 2, PRM_varWidth, HEIGHT, RADIUS);
		ctx.fillStyle = COLORS.FRAME_BG;
		ctx.fill();
		ctx.lineWidth = 2;
		ctx.strokeStyle = COLORS.FRAME_BORDER;
		ctx.stroke();

		const frameSprite = new Sprite(bmp);
		frameSprite.position.set(-2, -2);
		this._container.addChild(frameSprite);
	};

	/**
	 * 各種エリア（必須、ヒット、クリティカル）のスプライトを作成します
	 * @private
	 */
	TimingBar.prototype._createAreas = function () {
		const { requiredAreas, hitArea, criticalArea } = this._options;
		const { COLORS } = TIMING_BAR_SETTINGS;

		requiredAreas.forEach(area => this._createAreaSprite(area, COLORS.REQUIRED));
		if (hitArea) this._createAreaSprite(hitArea, COLORS.HIT);
		if (criticalArea) this._createAreaSprite(criticalArea, COLORS.CRITICAL);
	};

	/**
	 * 指定された範囲と色のエリアを作成します
	 * @param {number[]} area - [開始位置, 終了位置]
	 * @param {string} color - 色
	 * @private
	 */
	TimingBar.prototype._createAreaSprite = function (area, color) {
		const { HEIGHT, MAX_FRAMES } = TIMING_BAR_SETTINGS;
		const [start, end] = area;
		const width = PRM_varWidth * (end - start) / MAX_FRAMES;
		const x = PRM_varWidth * start / MAX_FRAMES;

		const bmp = new Bitmap(width, HEIGHT);
		bmp.fillRect(0, 0, width, HEIGHT, color);

		const sprite = new Sprite(bmp);
		sprite.position.set(x, 0);
		this._container.addChild(sprite);
	};

	/**
	 * カーソルスプライトを作成します
	 * @private
	 */
	TimingBar.prototype._createCursor = function () {
		const { HEIGHT, COLORS } = TIMING_BAR_SETTINGS;
		const bmp = new Bitmap(18, 32 + HEIGHT + 2);
		const ctx = bmp.context;

		ctx.fillStyle = COLORS.CURSOR_FILL;
		ctx.strokeStyle = COLORS.CURSOR_STROKE;
		ctx.lineWidth = 1;

		// 上の三角形
		ctx.beginPath();
		ctx.moveTo(1, 1);
		ctx.lineTo(17, 1);
		ctx.lineTo(9, 17);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// 下の三角形
		ctx.beginPath();
		ctx.moveTo(9, HEIGHT + 17);
		ctx.lineTo(17, HEIGHT + 33);
		ctx.lineTo(1, HEIGHT + 33);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		this._cursor = new Sprite(bmp);
		this._cursor.position.set(-9, -17);
		this._cursor.opacity = 0;
		this._container.addChild(this._cursor);
	};

	/**
	 * カーソル残像スプライトを作成します
	 * @private
	 */
	TimingBar.prototype._createCursorTrail = function () {
		const { HEIGHT, COLORS } = TIMING_BAR_SETTINGS;
		const bmp = new Bitmap(18, 32 + HEIGHT + 2);
		const ctx = bmp.context;

		ctx.fillStyle = COLORS.CURSOR_TRAIL_FILL;
		ctx.strokeStyle = COLORS.CURSOR_TRAIL_STROKE;
		ctx.lineWidth = 1;

		// 上の三角形
		ctx.beginPath();
		ctx.moveTo(1, 1);
		ctx.lineTo(17, 1);
		ctx.lineTo(9, 17);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// 下の三角形
		ctx.beginPath();
		ctx.moveTo(9, HEIGHT + 17);
		ctx.lineTo(17, HEIGHT + 33);
		ctx.lineTo(1, HEIGHT + 33);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// アニメーションを再生するため Sprite_Base を継承
		// 参照しやすいように this._trails に格納しておく
		const trail = new Sprite_Base();
		trail.bitmap = bmp;
		trail.position.set(this._cursor.x, this._cursor.y);
		this._trails.push(trail);
		this._container.addChild(trail);
		// return trail;
	};

	// ----------------------------------------------------------------
	// Private: Update Logic
	// ----------------------------------------------------------------

	/**
	 * フレームカウンターを更新します
	 * @private
	 */
	TimingBar.prototype._updateFrame = function () {
		this._frame += TIMING_BAR_SETTINGS.CURSOR_SPEED;
	};

	/**
	 * カーソルの位置と透明度を更新します
	 * @private
	 */
	// アニメーション再生中にカーソルが終端を飛び出るのを回避
	TimingBar.prototype._updateCursor = function () {
		const { DELAY_FRAMES, MAX_FRAMES } = TIMING_BAR_SETTINGS;
		if ((this._frame >= 0) && (MAX_FRAMES > this._frame)) {
			this._cursor.x = PRM_varWidth * this._frame / MAX_FRAMES;
			this._cursor.opacity = 255;
		} else {
			this._cursor.x = 0;
			this._cursor.opacity = (DELAY_FRAMES + this._frame) / DELAY_FRAMES * 255;
		}
	};

	/**
	 * プレイヤーの入力を処理します
	 * @private
	 */
	TimingBar.prototype._handleInput = function () {
		if (this._frame < 0) return;
		if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
			this._processHit();
		}
	};

	/**
	 * ヒット判定を処理します
	 * @private
	 */
	// エリア毎のアニメーション再生処理を追加
	// アニメーション再生対象は最後に追加された残像スプライト
	TimingBar.prototype._processHit = function () {
		const currentPos = this._frame;
		const { requiredAreas, criticalArea, hitArea } = this._options;
		let hitTypeFound = false;

		if (PRM_showCursorTrail) {
			this._createCursorTrail();
		}

		// 必須エリアのチェック
		for (let i = 0; i < requiredAreas.length; i++) {
			const area = requiredAreas[i];
			if (!this._requiredFlags[i] && currentPos >= area[0] && currentPos < area[1]) {
				this._requiredFlags[i] = true;
				playSe(SE_SETTINGS.required);
				this._trails.slice(-1)[0].startAnimation($dataAnimations[PRM_requiredAnimation], false, 0);
				hitTypeFound = true;
				break;
			}
		}
		if (hitTypeFound) return;

		// クリティカルエリアのチェック
		if (criticalArea && currentPos >= criticalArea[0] && currentPos < criticalArea[1]) {
			this._result = Math.max(this._result, RESULT_TYPE.CRITICAL);
			this._criticalAchieved = true;
			playSe(SE_SETTINGS.critical);
			this._trails.slice(-1)[0].startAnimation($dataAnimations[PRM_criticalAnimation], false, 0);
			return;
		}

		// ヒットエリアのチェック
		if (hitArea && currentPos >= hitArea[0] && currentPos < hitArea[1]) {
			this._result = Math.max(this._result, RESULT_TYPE.HIT);
			this._hitAchieved = true;
			playSe(SE_SETTINGS.hit);
			this._trails.slice(-1)[0].startAnimation($dataAnimations[PRM_hitAnimation], false, 0);
			return;
		}

		// ミス
		playSe(SE_SETTINGS.miss);
		this._endSequence(RESULT_TYPE.MISS, true);
	};

	/**
	 * 終了条件をチェックします
	 * @private
	 */
	// アニメーション再生中は終了判定しない
	TimingBar.prototype._checkEndConditions = function () {
		if (this._isAnimationPlaying()) return;
		const currentPos = this._frame;

		// 必須エリア未入力時即終了
		if (PRM_requireMissEnd && this._options.requiredAreas.length > 0) {
			for (let i = 0; i < this._options.requiredAreas.length; i++) {
				const area = this._options.requiredAreas[i];
				if (!this._requiredFlags[i] && currentPos > area[1]) {
					playSe(SE_SETTINGS.miss);
					this._endSequence(RESULT_TYPE.MISS, true);
					return;
				}
			}
		}

		// 全て達成
		// 時間切れと優先度を変更
		if (this._areAllObjectivesCleared()) {
			this._endSequence(this._result, false);
			return;
		}

		// 時間切れ
		if (currentPos > TIMING_BAR_SETTINGS.MAX_FRAMES) {
			playSe(SE_SETTINGS.miss);
			this._endSequence(this._result, false);
			return;
		}

	};

	/**
	 * 全ての目標（必須、ヒット、クリティカル）が達成されたか確認します
	 * @returns {boolean}
	 * @private
	 */
	TimingBar.prototype._areAllObjectivesCleared = function () {
		const allRequired = this._requiredFlags.every(flag => flag);
		return allRequired && this._hitAchieved && this._criticalAchieved;
	};

	/**
	 * 終了シーケンスを開始します
	 * @param {number} baseResult - 基本となるリザルト
	 * @param {boolean} forceMiss - 強制的にミスにするか
	 * @private
	 */
	TimingBar.prototype._endSequence = function (baseResult, forceMiss) {
		if (!this._isPlaying) return;
		this._isPlaying = false;

		let finalResult = baseResult;
		const allRequiredHit = this._requiredFlags.every(flag => flag);

		if (forceMiss || !allRequiredHit) {
			finalResult = RESULT_TYPE.MISS;
		}

		$gameVariables.setValue(this._options.variableId, finalResult);
	};

	/**
	 * アニメーション再生中に true を返します。
	 * @returns {boolean}
	 * @private
	 */
	TimingBar.prototype._isAnimationPlaying = function () {
		return this._trails.some(trail => trail && trail.isAnimationPlaying());
	};

})();