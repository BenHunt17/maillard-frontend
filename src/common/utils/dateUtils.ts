import { isValid } from "date-fns";

export function parseDate(value: string | undefined) {
  if (!value) {
    return undefined;
  }
  const parsedDate = Date.parse(value);
  return isValid(parsedDate) ? new Date(parsedDate) : undefined;
}
