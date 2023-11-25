import { isValid } from "date-fns";

export function parseDate(value: string) {
  const parsedDate = Date.parse(value);
  return isValid(parsedDate) ? new Date(parsedDate) : undefined;
}
