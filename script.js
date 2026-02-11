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
