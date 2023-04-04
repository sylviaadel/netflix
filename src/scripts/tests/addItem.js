export function validText(name) {
  if (name === undefined || name === null || name.trim() === "") {
    return false;
  }
  return true;
}
