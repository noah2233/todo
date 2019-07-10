import { Injectable } from '@angular/core';
import { ITodo } from '../core/interface';
import * as _ from 'lodash';
import { todoStatus } from '@core/enum';

@Injectable()
export class TodoService {
  private _todos: ITodo[] = [];
  private _numberOfIncompleteTodo = 0;
  private todosUrl = 'api/todos';

  set numberOfIncompleteTodo(value: number) {
    if (value >= 0) {
      this._numberOfIncompleteTodo = value;
    }
  }

  get numberOfIncompleteTodo(): number {
    return this._numberOfIncompleteTodo;
  }

  constructor() {
  }

  getTodos(): ITodo[] {
    return this._todos;
  }

  addTodo(todoValue: string): ITodo {
    const todo: ITodo = { id: new Date().getTime(), text: todoValue, status: todoStatus.uncompleted };
    this._todos.push(todo);
    this.numberOfIncompleteTodo = this.numberOfIncompleteTodo + 1;

    return todo;
  }

  removeTodo(todo: ITodo): boolean {
    _.remove(this._todos, function (todoItem) {
      return todoItem.id === todo.id;
    });

    if (todo.status === todoStatus.uncompleted) {
      this.numberOfIncompleteTodo = this.numberOfIncompleteTodo - 1;
    }
    return true;
  }

  toggleComplete(todo: ITodo): boolean {
    todo.status === todoStatus.complete ? this.numberOfIncompleteTodo = this.numberOfIncompleteTodo + 1 :
      this.numberOfIncompleteTodo = this.numberOfIncompleteTodo - 1;
    todo.status === todoStatus.complete ? todo.status = todoStatus.uncompleted : todo.status = todoStatus.complete;

    return true;
  }

}
