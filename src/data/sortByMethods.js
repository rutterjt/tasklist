export const sortByMethods = {
  default: (a, b) => 0,
  alphabetically: (a, b) => (a.name < b.name ? -1 : 1),
  dueDate: (a, b) => {
    if (!b.due) return -1;
    if (!a.due) return 1;
    return a.due - b.due;
  },
  priority: (a, b) => a.priority - b.priority,
  dateAdded: (a, b) => 0,
};
