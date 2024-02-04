import { Maybe } from "../../core/utils/types";

export interface PaginatedResponse<T> {
  items: Maybe<T[]>;
  offset: Maybe<number>;
  total: Maybe<number>;
}
