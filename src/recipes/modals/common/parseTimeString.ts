export function parseTimeString(value: string) {
  if (value.length !== 5) {
    return undefined;
  }

  const hours = parseInt(value.substring(0, 2));
  const minutes = parseInt(value.substring(3, 5));
  if (isNaN(hours) || isNaN(minutes)) {
    return undefined;
  }

  return hours * 60 + minutes;
}
