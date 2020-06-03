export const colors = ['#8b0000', '#f00', '#ff8c00', '#7cfc00', '#008000'];

export function getProp(val) {
  return getIndex(val).toString();
}

export function getColor(val) {
  return colors.reverse()[getIndex(val) - 1];
}

function getIndex(val) {
  if (val > 50) {
    return 5;
  }
  if (val > 10) {
    return 4;
  }

  if (val < -50) {
    return 1;
  }
  if (val < -10) {
    return 2;
  }
  return 3;
}
