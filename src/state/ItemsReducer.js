export function ItemsReducer(state, action) {
  switch (action.type) {
    case "create":
      return onCreate(state, action);
    case "update":
      return onUpdate(state, action);
    case "delete":
      return onDelete(state, action);
    case "initializeArray":
      return onInitializeArray(action);
    default:
      throw new Error("Unhandled action:", action.type);
  }
}

function onCreate(state, action) {
  const newItem = action.payload;
  return [...state, newItem];
}

function onUpdate(state, action) {
  const updatedCourse = action.payload;
  const id = updatedCourse.id;
  const clonedCourses = [...state];
  const itemIndex = clonedCourses.findIndex((item) => item.id === id);
  clonedCourses[itemIndex] = updatedCourse;
  return clonedCourses;
}

function onDelete(state, action) {
  const id = action.payload;
  const clonedUsers = [...state];
  const itemIndex = clonedUsers.findIndex((item) => item.id === id);
  clonedUsers.splice(itemIndex, 1);

  return clonedUsers;
}

function onInitializeArray(action) {
  const newUsers = action.payload;

  return newUsers;
}
