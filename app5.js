const express = require("express");
const app = express();  

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else if( num==3 ) cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  if((num==1&&hand=='チョキ')||(num==2&&hand=='パー')||(num==3&&hand=='グー')){
    judgement = '負け';
    total += 1; 
  } else if (hand === cpu) {
    judgement = 'あいこ'; // あいこの場合の処理
  } else {
    win += 1; 
    total += 1; 
  }
   
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/yakyu", (req, res) => {
  let team = req.query.team;
  let league = '';
  
if ( team === "ソフトバンク" || team === "日ハム" || team === "ロッテ" || team === "楽天" || team === "オリックス" || team === "西武"){
  league = "パリーグ";
} else if( team == "巨人" || team === "阪神" || team === "DeNA" || team === "広島" || team === "ヤクルト" || team === "中日"){
  league = "セリーグ";
} else if (team) {
  league = "そのようなチームはありません";
} else {
  league = "チーム名を入力してください";
}

res.render( 'yakyu', { team: team, league: league});
});

app.get("/quiz", (req, res) => {
  const quizData = {
    question: "僕の大好きなスポーツは？",
    options: ["サッカー", "テニス", "野球", "バスケ"],
    correctAnswer: "野球"
  };

  res.render('quiz', { quiz: quizData, result: null });
});

app.get("/quiz/result", (req, res) => {
  const quizData = {
    question: "僕の大好きなスポーツは？",
    options: ["サッカー", "テニス", "野球", "バスケ"],
    correctAnswer: "野球"
  };

  const userAnswer = req.query.answer;
  let result = '';

  if (userAnswer === quizData.correctAnswer) {
    result = "正解! よくできました👏";
  } else {
    result = "ざんねーーん😞不正解";
  }
  
  res.render('quiz', { quiz: quizData, result: result });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
