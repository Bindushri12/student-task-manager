
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

// Load saved tasks from the browser
let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

// Save tasks in the browser
function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

// Display tasks on the page
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const details = document.createElement("div");
        details.className = "task-details";

        const name = document.createElement("span");
        name.className = "task-name";
        name.textContent = task.name;
        details.appendChild(name);

        if (task.date) {
            const date = document.createElement("span");
            date.className = "task-date";
            date.textContent = "Deadline: " + task.date;
            details.appendChild(date);
        }

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeBtn = document.createElement("button");
        completeBtn.className = "complete-btn";
        completeBtn.textContent = task.completed ? "Undo" : "Complete";

        completeBtn.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(details);
        li.appendChild(actions);
        taskList.appendChild(li);
    });

    totalTasks.textContent = tasks.length;

    completedTasks.textContent = tasks.filter(function(task) {
        return task.completed;
    }).length;

    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

// Add a new task
function addTask() {
    const name = taskInput.value.trim();

    if (name === "") {
        alert("Please enter a task first!");
        taskInput.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        name: name,
        date: taskDate.value,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskInput.focus();
}

// Button click adds a task
addTaskBtn.addEventListener("click", addTask);

// Pressing Enter also adds a task
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Show saved tasks when the page opens
displayTasks();
