export function validText(name) {
  if (name === undefined || name === null || name.trim() === "") {
    return false;
  }
  return true;
}

export function validNumber(number) {
  if (number === null || number < 1) {
    return false;
  }
  return true;
}
