"use strict";

const taskListContainer = document.querySelector('#taskList');
const addTaskButton = document.querySelector('#addTask');
const listTasksButton = document.querySelector('#listTasks');

// タスク追加
addTaskButton.addEventListener('click', () => {
    const task = document.querySelector('#task').value;

    if (task.trim() !== "") {
        const params = {
            method: "POST",
            body: 'task=' + encodeURIComponent(task),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        fetch("/addTask", params)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.querySelector('#task').value = "";
                alert("タスクを追加しました！");
            })
            .catch(error => console.error("Error adding task:", error));
    } else {
        alert("タスクを入力してください！");
    }
});

// タスク一覧表示
listTasksButton.addEventListener('click', () => {
    fetch("/getTasks")
        .then(response => response.json())
        .then(tasks => {
            taskListContainer.innerHTML = "";
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.classList.add('task');
                
                const taskCheckbox = document.createElement('input');
                taskCheckbox.type = 'checkbox';
                taskCheckbox.checked = task.completed;
                taskCheckbox.addEventListener('change', () => toggleCompletion(task.id));

                const taskName = document.createElement('span');
                taskName.textContent = task.task;
                if (task.completed) {
                    taskElement.classList.add('completed');
                }

                const deleteButton = document.createElement('button');
                deleteButton.textContent = '削除';
                deleteButton.addEventListener('click', () => deleteTask(task.id));

                taskElement.appendChild(taskCheckbox);
                taskElement.appendChild(taskName);
                taskElement.appendChild(deleteButton);

                taskListContainer.appendChild(taskElement);
            });
        })
        .catch(error => console.error("Error fetching tasks:", error));
});

// タスク削除
function deleteTask(taskId) {
    const params = {
        method: "POST",
        body: 'id=' + taskId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch("/deleteTask", params)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("タスクを削除しました！");
            listTasksButton.click(); // 一覧を更新
        })
        .catch(error => console.error("Error deleting task:", error));
}

// タスク完了・未完了の切り替え
function toggleCompletion(taskId) {
    const params = {
        method: "POST",
        body: 'id=' + taskId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    fetch("/toggleCompletion", params)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            listTasksButton.click(); // 一覧を更新
        })
        .catch(error => console.error("Error toggling completion:", error));
}