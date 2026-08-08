// =============================
// Get HTML Elements
// =============================

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");

// =============================
// Load Saved Tasks
// =============================

window.onload = function () {
    loadTasks();
};

// =============================
// Add Task
// =============================

function addTask() {

    let task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    createTask(task);

    taskInput.value = "";

    saveTasks();

    updateCount();
}

// =============================
// Create Task
// =============================

function createTask(taskText) {

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.innerText = taskText;

    let actions = document.createElement("div");
    actions.className = "actions";

    // Done Button
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "✔";
    doneBtn.className = "done";

    doneBtn.onclick = function () {

        span.classList.toggle("completed");

        saveTasks();

    };

    // Edit Button
    let editBtn = document.createElement("button");
    editBtn.innerText = "✏";
    editBtn.className = "edit";

    editBtn.onclick = function () {

        let newTask = prompt("Edit Task", span.innerText);

        if (newTask !== null && newTask.trim() !== "") {

            span.innerText = newTask;

            saveTasks();

        }

    };

    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "🗑";
    deleteBtn.className = "delete";

    deleteBtn.onclick = function () {

        li.remove();

        saveTasks();

        updateCount();

    };

    actions.appendChild(doneBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);

}

// =============================
// Clear All
// =============================

function clearAll() {

    if (confirm("Delete all tasks?")) {

        taskList.innerHTML = "";

        saveTasks();

        updateCount();

    }

}

// =============================
// Update Counter
// =============================

function updateCount() {

    taskCount.innerText = taskList.children.length;

}

// =============================
// Save Tasks
// =============================

function saveTasks() {

    localStorage.setItem("tasks", taskList.innerHTML);

}

// =============================
// Load Tasks
// =============================

function loadTasks() {

    taskList.innerHTML = localStorage.getItem("tasks") || "";

    restoreButtons();

    updateCount();

}

// =============================
// Restore Button Functions
// =============================

function restoreButtons() {

    let items = taskList.querySelectorAll("li");

    items.forEach(function (li) {

        let span = li.querySelector("span");

        let buttons = li.querySelectorAll("button");

        // Done
        buttons[0].onclick = function () {

            span.classList.toggle("completed");

            saveTasks();

        };

        // Edit
        buttons[1].onclick = function () {

            let newTask = prompt("Edit Task", span.innerText);

            if (newTask !== null && newTask.trim() !== "") {

                span.innerText = newTask;

                saveTasks();

            }

        };

        // Delete
        buttons[2].onclick = function () {

            li.remove();

            saveTasks();

            updateCount();

        };

    });

}
