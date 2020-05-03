'use strict';

const pendingList = document.querySelector('#todo_pending'),
  finishedList = document.querySelector('#todo_finished'),
  form = document.querySelector('#todo_input_wrap'),
  input = form.querySelector('#todo_input');

const PENDING = 'PENDING';
const CHECK = 'CHECK';

let pendingTasks,
  checkList = [];

const getTaskObject = (text) => {
  return {
    id: String(Date.now()),
    text,
  };
};

const savePending = (task) => {
  pendingTasks.push(task);
};

const removePending = (taskId) => {
  pendingTasks = pendingTasks.filter(function (task) {
    return task.id !== taskId;
  });
};

const addToPending = (task) => {
  pendingTasks.push(task);
};

const deleteTask = (event) => {
  const button = event.target.parentNode;
  const li = button.parentElement;
  if (li.id === 'todo_pending') return;
  li.parentNode.removeChild(li);
  removePending(li.id);
  saveState();
};

const handleFinishClick = (event) => {
  const button = event.target.parentNode;
  const li = button.parentElement;
  if (li.id === 'todo_pending') return;
  if (li.classList.contains('todo_finished')) {
    li.classList.remove('todo_finished');
    if (checkList.includes(li.id)) {
      const delIndex = checkList.indexOf(li.id);
      checkList.splice(delIndex, 1);
    }
  } else {
    li.classList.add('todo_finished');
    checkList.push(li.id);
  }

  saveState();
};

const buildGenericList = (task) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('span');
  span.innerText = task.text;
  deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
  deleteBtn.addEventListener('click', deleteTask);
  li.append(span, deleteBtn);
  li.id = task.id;
  if (checkList.includes(li.id)) {
    li.classList.add('todo_finished');
  }
  return li;
};

const paintPending = (task) => {
  const genericLi = buildGenericList(task);
  const completeBtn = document.createElement('span');
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.addEventListener('click', handleFinishClick);
  genericLi.append(completeBtn);
  pendingList.append(genericLi);
};

const saveState = () => {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(CHECK, JSON.stringify(checkList));
};

const loadState = () => {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  checkList = JSON.parse(localStorage.getItem(CHECK)) || [];
};

const restoreState = () => {
  pendingTasks.forEach(function (task) {
    paintPending(task);
  });
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  if (input.value.trim() === '') return;
  const taskObj = getTaskObject(input.value);
  input.value = '';
  paintPending(taskObj);
  savePending(taskObj);
  saveState();
};

function init() {
  form.addEventListener('submit', handleFormSubmit);
  loadState();
  restoreState();
}
init();
