// ==========================================
// STUDENT STUDY PLANNER - SCRIPT
// ==========================================


// ---------- TASK MANAGER ----------

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


// Get saved tasks
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];


// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="task-buttons">

                <button onclick="completeTask(${index})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });
}


// Add new task
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    displayTasks();
}


// Complete / Undo task
function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();
}


// Delete task
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
}


// Save tasks
function saveTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

}


// Add task button
if (addTaskBtn) {

    addTaskBtn.addEventListener("click", addTask);

}


// Press Enter to add task
if (taskInput) {

    taskInput.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            addTask();
        }

    });

}


// Display saved tasks when page opens
displayTasks();


// ==========================================
// SUBJECT MANAGER
// ==========================================

const subjectInput = document.getElementById("subjectInput");
const addSubjectBtn = document.getElementById("addSubjectBtn");
const subjectList = document.getElementById("subjectList");


// Get saved subjects
let subjects =
    JSON.parse(localStorage.getItem("studySubjects")) || [];


// Display subjects
function displaySubjects() {

    if (!subjectList) return;

    subjectList.innerHTML = "";

    subjects.forEach(function(subject, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${subject}</span>

            <button onclick="deleteSubject(${index})">
                Delete
            </button>
        `;

        subjectList.appendChild(li);

    });

}


// Add subject
function addSubject() {

    if (!subjectInput) return;

    const subject = subjectInput.value.trim();

    if (subject === "") {
        alert("Please enter a subject.");
        return;
    }

    subjects.push(subject);

    localStorage.setItem(
        "studySubjects",
        JSON.stringify(subjects)
    );

    subjectInput.value = "";

    displaySubjects();

}


// Delete subject
function deleteSubject(index) {

    subjects.splice(index, 1);

    localStorage.setItem(
        "studySubjects",
        JSON.stringify(subjects)
    );

    displaySubjects();

}


// Add subject button
if (addSubjectBtn) {

    addSubjectBtn.addEventListener(
        "click",
        addSubject
    );

}


// Display subjects when page opens
displaySubjects();


// ==========================================
// STUDY PLANNER
// ==========================================

const studyForm = document.getElementById("studyForm");

if (studyForm) {

    studyForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const subject =
            document.getElementById("studySubject").value;

        const date =
            document.getElementById("studyDate").value;

        const time =
            document.getElementById("studyTime").value;

        if (
            subject === "" ||
            date === "" ||
            time === ""
        ) {

            alert("Please fill all study plan details.");

            return;

        }


        const studyPlan = {

            subject: subject,
            date: date,
            time: time

        };


        localStorage.setItem(
            "studyPlan",
            JSON.stringify(studyPlan)
        );


        alert("Study plan saved successfully!");

    });

}


// ==========================================
// PROGRESS TRACKING
// ==========================================

function updateProgress() {

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(function(task) {
            return task.completed;
        }).length;


    const progressElement =
        document.getElementById("progress");

    const completedElement =
        document.getElementById("completedTasks");

    const totalElement =
        document.getElementById("totalTasks");


    if (totalElement) {

        totalElement.textContent = totalTasks;

    }


    if (completedElement) {

        completedElement.textContent =
            completedTasks;

    }


    if (progressElement) {

        if (totalTasks === 0) {

            progressElement.textContent = "0%";

        } else {

            const percentage =
                Math.round(
                    (completedTasks / totalTasks) * 100
                );

            progressElement.textContent =
                percentage + "%";

        }

    }

}


// Update progress whenever tasks change
const originalSaveTasks = saveTasks;

saveTasks = function() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

    updateProgress();

};


// Initial progress
updateProgress();
