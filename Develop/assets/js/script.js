// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskNameInputEl = $('#task-name-input');
const taskContentInputEl = $('#task-content-input');
const taskDateInputEl = $('#taskDueDate');

// Todo: create a function to generate a unique task id
function generateTaskId() {
  };

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    $( function() {
        $( "#done-cards" ).draggable();
      } );
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
   event.preventDefault();
   const newTaskName = taskNameInputEl.val();
  const newTaskContent = taskContentInputEl.val();
  const newTaskDate = taskDateInputEl.val();
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
function handleDeleteTask(event){
    const taskId = $(this).attr('data-project-id');
    const tasks = createTaskCard();

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
const tasks = createTaskCard();
const nextId = ui.draggable[0].dataset.projectId;
const newStatus = event.target.id;
for (let task of tasks) {
if (task.id === nextId) {
task.status = newStatus;
}
}
localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
});
projectFormEl.on('submit', handleProjectFormSubmit);
projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);
$('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
$( function() {
  $( "#taskDueDate" ).datepicker();
} );