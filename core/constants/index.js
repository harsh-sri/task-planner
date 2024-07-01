export const TASK_STATUS_DONE = Symbol("done");
export const TASK_STATUS_CREATED = Symbol("created");

// ["Create", "List", "Remove", "Update", "Exit"];

export const CREATE_MENU = Symbol("Create");
export const LIST_MENU = Symbol("LIST");
export const REMOVE_MENU = Symbol("REMOVE");
export const UPDATE_MENU = Symbol("UPDATE");
export const EXIT_MENU = Symbol("EXIT");

export const MENU_CHOICES = [
  CREATE_MENU,
  LIST_MENU,
  REMOVE_MENU,
  UPDATE_MENU,
  EXIT_MENU,
];
