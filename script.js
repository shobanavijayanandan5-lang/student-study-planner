// ======================================================
// STUDENT STUDY PLANNER
// COMPLETE JAVASCRIPT FILE
// ======================================================


// ======================================================
// TASK MANAGER
// ======================================================

// Get task elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


// Get saved tasks from browser
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];


// ======================================================
// DISPLAY TASKS
// ======================================================

function displayTasks() {

    if (!taskList) {
        return;
    }

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


// ======================================================
// SAVE TASKS
// ======================================================

function saveTasks() {

    localStorage.setItem(
        "studyTasks",
        JSON.stringify(tasks)
    );

}


// ======================================================
// ADD TASK
// ======================================================

function addTask() {

    if (!taskInput) {
        return;
    }

    const text = taskInput.value.trim();


    if (text === "") {

        alert("Please enter a task.");

        return;
    }


    // Create new task
    const newTask = {

        text: text,

        completed: false

    };


    // Add task
    tasks.push(newTask);


    // Save task
    saveTasks();


    // Clear input
    taskInput.value = "";


    // Update page
    displayTasks();

    updateDashboard();

}


// ======================================================
// COMPLETE / UNDO TASK
// ======================================================

function completeTask(index) {

    if (!tasks[index]) {
        return;
    }


    tasks[index].completed =
        !tasks[index].completed;


    saveTasks();


    displayTasks();

    updateDashboard();

}


// ======================================================
// DELETE TASK
// ======================================================

function deleteTask(index) {

    if (!tasks[index]) {
        return;
    }


    tasks.splice(index, 1);


    saveTasks();


    displayTasks();

    updateDashboard();

}


// ======================================================
// ADD TASK BUTTON
// ======================================================

if (addTaskBtn) {

    addTaskBtn.addEventListener(
        "click",
        addTask
    );

}


// ======================================================
// PRESS ENTER TO ADD TASK
// ======================================================

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
// SUBJECT MANAGER
// ======================================================


// Get subject elements
const subjectInput =
    document.getElementById("subjectInput");

const addSubjectBtn =
    document.getElementById("addSubjectBtn");

const subjectList =
    document.getElementById("subjectList");


// Get saved subjects
let subjects =
    JSON.parse(
        localStorage.getItem("studySubjects")
    ) || [];


// ======================================================
// DISPLAY SUBJECTS
// ======================================================

function displaySubjects() {

    if (!subjectList) {
        return;
    }


    subjectList.innerHTML = "";


    subjects.forEach(function(subject, index) {

        const li =
            document.createElement("li");


        li.innerHTML = `

            <span>
                ${subject}
            </span>

            <button onclick="deleteSubject(${index})">
                Delete
            </button>

        `;


        subjectList.appendChild(li);

    });

}


// ======================================================
// ADD SUBJECT
// ======================================================

function addSubject() {

    if (!subjectInput) {
        return;
    }


    const subject =
        subjectInput.value.trim();


    if (subject === "") {

        alert("Please enter a subject.");

        return;

    }


    // Add subject
    subjects.push(subject);


    // Save subjects
    localStorage.setItem(
        "studySubjects",
        JSON.stringify(subjects)
    );


    // Clear input
    subjectInput.value = "";


    // Update page
    displaySubjects();

    updateDashboard();

}


// ======================================================
// DELETE SUBJECT
// ======================================================

function deleteSubject(index) {

    if (!subjects[index]) {
        return;
    }


    subjects.splice(index, 1);


    localStorage.setItem(
        "studySubjects",
        JSON.stringify(subjects)
    );


    displaySubjects();

    updateDashboard();

}


// ======================================================
// ADD SUBJECT BUTTON
// ======================================================

if (addSubjectBtn) {

    addSubjectBtn.addEventListener(
        "click",
        addSubject
    );

}


// ======================================================
// INITIAL SUBJECT DISPLAY
// ======================================================

displaySubjects();


// ======================================================
// STUDY PLANNER
// ======================================================


// Get study form
const studyForm =
    document.getElementById("studyForm");


if (studyForm) {

    studyForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const studySubject =
                document.getElementById(
                    "studySubject"
                );


            const studyDate =
                document.getElementById(
                    "studyDate"
                );


            const studyTime =
                document.getElementById(
                    "studyTime"
                );


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


            // Create study plan
            const studyPlan = {

                subject: subject,

                date: date,

                time: time

            };


            // Save study plan
            localStorage.setItem(
                "studyPlan",
                JSON.stringify(studyPlan)
            );


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


    // -------------------------------
    // TASK COUNT
    // -------------------------------

    const totalTasks =
        tasks.length;


    // -------------------------------
    // COMPLETED TASK COUNT
    // -------------------------------

    const completedTasks =
        tasks.filter(
            function(task) {

                return task.completed;

            }
        ).length;


    // -------------------------------
    // PROGRESS
    // -------------------------------

    let progress = 0;


    if (totalTasks > 0) {

        progress =
            Math.round(
                (completedTasks / totalTasks) * 100
            );

    }


    // -------------------------------
    // GET DASHBOARD ELEMENTS
    // -------------------------------

    const taskCount =
        document.getElementById(
            "taskCount"
        );


    const completedCount =
        document.getElementById(
            "completedCount"
        );


    const progressCount =
        document.getElementById(
            "progressCount"
        );


    const progressBar =
        document.getElementById(
            "progressBar"
        );


    const subjectCount =
        document.getElementById(
            "subjectCount"
        );


    // -------------------------------
    // UPDATE TASK COUNT
    // -------------------------------

    if (taskCount) {

        taskCount.textContent =
            totalTasks + " Tasks";

    }


    // -------------------------------
    // UPDATE COMPLETED COUNT
    // -------------------------------

    if (completedCount) {

        completedCount.textContent =
            completedTasks + " Completed";

    }


    // -------------------------------
    // UPDATE PROGRESS TEXT
    // -------------------------------

    if (progressCount) {

        progressCount.textContent =
            progress + "% Completed";

    }


    // -------------------------------
    // UPDATE PROGRESS BAR
    // -------------------------------

    if (progressBar) {

        progressBar.style.width =
            progress + "%";

    }


    // -------------------------------
    // UPDATE SUBJECT COUNT
    // -------------------------------

    if (subjectCount) {

        subjectCount.textContent =
            subjects.length + " Subjects";

    }

}


// ======================================================
// INITIAL PAGE LOAD
// ======================================================


// Display saved tasks
displayTasks();


// Display saved subjects
displaySubjects();


// Update dashboard
updateDashboard();
