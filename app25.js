"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let tasks = [];  // タスクの配列

// ミドルウェア
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

// タスク追加
app.post("/addTask", (req, res) => {
    const taskText = req.body.task;
    const newTask = {
        id: tasks.length + 1,
        task: taskText,
        completed: false
    };
    tasks.push(newTask);
    res.json({ message: "タスクを追加しました", task: newTask });
});

// タスク一覧取得
app.get("/getTasks", (req, res) => {
    res.json(tasks);
});

// タスク削除
app.post("/deleteTask", (req, res) => {
    const taskId = Number(req.body.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: "タスクを削除しました" });
});

// タスク完了・未完了の切り替え
app.post("/toggleCompletion", (req, res) => {
    const taskId = Number(req.body.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        res.json({ message: "タスクの状態を更新しました", task });
    } else {
        res.json({ message: "タスクが見つかりません" });
    }
});

app.listen(8080, () => {
    console.log("Task Management App listening on port 8080!");
});