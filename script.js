const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item ${task.priority}`;
    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" class="toggle" />
        <strong>${task.text}</strong> <br/>
        <small>Due: ${task.dueDate || 'N/A'} | Priority: ${task.priority}</small>
      </label>
      <div class="task-controls">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = document.getElementById('task-input').value.trim();
  const dueDate = document.getElementById('due-date').value;
  const priority = document.getElementById('priority').value;
  if (text) {
    tasks.push({ text, dueDate, priority, completed: false });
    saveTasks();
    renderTasks();
    form.reset();
  } else {
    alert('Task cannot be empty!');
  }
});

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt('Edit your task:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

taskList.addEventListener('change', e => {
  if (e.target.classList.contains('toggle')) {
    const index = e.target.dataset.index;
    tasks[index].completed = e.target.checked;
    saveTasks();
    renderTasks();
  }
});

renderTasks();
