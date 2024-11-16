<!-- # webpro_06 --> 

<!-- ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんのテンプレートファイル -->

<!-- ```javascript
console.log('Hello');
``` -->


# app5.js 仕様書
## 起動方法とGit管理
#### 起動方法
1. ```node app5.js```のコマンドを実行してアプリケーションを起動する
1. アプリケーションが起動したら,Webブラウザで```http://localhost:8080```にアクセスする

#### Git管理
1. ```git add .```でGitにファイルを追加する
1. ```git commit -am　'コメント’```でコメントを追加する
1. ```git push```でリモートリポジトリに反映する

## プログラム内容
#### ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
views/show.ejs | 挨拶メッセージを表示するファイル
views/icon.ejs | Appleロゴを表示するファイル
views/janken.ejs | じゃんけんの結果をファイル
views/luck.ejs | おみくじの運勢を表示するファイル
views/quiz.ejs | クイズの質問と選択肢を表示するファイル
views/yakyu.ejs | 野球チームのリーグを表示するファイル

## 使用内容
使用手順に関しては例としてリーグ判定機能と自分クイズ機能の2つを説明する.

#### リーグ判定機能
##### 機能説明
この機能では,```/yakyu```にアクセスすると,ユーザーがプロ野球チームの名前を入力するフォームが表示される.
入力されたチーム名に基づいてそのチームが所属しているリーグを判定する.
該当しないチーム名の場合は「そのようなチームはありません」と表示され,チーム名が入力されない場合は「チーム名を入力してください」と表示される.
##### 使用手順
1. ```app5.js``` を起動する
1. Webブラウザで```http://localhost:8080/yakyu```にアクセスする
1. チーム名を入力し送信する
1. 結果が表示される
##### フローチャート
```mermaid
flowchart TD;

start["開始"]
  check_team["チーム名が入力されているか"]
  input_empty["入力されていない"]
  input_filled["入力されている"]
  check_league["チームがパリーグか？"]
  check_central_league["パリーグでない場合、セリーグか？"]
  result_parleague["パリーグに所属"]
  result_centralleague["セリーグに所属"]
  result_none["そのようなチームはありません"]
  result_input_prompt["チーム名を入力してください"]
  end1["終了"]

  start --> check_team
  check_team -->|no| input_empty
  check_team -->|yes| input_filled
  input_empty --> result_input_prompt --> end1
  input_filled --> check_league
  check_league -->|yes| result_parleague --> end1
  check_league -->|no| check_central_league
  check_central_league -->|yes| result_centralleague --> end1
  check_central_league -->|no| result_none --> end1
  ```

#### 自分クイズ機能
##### 機能説明
この機能では,```/quiz```にアクセスすると,ユーザーに対して質問が表示される.質問内容は「僕の大好きなスポーツは？」というもので,選択肢として「サッカー」「テニス」「野球」「バスケ」が与えられる.
ユーザーはラジオボタンで1つの答えを選択し,「解答する」ボタンを押す.
```/quiz/result```にアクセスするとユーザーが選んだ回答が正しいかどうかを判定し,結果を表示する.
##### 使用手順
1. ```app5.js``` を起動する
1. Webブラウザで```http://localhost:8080/quiz```にアクセスする
1. クイズの質問が表示され,選択肢の中から1つを選び解答する.
1. ```http://localhost:8080/quiz/result```にアクセスするとユーザーが選んだ解答が正解か不正解かの結果が表示される.
##### フローチャート
```mermaid
flowchart TD;

start["開始"]
  check_answer["ユーザーが解答したか？"]
  answer_received["解答が受け取られた"]
  compare_answer["ユーザーの解答と正解を比較"]
  correct_answer["正解"]
  incorrect_answer["不正解"]
  end1["終了"]

  start --> check_answer
  check_answer -->|no| check_answer
  check_answer -->|yes| answer_received
  answer_received --> compare_answer
  compare_answer -->|correct| correct_answer
  compare_answer -->|incorrect| incorrect_answer
  correct_answer --> end1
  incorrect_answer --> end1
  ```

#### 挨拶メッセージの表示機能
##### 機能説明
この機能では,```/hello1```または```/hello2```にアクセスすると,異なる形式で挨拶メッセージが表示される.
```/hello1```では2つの挨拶メッセージ（「Hello world」と「Bon jour」）を表示する.
```/hello2```では同じく2つの挨拶メッセージ（「Hello world」と「Bon jour」）を表示するが,直接ハードコードされたメッセージが使われる.

#### アイコン表示機能
##### 機能説明
この機能では,```/icon```にアクセスすると,Appleのロゴアイコンを表示する.ロゴ画像のパスはハードコードされており,alt属性も設定されている.

#### おみくじ機能
##### 機能説明
この機能では,```/luck```にアクセスすると,1から6までのランダムな数字を生成し,その数字に基づいて運勢を表示する.1は「大吉」,2は「中吉」,それ以外は運勢を表示しないが数字が生成されたことが確認できる.

#### じゃんけん機能
##### 機能説明
この機能では,```/janken```にアクセスすると,ユーザーが「グー」「チョキ」「パー」を入力できるフォームが表示される.
ユーザーが選んだ手とコンピュータの手を比較し勝敗を判定する.
勝つ場合は「勝ち」,負ける場合は「負け」,同じ手の場合は「あいこ」と表示される.
ゲームの試合数や勝利数も表示される.

#### 機能のまとめ
機能名 | 機能説明 | 使用URL | 入力方法 | 結果
-|-|-|-|-
リーグ判定 | チーム名から所属リーグを判定 | ```/yakyu``` | チーム名を入力 | 所属リーグが表示される
自分クイズ | クイズを出題し回答の正誤を判定 | ```/quiz``` and ```/quiz/result``` | ラジオボタンで1つを選択 | 正解または不正解のメッセージが表示される
挨拶メッセージ表示 | Hello world」や「Bon jour」のメッセージを表示 | ```/hello1``` or ```/hello2``` | - | メッセージが表示される
アイコン表示 | Appleのロゴを表示 | ```/icon``` | - | Appleのロゴ画像が表示される
おみくじ | ランダムな数字に基づいて運勢を表示 | ```/luck``` | - | 大吉や中吉などの運勢が表示される
じゃんけん | じゃんけんの手を選び勝敗を判定 | ```/janken``` | グー,チョキ,パーのいずれかを入力 | ユーザーの手,コンピュータの手,勝敗が表示される

## 終わりに
本プログラムは複数の機能を実装することで,サーバーサイドプログラミングの基本的な流れを学ぶことができた.フォーム送信,URLパラメータの受け渡し,動的コンテンツのレンダリング,そして簡単なロジックを使ったゲームや運試しの要素が組み合わさり,実際のWebアプリケーション開発における基本的な技術を実践することができた.


