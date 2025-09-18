/*
 * --------------------------------------------------
 * MNKR_TextCodeHelp.js
 *   Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TextCodeHelp.js
@plugindesc Displays help to make it easier to copy control character codes when entering text.
@author munokura
@license MIT License

@help
The help text for the control characters used in "Display Text" is very
difficult to read.
Right-clicking on the text editing screen will bring up "Plugin Help."
Copying control characters from this plugin's help will reduce typos.

\V[n] Replaced with the value of variable n.
\N[n] Replaced with the name of actor n.
\P[n] Replaced with the name of party member n.
\G Replaced with the currency unit.
\C[n] Displays subsequent text in color n. *See the color number chart at the
bottom.
\I[n] Replaced with icon n.
\{ Increases text size by one level.
\} Decrease text size by one level.
\$ Opens the money window.
\\ Replaced with a backslash.
\. Waits for 1/4 second.
\| Waits for 1 second.
\! Waits for button input.
\> Instantly displays all characters on the same line.
\< Cancels the effect of instantly displaying characters.
\^ Does not wait for input after displaying text.

Text Color Code (The higher the number after the color name, the closer it is
to black)
\C[0] White
\C[8] Gray 1
\C[7] Gray 2
\C[15] Black

\C[18] Red
\C[2] Orange 1
\C[10] Orange 2
\C[27] Pink

\C[4] Blue 1
\C[23] Blue 2
\C[12] Blue 3
\C[1] Blue 4
\C[9] Blue 5
\C[22] Blue 6
\C[19] Blue 7

\C[6] Yellow 1
\C[17] Yellow 2
\C[14] Yellow 3
\C[21] Yellow 4
\C[20] Yellow 5
\C[25] Yellow 6

\C[24] Green 1
\C[29] Green 2
\C[3] Green 3
\C[11] Green 4
\C[28] Green 5

\C[5] Purple 1
\C[16] Purple 2
\C[13] Purple 3
\C[31] Purple 4
\C[26] Purple 5
\C[30] Purple 6

No plugin commands or settings.

Terms of Use:
MIT License.
http://opensource.org/licenses/mit-license.php
You may modify and redistribute this without permission, and there are no
restrictions on its use (commercial, 18+, etc.).
*/

/*:ja
@target MV
@url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_TextCodeHelp.js
@plugindesc 文章の入力時に制御文字のコードをコピーしやすくヘルプを表示します。
@author munokura

@help
「文章の表示」に使用できる制御文字のヘルプ表示は非常に見づらいです。
文章の編集画面で右クリックすると「プラグインヘルプ」が出ます。
このプラグインのヘルプから制御文字をコピーすれば、打ち間違いも減ります。

\V[n]    変数 n 番の値に置き換えられます。
\N[n]    アクター n 番の名前に置き換えられます。
\P[n]    パーティーメンバー n 番の名前に置き換えられます。
\G       通貨単位に置き換えられます。
\C[n]    以降の文字色を n 番の色で表示します。※最下部に色番号表あり
\I[n]    アイコン n 番に置き換えられます。
\{       文字サイズを 1 段階大きくします。
\}       文字サイズを 1 段階小さくする。
\$       所持金のウィンドウを開きます。
\\       バックスラッシュに置き換えられます
\.       1/4 秒待ちます。
\|       1 秒待ちます。
\!       ボタンの入力を待ちます。
\>       同じ行にある文字を一瞬で表示します。
\<       文字を一瞬で表示する効果を取り消します。
\^       文章表示後の入力待ちをしません。

文字色コード(色名後の数字が大きいほど黒に近づきます)
  \C[0]   白
  \C[8]   グレー1
  \C[7]   グレー2
  \C[15]  黒

  \C[18]  赤
  \C[2]   橙1
  \C[10]  橙2
  \C[27]  ピンク

  \C[4]   青1
  \C[23]  青2
  \C[12]  青3
  \C[1]   青4
  \C[9]   青5
  \C[22]  青6
  \C[19]  青7

  \C[6]   黄1
  \C[17]  黄2
  \C[14]  黄3
  \C[21]  黄4
  \C[20]  黄5
  \C[25]  黄6

  \C[24]  緑1
  \C[29]  緑2
  \C[3]   緑3
  \C[11]  緑4
  \C[28]  緑5

  \C[5]   紫1
  \C[16]  紫2
  \C[13]  紫3
  \C[31]  紫4
  \C[26]  紫5
  \C[30]  紫6

プラグインコマンドや設定はありません。

利用規約:
  MITライセンスです。
  http://opensource.org/licenses/mit-license.php
  作者に無断で改変、再配布が可能で、
  利用形態（商用、18禁利用等）についても制限はありません。
*/
