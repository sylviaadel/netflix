export function validText(name) {
  if (name === undefined || name === null || name.trim() === "") {
    return false;
  }
  return true;
}

export function validNum(number) {
  if (number === null || number < 1) {
    return false;
  }
  return true;
}

export function validMatch(number) {
  if (number === null || number < 1 || number > 100) {
    return false;
  }
  return true;
}
