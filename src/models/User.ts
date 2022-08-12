import { TodoModel } from "./TodoModel";

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  password?: string;
  list?: TodoModel[];
}
