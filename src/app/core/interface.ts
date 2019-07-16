import { TodoStatus } from './enum';

export interface ITodo {
  id: number;
  text: string;
  status: TodoStatus;
}
