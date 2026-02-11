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
