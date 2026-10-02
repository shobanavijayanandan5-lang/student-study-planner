// ========================================
// STUDENT STUDY PLANNER - SCRIPT.JS
// ========================================


// Run when the page loads
document.addEventListener("DOMContentLoaded", function () {
    displayTasks();
});


// ========================================
// ADD TASK
// ========================================

function addTask() {

    const taskInput = document.getElementById("taskInput");

    // Make sure the input exists
    if (!taskInput) {
        return;
    }

    const taskText = taskInput.value.trim();

    // Don't allow empty tasks
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Get existing tasks
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Create new task
    const newTask = {
        text: taskText,
        completed: false
    };

    // Add task to the list
    tasks.push(newTask);

    // Save tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear input
    taskInput.value = "";

    // Update the screen
    displayTasks();
}


// ========================================
// DISPLAY TASKS
// ========================================

function displayTasks() {

    const taskList = document.getElementById("taskList");

    // If we are not on the dashboard page
    if (!taskList) {
        return;
    }

    // Clear current list
    taskList.innerHTML = "";

    // Get saved tasks
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Show message if there are no tasks
    if (tasks.length === 0) {

        const emptyMessage = document.createElement("li");

        emptyMessage.textContent = "No tasks yet. Add your first task!";

        taskList.appendChild(emptyMessage);

        return;
    }


    // Create each task
    tasks.forEach(function (task, index) {

        const li = document.createElement("li");

        // Task text
        const taskText = document.createElement("span");

        taskText.textContent =
            (task.completed ? "✅ " : "⬜ ") + task.text;

        taskText.style.cursor = "pointer";

        // Completed task style
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "#888";
        }

        // Click task to complete/uncomplete
        taskText.onclick = function () {
            toggleTask(index);
        };


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.onclick = function () {
            deleteTask(index);
        };


        // Add elements to task
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        // Add task to list
        taskList.appendChild(li);
    });
}


// ========================================
// COMPLETE / UNCOMPLETE TASK
// ========================================

function toggleTask(index) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Change completed status
    tasks[index].completed = !tasks[index].completed;

    // Save updated tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Update display
    displayTasks();
}


// ========================================
// DELETE TASK
// ========================================

function deleteTask(index) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Remove task
    tasks.splice(index, 1);

    // Save updated list
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Update display
    displayTasks();
}
