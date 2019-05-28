import { todoStatus } from './enum';

export interface ITodo {
  id: number;
  text: string;
  status: todoStatus;
}
