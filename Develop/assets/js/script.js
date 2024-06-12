// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskNameInputEl = $('#task-name-input');
const taskContentInputEl = $('#task-content-input');
const taskDateInputEl = $('#taskDueDate');
const formModalEl = $('#formModal');
const taskFormEl = $('#form-modal');
const saveBtn = $('#save-btn');

function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
        tasks = [];
    }
    return tasks;
}
function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Todo: create a function to generate a unique task id
function generateTaskId() {
 return crypto.randomUUID()
    
};
// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-project-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.type);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-project-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }
    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);
    return taskCard;
}
// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of tasks) {
        if (task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
            const original = $(e.target).hasClass('ui-draggable')
                ? $(e.target)
                : $(e.target).closest('.ui-draggable');
            return original.clone().css({
                width: original.outerWidth(),
            });
        },
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();
    const newTask = {
        id: crypto.randomUUID(),
        name: newTaskName,
        content: newTaskContent,
        dueDate: newTaskDate,
        status: 'to-do',
    };
    const tasks = createTaskCard();
    tasks.push(newTask);
}


// Todo: create a function to handle deleting a task
function handleDeleteTask() {
    const taskId = $(this).attr('data-project-id');
    const tasks = readTasksFromStorage();
    tasks.forEach((task) => {
        if (task.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    saveTasksToStorage(tasks);
    renderTaskList();
}
function handleProjectFormSubmit(event) {
    event.preventDefault();

    const taskName = taskNameInputEl.val().trim();
    const taskContent = taskContentInputEl.val();
    const taskDate = taskDateInputEl.val();

    const newTask = {
        id: generateTaskId(),
        name: taskName,
        content: taskContent,
        dueDate: taskDate,
        status: 'to-do',
    };
    const tasks = readTasksFromStorage();
    tasks.push(newTask);
    saveTasksToStorage(tasks);
    renderTaskList();
    taskNameInputEl.val('');
    taskContentInputEl.val('');
    taskDateInputEl.val('');
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const taskId = ui.draggable[0].dataset.projectId;
    const newStatus = event.target.id;
    for (let task of tasks) {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}
formModalEl.on('submit', handleProjectFormSubmit);
formModalEl.on('click', '.btn-delete-project', handleDeleteTask);

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
saveBtn.on('click', handleProjectFormSubmit);
    renderTaskList();

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

    $(function () {
        $("#taskDueDate").datepicker();
    });
});


