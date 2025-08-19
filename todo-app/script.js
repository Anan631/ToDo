const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        deleteTask(event.target);
    } else if (event.target.classList.contains('complete-checkbox')) {
        toggleComplete(event.target);
    }
});
 document.addEventListener('DOMContentLoaded',loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
     createTaskElement(taskText, false);
     saveTasks();
    taskInput.value = '';
}

function toggleComplete(checkbox) {
    const taskItem = checkbox.parentElement;
    taskItem.classList.toggle('completed');
    saveTasks();
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('.task-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}   
function createTaskElement(text, completed) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (completed) taskItem.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('complete-checkbox');
    checkbox.checked = completed;

    const label = document.createElement('span');
    label.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');

    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}