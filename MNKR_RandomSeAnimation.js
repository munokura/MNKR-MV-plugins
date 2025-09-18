/*
 * --------------------------------------------------
 * MNKR_RandomSeAnimation.js
 * Ver.1.0.0
 * Copyright (c) 2025 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_RandomSeAnimation.js
@plugindesc Randomizes the animation sound effects.
@author munokura
@license MIT License

@help
Please register the target sound effects (animation, frame, sound effects
list) in the plugin parameters.
When an animation is played, a sound effect will be played randomly from the
list.
This applies both in battle and on the map.

There are no plugin commands.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission from the author, and
there are no restrictions on its use (commercial, 18+, etc.).

@param animeLists
@text Random SE Target List
@desc Enter the random SE target list.
@type struct<animeList>[]
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_RandomSeAnimation.js
@plugindesc アニメーションのSEをランダムにします。
@author munokura

@help
プラグインパラメーターで対象となる
・アニメーション
・フレーム
・SEリスト
を登録してください。
アニメーション再生時に、SEが候補からランダムに再生されます。
戦闘中でもマップ上でも反映されます。

プラグインコマンドはありません。

利用規約:
MITライセンスです。
　http://opensource.org/licenses/mit-license.php
　作者に無断で改変、再配布が可能で、
　利用形態（商用、18禁利用等）についても制限はありません。

@param animeLists
@text ランダムSE対象リスト
@desc ランダムSE対象リストを入力。
@type struct<animeList>[]
*/

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const pluginParameters = PluginManager.parameters(pluginName);

    const settings = {
        animeLists: JSON.parse(pluginParameters.animeLists || '[]').map((param) => {
            const parsed = JSON.parse(param || '{}');
            return {
                animeId: Number(parsed.animeId || 0),
                frameList: JSON.parse(parsed.frameList || '[]').map((frameDataJson) => {
                    const frameParsed = JSON.parse(frameDataJson);
                    return {
                        frame: Number(frameParsed.frame || 0),
                        seList: JSON.parse(frameParsed.seList || '[]').map((seJson) => {
                            const seParsed = JSON.parse(seJson);
                            return {
                                name: String(seParsed.name || ''),
                                volume: Number(seParsed.volume || 90),
                                pitch: Number(seParsed.pitch || 100),
                                pan: Number(seParsed.pan || 0),
                            };
                        }),
                    };
                }),
            };
        }),
    };

    const _Sprite_Animation_processTimingData = Sprite_Animation.prototype.processTimingData;

    Sprite_Animation.prototype.processTimingData = function (timing) {
        const currentAnimationId = this._animation.id;
        const matchedAnimeSetting = settings.animeLists.find(
            (animeSetting) => animeSetting.animeId === currentAnimationId
        );

        if (!matchedAnimeSetting) {
            _Sprite_Animation_processTimingData.call(this, timing);
            return;
        }

        if (!timing.se) {
            _Sprite_Animation_processTimingData.call(this, timing);
            return;
        }

        const currentFrame = timing.frame + 1;

        const matchedFrameData = matchedAnimeSetting.frameList.find(frameData => {
            return frameData.frame === currentFrame || frameData.frame === 0;
        });

        if (matchedFrameData && matchedFrameData.seList && matchedFrameData.seList.length > 0) {
            const randomIndex = Math.floor(Math.random() * matchedFrameData.seList.length);
            const randomSeData = matchedFrameData.seList[randomIndex];
            const seToPlay = {
                name: randomSeData.name,
                volume: randomSeData.volume,
                pitch: randomSeData.pitch,
                pan: randomSeData.pan,
            };
            AudioManager.playSe(seToPlay);
            return;
        }

        _Sprite_Animation_processTimingData.call(this, timing);
    };
})();