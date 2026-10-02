/* ========================================
   STUDENT STUDY PLANNER
   MAIN JAVASCRIPT
======================================== */


/* ========================================
   DATA
======================================== */

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];


let schedules =
    JSON.parse(
        localStorage.getItem("schedules")
    ) || [];


/* ========================================
   PAGE LOAD
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTasks();

        loadSchedules();

        updateDashboardStats();

        loadDarkMode();

    }
);


/* ========================================
   TASK MANAGEMENT
======================================== */


/* Add Task */

function addTask() {

    const input =
        document.getElementById(
            "taskInput"
        );


    const taskText =
        input.value.trim();


    if (taskText === "") {

        alert(
            "Please enter a task."
        );

        return;

    }


    const task = {

        id: Date.now(),

        text: taskText,

        completed: false

    };


    tasks.push(task);


    saveTasks();

    input.value = "";

    loadTasks();

    updateDashboardStats();

}


/* Load Tasks */

function loadTasks() {

    const taskList =
        document.getElementById(
            "taskList"
        );


    if (!taskList) {

        return;

    }


    taskList.innerHTML = "";


    if (tasks.length === 0) {

        taskList.innerHTML =
            `<li class="empty-message">
                No tasks yet. Add your first task!
            </li>`;

        return;

    }


    tasks.forEach(
        function (task) {

            const li =
                document.createElement(
                    "li"
                );


            li.innerHTML = `

                <div class="task-content">

                    <input
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                        onchange="toggleTask(${task.id})"
                    >

                    <span
                        class="${task.completed ? "task-completed" : ""}"
                    >
                        ${escapeHTML(task.text)}
                    </span>

                </div>


                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})"
                >
                    🗑️
                </button>

            `;


            taskList.appendChild(li);

        }
    );

}


/* Complete / Uncomplete Task */

function toggleTask(id) {

    const task =
        tasks.find(
            function (item) {

                return item.id === id;

            }
        );


    if (task) {

        task.completed =
            !task.completed;

    }


    saveTasks();

    loadTasks();

    updateDashboardStats();

}


/* Delete Task */

function deleteTask(id) {

    tasks =
        tasks.filter(
            function (task) {

                return task.id !== id;

            }
        );


    saveTasks();

    loadTasks();

    updateDashboardStats();

}


/* Save Tasks */

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


/* ========================================
   DASHBOARD STATISTICS
======================================== */

function updateDashboardStats() {

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


    const progressFill =
        document.getElementById(
            "progressFill"
        );


    const subjectCount =
        document.getElementById(
            "subjectCount"
        );


    /* Tasks */

    if (taskCount) {

        taskCount.textContent =
            tasks.length +
            (tasks.length === 1
                ? " Task"
                : " Tasks");

    }


    /* Completed */

    const completedTasks =
        tasks.filter(
            function (task) {

                return task.completed;

            }
        ).length;


    if (completedCount) {

        completedCount.textContent =
            completedTasks +
            " Completed";

    }


    /* Progress */

    let progress = 0;


    if (tasks.length > 0) {

        progress =
            Math.round(
                (completedTasks /
                    tasks.length) *
                100
            );

    }


    if (progressCount) {

        progressCount.textContent =
            progress +
            "% Completed";

    }


    if (progressFill) {

        progressFill.style.width =
            progress + "%";

    }


    /* Subjects */

    const uniqueSubjects =
        [
            ...new Set(
                schedules.map(
                    function (item) {

                        return item.subject;

                    }
                )
            )
        ];


    if (subjectCount) {

        subjectCount.textContent =
            uniqueSubjects.length +
            (
                uniqueSubjects.length === 1
                    ? " Subject"
                    : " Subjects"
            );

    }

}


/* ========================================
   STUDY SCHEDULE
======================================== */


/* Add Study Session */

function addSchedule() {

    const subject =
        document.getElementById(
            "subjectInput"
        ).value.trim();


    const date =
        document.getElementById(
            "dateInput"
        ).value;


    const time =
        document.getElementById(
            "timeInput"
        ).value;


    const topic =
        document.getElementById(
            "topicInput"
        ).value.trim();


    /* Validation */

    if (
        subject === "" ||
        date === "" ||
        time === "" ||
        topic === ""
    ) {

        alert(
            "Please fill in all the fields."
        );

        return;

    }


    const schedule = {

        id: Date.now(),

        subject: subject,

        date: date,

        time: time,

        topic: topic

    };


    schedules.push(schedule);


    saveSchedules();

    clearScheduleForm();

    loadSchedules();

    updateDashboardStats();

}


/* Load Schedule */

function loadSchedules() {

    const scheduleList =
        document.getElementById(
            "scheduleList"
        );


    if (!scheduleList) {

        return;

    }


    scheduleList.innerHTML = "";


    if (schedules.length === 0) {

        scheduleList.innerHTML =
            `
            <div class="empty-message">

                📅 No study sessions yet.

                <br>

                Add your first study session above!

            </div>
            `;

        return;

    }


    /* Sort by date and time */

    const sortedSchedules =
        [...schedules].sort(
            function (a, b) {

                const first =
                    new Date(
                        a.date +
                        "T" +
                        a.time
                    );


                const second =
                    new Date(
                        b.date +
                        "T" +
                        b.time
                    );


                return first - second;

            }
        );


    sortedSchedules.forEach(
        function (schedule) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "schedule-item";


            div.innerHTML = `

                <div class="schedule-info">

                    <h3>
                        📚 ${escapeHTML(schedule.subject)}
                    </h3>

                    <p class="schedule-date">
                        📅 ${formatDate(schedule.date)}
                        &nbsp; | &nbsp;
                        ⏰ ${schedule.time}
                    </p>

                    <p>
                        📝 ${escapeHTML(schedule.topic)}
                    </p>

                </div>


                <button
                    class="schedule-delete"
                    onclick="deleteSchedule(${schedule.id})"
                >
                    🗑️ Delete
                </button>

            `;


            scheduleList.appendChild(div);

        }
    );

}


/* Delete Schedule */

function deleteSchedule(id) {

    schedules =
        schedules.filter(
            function (schedule) {

                return schedule.id !== id;

            }
        );


    saveSchedules();

    loadSchedules();

    updateDashboardStats();

}


/* Save Schedule */

function saveSchedules() {

    localStorage.setItem(
        "schedules",
        JSON.stringify(schedules)
    );

}


/* Clear Form */

function clearScheduleForm() {

    document.getElementById(
        "subjectInput"
    ).value = "";


    document.getElementById(
        "dateInput"
    ).value = "";


    document.getElementById(
        "timeInput"
    ).value = "";


    document.getElementById(
        "topicInput"
    ).value = "";

}


/* ========================================
   DATE FORMATTING
======================================== */

function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",

            month: "short",

            year: "numeric"
        }
    );

}


/* ========================================
   DARK MODE
======================================== */

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );


    localStorage.setItem(
        "darkMode",
        isDark
    );

}


/* Load Dark Mode */

function loadDarkMode() {

    const darkMode =
        localStorage.getItem(
            "darkMode"
        );


    if (darkMode === "true") {

        document.body.classList.add(
            "dark-mode"
        );

    }

}


/* ========================================
   SECURITY HELPER
======================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent = text;


    return div.innerHTML;

}
