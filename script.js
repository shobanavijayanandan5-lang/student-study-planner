// ======================================================
// STUDENT STUDY PLANNER
// COMPLETE SCRIPT.JS
// ======================================================


// ======================================================
// TASKS
// ======================================================

let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


// Display Tasks
function displayTasks() {

    if (!taskList) return;

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


// Add Task
function addTask() {

    if (!taskInput) return;

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

    updateDashboard();

}


// Complete Task
function completeTask(index) {

    if (!tasks[index]) return;

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();

    displayTasks();

    updateDashboard();

}


// Delete Task
function deleteTask(index) {

    if (!tasks[index]) return;

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();

    updateDashboard();

}


// Save Tasks
function saveTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

}


// Add Task Button
if (addTaskBtn) {

    addTaskBtn.addEventListener(
        "click",
        addTask
    );

}


// Press Enter to Add Task
if (taskInput) {

    taskInput.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {
                addTask();
            }

        }
    );

}


// ======================================================
// SUBJECTS
// ======================================================

let subjects =
    JSON.parse(
        localStorage.getItem("studySubjects")
    ) || [];


const subjectInput =
    document.getElementById("subjectInput");

const addSubjectBtn =
    document.getElementById("addSubjectBtn");

const subjectList =
    document.getElementById("subjectList");


// Display Subjects
function displaySubjects() {

    if (!subjectList) return;

    subjectList.innerHTML = "";

    subjects.forEach(function(subject, index) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="subject-name">
                📚 ${subject}
            </span>

            <button
                class="delete-subject"
                onclick="deleteSubject(${index})">
                Delete
            </button>
        `;

        subjectList.appendChild(li);

    });

}


// Add Subject
function addSubject() {

    if (!subjectInput) return;

    const subject =
        subjectInput.value.trim();

    if (subject === "") {

        alert("Please enter a subject.");

        return;
    }

    subjects.push(subject);

    saveSubjects();

    subjectInput.value = "";

    displaySubjects();

    updateDashboard();

}


// Delete Subject
function deleteSubject(index) {

    if (!subjects[index]) return;

    subjects.splice(index, 1);

    saveSubjects();

    displaySubjects();

    updateDashboard();

}


// Save Subjects
function saveSubjects() {

    localStorage.setItem(
        "studySubjects",
        JSON.stringify(subjects)
    );

}


// Add Subject Button
if (addSubjectBtn) {

    addSubjectBtn.addEventListener(
        "click",
        addSubject
    );

}


// Press Enter to Add Subject
if (subjectInput) {

    subjectInput.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {
                addSubject();
            }

        }
    );

}


// ======================================================
// STUDY PLAN
// ======================================================

const studyForm =
    document.getElementById("studyForm");


if (studyForm) {

    studyForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const studySubject =
                document.getElementById("studySubject");

            const studyDate =
                document.getElementById("studyDate");

            const studyTime =
                document.getElementById("studyTime");


            if (
                !studySubject ||
                !studyDate ||
                !studyTime
            ) {
                return;
            }


            const subject =
                studySubject.value;

            const date =
                studyDate.value;

            const time =
                studyTime.value;


            if (
                subject === "" ||
                date === "" ||
                time === ""
            ) {

                alert(
                    "Please fill all study plan details."
                );

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
            displayStudyPlan();

            alert(
                "Study plan saved successfully!"
            );

        }
    );

}


// ======================================================
// DASHBOARD
// ======================================================

function updateDashboard() {


    // Total Tasks
    const totalTasks =
        tasks.length;


    // Completed Tasks
    const completedTasks =
        tasks.filter(function(task) {

            return task.completed;

        }).length;


    // Total Subjects
    const totalSubjects =
        subjects.length;


    // Progress
    let progress = 0;

    if (totalTasks > 0) {

        progress =
            Math.round(
                (completedTasks / totalTasks) * 100
            );

    }


    // Dashboard Elements

    const subjectCount =
        document.getElementById("subjectCount");

    const taskCount =
        document.getElementById("taskCount");

    const completedCount =
        document.getElementById("completedCount");

    const progressCount =
        document.getElementById("progressCount");

    const progressBar =
        document.getElementById("progressBar");


    // Subjects

    if (subjectCount) {

        subjectCount.textContent =
            totalSubjects + " Subjects";

    }


    // Tasks

    if (taskCount) {

        taskCount.textContent =
            totalTasks + " Tasks";

    }


    // Completed

    if (completedCount) {

        completedCount.textContent =
            completedTasks + " Completed";

    }


    // Progress Text

    if (progressCount) {

        progressCount.textContent =
            progress + "% Completed";

    }


    // Progress Bar

    if (progressBar) {

        progressBar.style.width =
            progress + "%";

    }

}
// ======================================================
// DISPLAY SAVED STUDY PLAN
// ======================================================

function displayStudyPlan() {

    const savedPlan =
        JSON.parse(
            localStorage.getItem("studyPlan")
        );

    const planContainer =
        document.getElementById("savedStudyPlan");

    if (!planContainer || !savedPlan) {
        return;
    }

    planContainer.innerHTML = `
        <div class="saved-plan">

            <h3>📖 Your Study Plan</h3>

            <p>
                <strong>Subject:</strong>
                ${savedPlan.subject}
            </p>

            <p>
                <strong>Date:</strong>
                ${savedPlan.date}
            </p>

            <p>
                <strong>Time:</strong>
                ${savedPlan.time}
            </p>

        </div>
    `;
}


// Show saved plan when page opens
displayStudyPlan();

// ======================================================
// INITIAL PAGE LOAD
// ======================================================

displayTasks();

displaySubjects();

updateDashboard();
