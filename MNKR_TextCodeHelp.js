/*
 * --------------------------------------------------
 * MNKR_TextCodeHelp Ver.1.0.1
 * Copyright (c) 2020 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @plugindesc 文章の入力時に制御文字のコードをコピーしやすくヘルプを表示します。
 * @author munokura
 *
 * @help
 * 「文章の表示」に使用できる制御文字のヘルプ表示は非常に見づらいです。
 * 文章の編集画面で右クリックすると「プラグインヘルプ」が出ます。
 * このプラグインのヘルプから制御文字をコピーすれば、打ち間違いも減ります。
 *
 * \V[n]    変数 n 番の値に置き換えられます。
 * \N[n]    アクター n 番の名前に置き換えられます。
 * \P[n]    パーティーメンバー n 番の名前に置き換えられます。
 * \G       通貨単位に置き換えられます。
 * \C[n]    以降の文字色を n 番の色で表示します。※最下部に色番号表あり
 * \I[n]    アイコン n 番に置き換えられます。
 * \{       文字サイズを 1 段階大きくします。
 * \}       文字サイズを 1 段階小さくする。
 * \$       所持金のウィンドウを開きます。
 * \\       バックスラッシュに置き換えられます
 * \.       1/4 秒待ちます。
 * \|       1 秒待ちます。
 * \!       ボタンの入力を待ちます。
 * \>       同じ行にある文字を一瞬で表示します。
 * \<       文字を一瞬で表示する効果を取り消します。
 * \^       文章表示後の入力待ちをしません。
 *
 * 文字色コード(色名後の数字が大きいほど黒に近づきます)
 *   \C[0]   白
 *   \C[8]   グレー1
 *   \C[7]   グレー2
 *   \C[15]  黒
 *
 *   \C[18]  赤
 *   \C[2]   橙1
 *   \C[10]  橙2
 *   \C[27]  ピンク
 *
 *   \C[4]   青1
 *   \C[23]  青2
 *   \C[12]  青3
 *   \C[1]   青4
 *   \C[9]   青5
 *   \C[22]  青6
 *   \C[19]  青7
 *
 *   \C[6]   黄1
 *   \C[17]  黄2
 *   \C[14]  黄3
 *   \C[21]  黄4
 *   \C[20]  黄5
 *   \C[25]  黄6
 *
 *   \C[24]  緑1
 *   \C[29]  緑2
 *   \C[3]   緑3
 *   \C[11]  緑4
 *   \C[28]  緑5
 *
 *   \C[5]   紫1
 *   \C[16]  紫2
 *   \C[13]  紫3
 *   \C[31]  紫4
 *   \C[26]  紫5
 *   \C[30]  紫6
 *
 * プラグインコマンドや設定はありません。
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://ja.osdn.net/projects/opensource/wiki/licenses%2FMIT_license
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */
