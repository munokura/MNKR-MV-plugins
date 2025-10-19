/*=============================================================================
 MessageAlignCenter.js
----------------------------------------------------------------------------
 (C)2021 Triacontane
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.4.2 2023/07/13 揃えを変更する制御文字を使用したとき既にフォントサイズが変更されていると位置がズレる問題を修正
 1.4.1 2022/12/21 1.4.0以降、\$を使用するとエラーになっていた問題を修正
 1.4.0 2022/11/26 競合を避けるためのリファクタリング
 1.3.0 2022/11/01 中央揃え、右揃えにする際の描画位置をピクセル単位で調整できる機能を追加
 1.2.2 2021/10/08 1.2.1の修正により、\c[n]などの制御文字が文字幅としてカウントされ揃え位置がズレてしまう問題を修正
 1.2.1 2021/09/24 ウェイト系の制御文字を使ったときに、正常な動作をしなくなる問題を修正
 1.2.0 2021/09/19 縦方向の揃えを中央揃え、下揃えにする機能を追加
 1.1.0 2021/08/01 他プラグインと制御文字が被ったときに備えて、パラメータから制御文字を変更できる機能を追加
 1.0.1 2021/07/29 リファクタリング
 1.0.0 2021/07/28 初版
----------------------------------------------------------------------------
 [Blog]   : https://triacontane.blogspot.jp/
 [Twitter]: https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
=============================================================================*/
//  MessageAlignCenterMV.js
//  1.0.1 2025/10/19 MZ版に近い構造へリファクタリング
//  1.0.0 2025/10/18 MVへ移植 munokura

/*:
 * @plugindesc メッセージの中央揃えプラグイン
 * @author トリアコンタン,（移植munokura）
 *
 * @param escapeCharacterCenter
 * @text 中央揃えの制御文字
 * @desc メッセージを中央揃えにする制御文字です。通常はそのままで使えますが、他プラグインと競合する場合は変更してください。
 * @default ac
 *
 * @param escapeCharacterRight
 * @text 右揃えの制御文字
 * @desc メッセージを右揃えにする制御文字です。通常はそのままで使えますが、他プラグインと競合する場合は変更してください。
 * @default ar
 *
 * @param escapeCharacterVCenter
 * @text 縦中央揃えの制御文字
 * @desc メッセージを縦方向中央揃えにする制御文字です。通常はそのままで使えますが、他プラグインと競合する場合は変更してください。
 * @default vc
 *
 * @param escapeCharacterVBottom
 * @text 縦下揃えの制御文字
 * @desc メッセージを縦方向下揃えにする制御文字です。通常はそのままで使えますが、他プラグインと競合する場合は変更してください。
 * @default vb
 *
 * @help MessageAlignCenterMV.js
 *
 * 文章の表示などのメッセージやスキルの説明文などを中央揃え、右揃えにできます。
 * 以下の制御文字を行の先頭に記述すると揃えを変更できます。
 * \ac : 中央揃え
 * \ar : 右揃え
 * \vc : 縦方向の中央揃え
 * \vb : 縦方向の下揃え
 *
 * 後ろに数値を指定すると描画位置が指定したピクセル分、左にずれて描画されます。
 * \ac[20]
 *
 * メッセージのプレビューには反映されません。
 * 制御文字は必ず行の先頭に記述してください。
 * 縦方向揃えは、いち文章につきひとつだけ指定できます。
 * 必ず文章の先頭に記述してください。
 * 右読み言語には現バージョンでは対応していません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(() => {
    'use strict';

    // パラメータ取得
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const PRM = PluginManager.parameters(pluginName);
    const param = {
        escapeCharacterCenter: PRM['escapeCharacterCenter'] || 'ac',
        escapeCharacterRight: PRM['escapeCharacterRight'] || 'ar',
        escapeCharacterVCenter: PRM['escapeCharacterVCenter'] || 'vc',
        escapeCharacterVBottom: PRM['escapeCharacterVBottom'] || 'vb'
    };

    const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function (code, textState) {
        if (textState.drawing) {
            const dummy = Window_Base.createDummyWindow();
            dummy.setRealFontSize(this.contents.fontSize);
            switch (code) {
                case dummy.findEscapeCenter():
                    textState.x += dummy.findInnerSpace(textState, this.innerWidth) / 2;
                    break;
                case dummy.findEscapeRight():
                    textState.x += dummy.findInnerSpace(textState, this.innerWidth);
                    break;
                case dummy.findEscapeVCenter():
                    textState.y += dummy.findInnerVSpace(textState, this.innerHeight) / 2;
                    break;
                case dummy.findEscapeVBottom():
                    textState.y += dummy.findInnerVSpace(textState, this.innerHeight);
                    break;
            }
        }
        _Window_Base_processEscapeCharacter.apply(this, arguments);
    };

    Window_Base.createDummyWindow = function () {
        if (!this._dummyWindow) {
            this._dummyWindow = new Window_MessageDummy();
        }
        return this._dummyWindow;
    };

    /**
     * Window_MessageDummy
     * メッセージ幅を取得するためのダミーウィンドウです
     */
    class Window_MessageDummy extends Window_Message {
        constructor() {
            super();
            this._goldWindow = new Window_Gold(0, 0);
        }

        findEscapeCenter() {
            return (param.escapeCharacterCenter || 'AC').toUpperCase();
        }

        findEscapeRight() {
            return (param.escapeCharacterRight || 'AR').toUpperCase();
        }

        findEscapeVCenter() {
            return (param.escapeCharacterVCenter || 'VC').toUpperCase();
        }

        findEscapeVBottom() {
            return (param.escapeCharacterVBottom || 'VB').toUpperCase();
        }

        findInnerSpace(textState, innerWidth) {
            const shift = this.obtainEscapeParam(textState);
            return innerWidth - this.textSizeEx(this.findLineText(textState)).width - textState.startX - (shift || 0);
        }

        findInnerVSpace(textState, innerHeight) {
            return innerHeight - this.textSizeEx(textState.text).height - textState.startY;
        }

        findLineText(textState) {
            let text = '';
            let index = textState.index;
            while (textState.text[index] !== '\n' && !!textState.text[index]) {
                text += textState.text[index++];
            }
            return text;
        }

        setRealFontSize(fontSize) {
            this._fontSize = fontSize;
        }

        resetFontSettings() {
            super.resetFontSettings();
            if (this._fontSize) {
                this.contents.fontSize = this._fontSize;
            }
        }

        // MV用textSizeEx実装
        textSizeEx(text) {
            this.resetFontSettings();
            const textState = {
                index: 0,
                text: this.convertEscapeCharacters(text)
            };
            textState.width = 0;
            textState.height = this.calcTextHeight(textState, false);
            const tempFontSize = this.contents.fontSize;

            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }

            this.contents.fontSize = tempFontSize;
            return { width: textState.width, height: textState.height };
        }

        processCharacter(textState) {
            const c = textState.text[textState.index++];
            if (c.charCodeAt(0) < 0x20) {
                this.flushTextState(textState);
                this.processControlCharacter(textState, c);
            } else {
                textState.width += this.textWidth(c);
            }
        }

        flushTextState(textState) {
            // MV版では特に処理なし
        }

        processControlCharacter(textState, c) {
            switch (c) {
                case '\n':
                    break;
                case '\f':
                    break;
                case '\x1b':
                    const code = this.obtainEscapeCode(textState);
                    this.processEscapeCharacter(code, textState);
                    break;
            }
        }

        calcTextHeight(textState, all) {
            const lastFontSize = this.contents.fontSize;
            let textHeight = 0;
            const lines = textState.text.split('\n');
            const maxLines = all ? lines.length : 1;

            for (let i = 0; i < maxLines; i++) {
                let maxFontSize = this.contents.fontSize;
                const regExp = /\x1b[\{\}]/g;
                for (; ;) {
                    const array = regExp.exec(lines[i]);
                    if (array) {
                        if (array[0] === '\x1b{') {
                            this.makeFontBigger();
                        }
                        if (array[0] === '\x1b}') {
                            this.makeFontSmaller();
                        }
                        if (maxFontSize < this.contents.fontSize) {
                            maxFontSize = this.contents.fontSize;
                        }
                    } else {
                        break;
                    }
                }
                textHeight += maxFontSize + 8;
            }

            this.contents.fontSize = lastFontSize;
            return textHeight;
        }
    }

    //-----------------------------------------------------------------------------
    // MV用追加処理
    //-----------------------------------------------------------------------------

    // MV用innerWidth/innerHeightゲッター追加（MZ互換）
    Object.defineProperty(Window_Base.prototype, 'innerWidth', {
        get: function () {
            return this.contentsWidth();
        },
        configurable: true
    });

    Object.defineProperty(Window_Base.prototype, 'innerHeight', {
        get: function () {
            return this.contentsHeight();
        },
        configurable: true
    });

    // startX、startY、drawingの初期化
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        _Window_Message_startMessage.apply(this, arguments);
        this._textState.startX = this._textState.x;
        this._textState.startY = this._textState.y;
        this._textState.drawing = true;
    };

})();