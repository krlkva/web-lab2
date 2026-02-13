const STATUSES = ['', 'new', 'in progress', 'done'];

let taskList = [
  { id: 1, name: 'Закрыть допсу', date: "2026-02-25", status: 2 },
  { id: 2, name: 'Веб лаба 3', date: "2026-02-12", status: 1 },
  { id: 3, name: 'Веб лаба 2', date: "2026-02-10", status: 2 },
  { id: 4, name: 'Веб лаба 1', date: "2026-02-09", status: 3 },
  { id: 5, name: 'Сходить в спортзал', date: "2026-02-10", status: 1 },
  { id: 6, name: 'Забрать заказ на вб', date: "2026-02-08", status: 3 },
  { id: 7, name: 'Упаковать подарок на день рождения', date: "2026-02-09", status: 3 },
  { id: 8, name: 'ДЗ по английскому', date: "2026-02-12", status: 1 },
  { id: 9, name: 'Йога', date: "2026-02-18", status: 1 },
  { id: 10, name: 'Отнести телефон в сервис', date: "2026-02-08", status: 2 },
]; 

let sorttype = "date";
let nameFilter = "";
let statusFilter = [1, 1, 0];

// SORTING FUNCTIONS
function compareID(a, b) {
  if (a.id > b.id) return 1;
  if (a.id < b.id) return -1;
  return 0;
}

function compareIDInv(a, b) {
  if (a.id < b.id) return 1;
  if (a.id > b.id) return -1;
  return 0;
}

function compareDate(a, b) {
  if (a.date > b.date) return 1;
  if (a.date < b.date) return -1;
  return 0;
}

function compareDateInv(a, b) {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
}

function compareStatus(a, b) {
  if (a.status < b.status) return 1;
  if (a.status > b.status) return -1;
  return 0;
}

function compareStatusInv(a, b) {
  if (a.status < b.status) return -1;
  if (a.status > b.status) return 1;
  return 0;
}

function getSortedTaskList(sorttype) {
  let sortedTaskList = structuredClone(taskList);
  switch (sorttype) {
    case "date":
      sortedTaskList = sortedTaskList.sort(compareDate);
      break;
    case "dateinv":
      sortedTaskList = sortedTaskList.sort(compareDateInv);
      break;
    case "id":
      sortedTaskList = sortedTaskList.sort(compareID);
      break;
    case "idinv":
      sortedTaskList = sortedTaskList.sort(compareIDInv);
      break;
    default:
      sortedTaskList = sortedTaskList.sort(compareID);
  }
  return sortedTaskList;
}

// ADD TASK
function addTask() {
  let data = new FormData(task_form);
  let highestID = 0;
  if (taskList.length > 0) {
    let sortedTaskList = getSortedTaskList('idinv');
    highestID = sortedTaskList[0].id;
  }
  
  taskList.push({
    id: highestID + 1,
    name: data.get('task-name'), 
    date: data.get('task-date'),
    status: 1
  });
  
  updateTasks();
  
  // Очистка формы
  task_form.querySelector('input[name="task-name"]').value = '';
  task_form.querySelector('input[name="task-date"]').value = '';
}

// REMOVE TASK
function removeTask(id) {
  let item = taskList.find(item => item.id === parseInt(id));
  if (item === undefined) return;
  
  let n = taskList.indexOf(item);
  taskList.splice(n, 1);
  updateTasks();
}

// EDIT TASK
function updateTask(id, event) {
  let item = taskList.find(item => item.id === parseInt(id));
  if (item === undefined) return;
  
  const data = new FormData(event.target);
  if (data.get('name') != '') {
    item.name = data.get('name');
  }
  if (data.get('date') != '') {
    item.date = data.get('date');
  }
  updateTasks();
}

function createEditForm(task, taskElem) {
  if (document.body.classList.contains('stop-scrolling')) return;
  
  let edit_form_container = document.createElement('div');
  edit_form_container.classList.add('edit-form-container');
  document.body.appendChild(edit_form_container);
  document.body.classList.add('stop-scrolling');

  let edit_form = document.createElement('form');
  edit_form.id = 'edit_form' + task.id;
  edit_form_container.appendChild(edit_form);

  let edit_form_close = document.createElement('button');
  edit_form_close.type = 'button';
  edit_form_close.textContent = 'Закрыть';
  edit_form.appendChild(edit_form_close);
  
  edit_form_close.addEventListener('click', () => {
    taskElem.classList.remove('form-opened');
    removeEditForm();
    document.body.classList.remove('stop-scrolling');
  });

  let edit_form_name = document.createElement('input');
  edit_form_name.type = 'text';
  edit_form_name.name = 'name';
  edit_form_name.value = task.name;
  edit_form.appendChild(edit_form_name);

  let edit_form_date = document.createElement('input');
  edit_form_date.type = 'date';
  edit_form_date.name = 'date';
  edit_form_date.value = task.date;
  edit_form.appendChild(edit_form_date);

  let edit_form_submit = document.createElement('input');
  edit_form_submit.type = 'submit';
  edit_form_submit.value = 'Сохранить изменения';
  edit_form.appendChild(edit_form_submit);

  edit_form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    updateTask(task.id, event);
    removeEditForm();
    document.body.classList.remove('stop-scrolling');
  });
}

function removeEditForm() {
  const forms = document.getElementsByClassName('edit-form-container');
  while (forms.length > 0) {
    forms[0].parentNode.removeChild(forms[0]);
  }
}

// CHANGE STATUS
function changeTaskStatus(id, newStatus) {
  let item = taskList.find(item => item.id === parseInt(id));
  if (item === undefined) return;
  
  item.status = newStatus;
  updateTasks();
}

// PAGE SETUP
document.addEventListener('DOMContentLoaded', function() {
   // Создание структуры страницы
  const page = document.body;
  const header = document.createElement('header');
  const main = document.createElement('main');
  const footer = document.createElement('footer');
  
  page.appendChild(header);
  page.appendChild(main);
  page.appendChild(footer);

  // Шапка
  const header_nav = document.createElement('nav');
  header.appendChild(header_nav);
  const header_nav_list = document.createElement('ul');
  header_nav.appendChild(header_nav_list);
  header_nav_list.style.listStyle = 'none';
  header_nav_list.style.display = 'flex';
  header_nav_list.style.justifyContent = 'center';

  const header_logo = document.createElement('li');
  header_nav_list.appendChild(header_logo);
  const header_title = document.createElement('h1');
  header_title.textContent = "ToDo List";
  header_title.className = 'site-name';
  header_logo.appendChild(header_title);

  // Подвал
  const footer_text = document.createElement('span');
  footer_text.textContent = 'ToDo List 2026';
  footer.appendChild(footer_text);

  // Основной контейнер
  const main_container = document.createElement('div');
  main_container.classList.add('main-container');
  main.appendChild(main_container);
});

  // Форма добавления задачи
  const add_task_window = document.createElement('section');
  add_task_window.classList.add('add-task-window');
  main_container.appendChild(add_task_window);

  const task_form = document.createElement('form');
  task_form.classList.add('task-form');
  add_task_window.appendChild(task_form);

  const task_form_heading = document.createElement('h2');
  task_form_heading.textContent = 'Добавить новую задачу';
  task_form.appendChild(task_form_heading);

  const task_form_name = document.createElement('div');
  task_form.appendChild(task_form_name);
  const task_form_name_label = document.createElement('label');
  task_form_name_label.textContent = 'Название:';
  task_form_name_label.htmlFor = 'task-name';
  task_form_name.appendChild(task_form_name_label);
  const task_form_name_input = document.createElement('input');
  task_form_name_input.type = 'text';
  task_form_name_input.name = 'task-name';
  task_form_name_input.required = true;
  task_form_name_input.placeholder = 'Введите название задачи';
  task_form_name.appendChild(task_form_name_input);

  const task_form_date = document.createElement('div');
  task_form.appendChild(task_form_date);
  const task_form_date_label = document.createElement('label');
  task_form_date_label.textContent = 'Дата:';
  task_form_date_label.htmlFor = 'task-date';
  task_form_date.appendChild(task_form_date_label);
  const task_form_date_input = document.createElement('input');
  task_form_date_input.type = 'date';
  task_form_date_input.name = 'task-date';
  task_form_date_input.required = true;
  task_form_date.appendChild(task_form_date_input);

  const task_form_submit = document.createElement('input');
  task_form_submit.type = 'submit';
  task_form_submit.value = 'Добавить задачу';
  task_form.appendChild(task_form_submit);
  
    task_form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    addTask();
  });

  window.task_form = task_form;

  // Окно задач
  const task_window = document.createElement('section');
  task_window.classList.add('task-window');
  main_container.appendChild(task_window);

  // Список задач
  const task_list = document.createElement('ul');
  task_list.classList.add('task-list');
  task_window.appendChild(task_list);
  
  updateTasks();

// TASKS DISPLAY
function updateTasks() {
  localStorage.setItem('tasklist-test', JSON.stringify(taskList)); 
  listTasks();
}

function listTasks() {
  let listUL = document.querySelector('.task-list');
  if (!listUL) return;
  
  let listUL_clone = listUL.cloneNode(false);
  let sortedTaskList = getSortedTaskList(sorttype);
  
  for (let task of sortedTaskList) {
    let taskElem = document.createElement('li');
    taskElem.setAttribute('index', task.id);
    setTaskDOM(task, taskElem);
    setTaskListeners(task, taskElem);
    listUL_clone.appendChild(taskElem);
  }
  
  listUL.parentNode.replaceChild(listUL_clone, listUL);
}

function setTaskDOM(task, taskElem) {
  let task_card = document.createElement('div');
  task_card.classList.add('task__card');
  taskElem.appendChild(task_card);

  let task_info = document.createElement('div');
  task_info.classList.add('task__info');
  task_card.appendChild(task_info);
  
  let task_name = document.createElement('span');
  task_name.textContent = task.name;
  task_name.title = task.name;
  task_info.appendChild(task_name);
  
  let task_date = document.createElement('span');
  task_date.textContent = task.date;
  task_info.appendChild(task_date);

  let task_status_form = document.createElement('form');
  task_status_form.classList.add('task-status__form');
  task_card.appendChild(task_status_form);
  
  let task_status_fieldset = document.createElement('fieldset');
  task_status_form.appendChild(task_status_fieldset);

  let task_status_legend = document.createElement('legend');
  task_status_legend.textContent = 'Статус';
  task_status_fieldset.appendChild(task_status_legend);

  // Новые
  let task_status_new = document.createElement('div');
  task_status_fieldset.appendChild(task_status_new);
  let task_status_new_input = document.createElement('input');
  task_status_new_input.type = 'radio';
  task_status_new_input.name = 'task-status';
  task_status_new_input.id = 'task-status__new-' + task.id;
  task_status_new_input.value = 1;
  task_status_new.appendChild(task_status_new_input);
  let task_status_new_label = document.createElement('label');
  task_status_new_label.htmlFor = 'task-status__new-' + task.id;
  task_status_new_label.textContent = 'новые';
  task_status_new.appendChild(task_status_new_label);

  // В процессе
  let task_status_inprogress = document.createElement('div');
  task_status_fieldset.appendChild(task_status_inprogress);
  let task_status_inprogress_input = document.createElement('input');
  task_status_inprogress_input.type = 'radio';
  task_status_inprogress_input.name = 'task-status';
  task_status_inprogress_input.id = 'task-status__inprogress-' + task.id;
  task_status_inprogress_input.value = 2;
  task_status_inprogress.appendChild(task_status_inprogress_input);
  let task_status_inprogress_label = document.createElement('label');
  task_status_inprogress_label.htmlFor = 'task-status__inprogress-' + task.id;
  task_status_inprogress_label.textContent = 'в процессе';
  task_status_inprogress.appendChild(task_status_inprogress_label);

  // Выполнено
  let task_status_done = document.createElement('div');
  task_status_fieldset.appendChild(task_status_done);
  let task_status_done_input = document.createElement('input');
  task_status_done_input.type = 'radio';
  task_status_done_input.name = 'task-status';
  task_status_done_input.id = 'task-status__done-' + task.id;
  task_status_done_input.value = 3;
  task_status_done.appendChild(task_status_done_input);
  let task_status_done_label = document.createElement('label');
  task_status_done_label.htmlFor = 'task-status__done-' + task.id;
  task_status_done_label.textContent = 'выполнено';
  task_status_done.appendChild(task_status_done_label);

  // Устанавливаем активный статус
  switch (task.status) {
    case 1:
      task_status_new_input.checked = true;
      taskElem.classList.add('task-container_new');
      task_card.classList.add('task-status_new');
      break;
    case 2:
      task_status_inprogress_input.checked = true;
      taskElem.classList.add('task-container_inprogress');
      task_card.classList.add('task-status_inprogress');
      break;
    case 3:
      task_status_done_input.checked = true;
      taskElem.classList.add('task-container_done');
      task_card.classList.add('task-status_done');
      break;
  }

  let task_buttons = document.createElement('div');
  task_buttons.classList.add('task__buttons');
  task_bottom.appendChild(task_buttons);

  let task_edit = document.createElement('button');
  task_edit.classList.add('task__edit-btn');
  task_edit.textContent = 'Редактировать';
  task_buttons.appendChild(task_edit);

  let task_remove = document.createElement('button');
  task_remove.classList.add('task__remove-btn');
  task_remove.textContent = 'Удалить';
  task_buttons.appendChild(task_remove);
  
  let task_bottom = document.createElement('div');
  task_bottom.classList.add('task__bottom');
  task_card.appendChild(task_bottom);

  let task_id = document.createElement('span');
  task_id.textContent = '#' + task.id;
  task_bottom.appendChild(task_id);
}

// TASK LISTENERS
function setTaskListeners(task, taskElem) {
  taskElem.querySelector('.task__edit-btn').addEventListener('click', () => {
    if (taskElem.classList.contains('form-opened')) {
      removeEditForm();
      taskElem.classList.remove('form-opened');
    } else {
      createEditForm(task, taskElem);
      taskElem.classList.add('form-opened');
    }
  });

  taskElem.querySelector('.task__remove-btn').addEventListener('click', () => {
    removeTask(task.id);
  });
}
    taskElem.querySelector('#task-status__new-' + task.id).addEventListener('change', () => {
    changeTaskStatus(task.id, 1);
  });
  
  taskElem.querySelector('#task-status__inprogress-' + task.id).addEventListener('change', () => {
    changeTaskStatus(task.id, 2);
  });
  
  taskElem.querySelector('#task-status__done-' + task.id).addEventListener('change', () => {
    changeTaskStatus(task.id, 3);
  });
