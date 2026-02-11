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
