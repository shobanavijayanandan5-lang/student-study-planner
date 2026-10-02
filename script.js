/* ========================================
   STUDENT STUDY PLANNER
   SCRIPT.JS
======================================== */


/* ========================================
   PAGE LOAD
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayTasks();

        displaySubjects();

        updateDashboardStats();

    }
);


/* ========================================
   TASKS
======================================== */


/* Add Task */

function addTask() {

    const taskInput =
        document.getElementById("taskInput");


    if (!taskInput) {
        return;
    }


    const taskText =
        taskInput.value.trim();


    if (taskText === "") {

        alert(
            "Please enter a task."
        );

        return;
    }


    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    const newTask = {

        text: taskText,

        completed: false

    };


    tasks.push(newTask);


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    taskInput.value = "";


    displayTasks();

    updateDashboardStats();

}


/* Display Tasks */

function displayTasks() {

    const taskList =
        document.getElementById(
            "taskList"
        );


    if (!taskList) {
        return;
    }


    taskList.innerHTML = "";


    const tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    if (tasks.length === 0) {

        const message =
            document.createElement("li");


        message.textContent =
            "No tasks yet. Add your first task!";


        taskList.appendChild(message);


        return;
    }


    tasks.forEach(
        function (task, index) {

            const li =
                document.createElement("li");


            const taskText =
                document.createElement("span");


            taskText.textContent =
                (
                    task.completed
                        ? "✅ "
                        : "⬜ "
                ) + task.text;


            taskText.style.cursor =
                "pointer";


            if (task.completed) {

                taskText.style.textDecoration =
                    "line-through";

                taskText.style.color =
                    "#888";

            }


            taskText.onclick =
                function () {

                    toggleTask(index);

                };


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.textContent =
                "Delete";


            deleteButton.className =
                "delete-btn";


            deleteButton.onclick =
                function () {

                    deleteTask(index);

                };


            li.appendChild(
                taskText
            );


            li.appendChild(
                deleteButton
            );


            taskList.appendChild(
                li
            );

        }
    );

}


/* Complete / Uncomplete Task */

function toggleTask(index) {

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    if (!tasks[index]) {
        return;
    }


    tasks[index].completed =
        !tasks[index].completed;


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayTasks();

    updateDashboardStats();

}


/* Delete Task */

function deleteTask(index) {

    let tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    tasks.splice(index, 1);


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    displayTasks();

    updateDashboardStats();

}


/* ========================================
   SUBJECTS
======================================== */


/* Add Subject */

function addSubject() {

    const subjectInput =
        document.getElementById(
            "subjectInput"
        );


    if (!subjectInput) {
        return;
    }


    const subjectName =
        subjectInput.value.trim();


    if (subjectName === "") {

        alert(
            "Please enter a subject."
        );

        return;
    }


    let subjects =
        JSON.parse(
            localStorage.getItem(
                "subjects"
            )
        ) || [];


    subjects.push(subjectName);


    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    subjectInput.value = "";


    displaySubjects();

    updateDashboardStats();

}


/* Display Subjects */

function displaySubjects() {

    const subjectList =
        document.getElementById(
            "subjectList"
        );


    if (!subjectList) {
        return;
    }


    subjectList.innerHTML = "";


    const subjects =
        JSON.parse(
            localStorage.getItem(
                "subjects"
            )
        ) || [];


    if (subjects.length === 0) {

        const message =
            document.createElement("li");


        message.textContent =
            "No subjects yet. Add your first subject!";


        subjectList.appendChild(
            message
        );


        return;
    }


    subjects.forEach(
        function (subject, index) {

            const li =
                document.createElement(
                    "li"
                );


            const name =
                document.createElement(
                    "span"
                );


            name.textContent =
                "📚 " + subject;


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.textContent =
                "Delete";


            deleteButton.className =
                "delete-btn";


            deleteButton.onclick =
                function () {

                    deleteSubject(index);

                };


            li.appendChild(name);

            li.appendChild(deleteButton);


            subjectList.appendChild(li);

        }
    );

}


/* Delete Subject */

function deleteSubject(index) {

    let subjects =
        JSON.parse(
            localStorage.getItem(
                "subjects"
            )
        ) || [];


    subjects.splice(index, 1);


    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    displaySubjects();

    updateDashboardStats();

}


/* ========================================
   DASHBOARD STATISTICS
======================================== */

function updateDashboardStats() {


    /* Get Tasks */

    const tasks =
        JSON.parse(
            localStorage.getItem("tasks")
        ) || [];


    /* Get Subjects */

    const subjects =
        JSON.parse(
            localStorage.getItem("subjects")
        ) || [];


    /* Task Information */

    const totalTasks =
        tasks.length;


    const completedTasks =
        tasks.filter(
            function (task) {

                return task.completed;

            }
        ).length;


    const pendingTasks =
        totalTasks -
        completedTasks;


    /* Progress */

    let progress = 0;


    if (totalTasks > 0) {

        progress =
            Math.round(
                (
                    completedTasks /
                    totalTasks
                ) * 100
            );

    }


    /* Subject Count */

    const subjectCount =
        document.getElementById(
            "subjectCount"
        );


    if (subjectCount) {

        subjectCount.textContent =
            subjects.length +
            (
                subjects.length === 1
                    ? " Subject"
                    : " Subjects"
            );

    }


    /* Pending Tasks */

    const pendingCount =
        document.getElementById(
            "pendingCount"
        );


    if (pendingCount) {

        pendingCount.textContent =
            pendingTasks +
            (
                pendingTasks === 1
                    ? " Pending Task"
                    : " Pending Tasks"
            );

    }


    /* Today's Plan */

    const todayCount =
        document.getElementById(
            "todayCount"
        );


    if (todayCount) {

        todayCount.textContent =
            totalTasks +
            (
                totalTasks === 1
                    ? " Task Planned"
                    : " Tasks Planned"
            );

    }


    /* Progress */

    const progressCount =
        document.getElementById(
            "progressCount"
        );


    if (progressCount) {

        progressCount.textContent =
            progress +
            "% Completed";

    }

}
/* ========================================
   STUDY SCHEDULE
======================================== */


/* Add Schedule */

function addSchedule() {

    const subject =
        document.getElementById(
            "scheduleSubject"
        ).value.trim();


    const topic =
        document.getElementById(
            "scheduleTopic"
        ).value.trim();


    const date =
        document.getElementById(
            "scheduleDate"
        ).value;


    const time =
        document.getElementById(
            "scheduleTime"
        ).value;


    if (
        subject === "" ||
        topic === "" ||
        date === "" ||
        time === ""
    ) {

        alert(
            "Please fill in all schedule details."
        );

        return;
    }


    let schedules =
        JSON.parse(
            localStorage.getItem(
                "schedules"
            )
        ) || [];


    const newSchedule = {

        subject: subject,

        topic: topic,

        date: date,

        time: time

    };


    schedules.push(newSchedule);


    localStorage.setItem(
        "schedules",
        JSON.stringify(schedules)
    );


    document.getElementById(
        "scheduleSubject"
    ).value = "";


    document.getElementById(
        "scheduleTopic"
    ).value = "";


    document.getElementById(
        "scheduleDate"
    ).value = "";


    document.getElementById(
        "scheduleTime"
    ).value = "";


    displaySchedules();

}


/* Display Schedule */

function displaySchedules() {

    const scheduleList =
        document.getElementById(
            "scheduleList"
        );


    if (!scheduleList) {
        return;
    }


    scheduleList.innerHTML = "";


    const schedules =
        JSON.parse(
            localStorage.getItem(
                "schedules"
            )
        ) || [];


    if (schedules.length === 0) {

        const message =
            document.createElement("p");


        message.textContent =
            "No study sessions planned yet.";


        message.style.color =
            "#666";


        scheduleList.appendChild(
            message
        );


        return;
    }


    schedules.forEach(
        function (schedule, index) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "schedule-item";


            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "schedule-info";


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                "📚 " +
                schedule.subject;


            const topic =
                document.createElement(
                    "p"
                );


            topic.textContent =
                "📝 " +
                schedule.topic;


            const date =
                document.createElement(
                    "p"
                );


            date.textContent =
                "📅 " +
                schedule.date +
                "  ⏰ " +
                schedule.time;


            info.appendChild(title);

            info.appendChild(topic);

            info.appendChild(date);


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.textContent =
                "Delete";


            deleteButton.className =
                "delete-btn";


            deleteButton.onclick =
                function () {

                    deleteSchedule(index);

                };


            item.appendChild(info);

            item.appendChild(
                deleteButton
            );


            scheduleList.appendChild(
                item
            );

        }
    );

}


/* Delete Schedule */

function deleteSchedule(index) {

    let schedules =
        JSON.parse(
            localStorage.getItem(
                "schedules"
            )
        ) || [];


    schedules.splice(index, 1);


    localStorage.setItem(
        "schedules",
        JSON.stringify(schedules)
    );


    displaySchedules();

}
