function addTask() {

    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = document.createElement("li");

    task.textContent = "✅ " + taskText;

    taskList.appendChild(task);

    taskInput.value = "";
}
