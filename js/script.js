const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const filterSelect = document.getElementById("filterSelect");
const taskList = document.getElementById("taskList");

let tasks = [];
let filterMode = "all"; // all | completed | pending

function renderTasks() {
  taskList.innerHTML = "";

  // filter task sesuai mode
  let filteredTasks = tasks.filter(task => {
    if (filterMode === "completed") return task.done;
    if (filterMode === "pending") return !task.done;
    return true; // default: all
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
    return;
  }

  filteredTasks.forEach(task => {
    const realIndex = tasks.indexOf(task); // index asli di array utama
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task.text}</td>
      <td>${task.date}</td>
      <td>${task.done ? "✅ Completed" : "❌ Pending"}</td>
      <td>
        <button onclick="toggleTask(${realIndex})">
          ${task.done ? "Mark as Pending" : "Mark as Done"}
        </button>
        <button onclick="deleteTask(${realIndex})">Delete</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (text === "" || date === "") return alert("Please enter task and date");

  tasks.push({ text, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
});

// 🔥 Tambah dengan Enter
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addBtn.click();
});

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

deleteAllBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

// 🔥 Update filter ketika select berubah
filterSelect.addEventListener("change", () => {
  filterMode = filterSelect.value;
  renderTasks();
});

// first render
renderTasks();