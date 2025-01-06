```mermaid
flowchart TD;

start["開始"]
  check_taskId["taskIdがリクエストボディに含まれているか"]
  input_empty["taskIdが含まれていない"]
  input_filled["taskIdが含まれている"]
  check_exists["taskIdはtasks配列に存在するか"]
  task_not_found["タスクが見つからない"]
  task_found["タスクが見つかる"]
  toggle_completed["完了状態（completed）を反転"]
  return_success["変更後のtasks配列をクライアントに返す"]
  return_error["エラーメッセージを返す"]
  end1["終了"]

  start --> check_taskId
  check_taskId -->|no| input_empty
  check_taskId -->|yes| input_filled
  input_empty --> return_error --> end1
  input_filled --> check_exists
  check_exists -->|no| task_not_found
  check_exists -->|yes| task_found
  task_not_found --> return_error --> end1
  task_found --> toggle_completed
  toggle_completed --> return_success --> end1
  ```