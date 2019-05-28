import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ITodo } from '../core/interface'
import { todoStatus } from '../core/enum'
import { TodoService } from './todo.service';

import * as _ from 'lodash';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  todosStatus: todoStatus = 0;
  _showTodosListFooter = true;

  get todos(): ITodo[] {
    let todos: ITodo[] = this._todoService.getTodos();
    this._showTodosListFooter = todos.length > 0;

    // if the status is any - return all of the list
    if (this.todosStatus === 0) {
      return todos;
    }

    return _.filter(todos, (todo: ITodo) => {
      return todo.status === this.todosStatus;
    });
  }

  get numberOfIncompleteTodo(): number {
    return this._todoService.numberOfIncompleteTodo;
  }

  get showTodosListFooter(): boolean {
    return this._showTodosListFooter;
  }

  constructor(private _todoService: TodoService, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildTodoForm();
  }

  buildTodoForm(): void {
    this.todoForm = this._formBuilder.group({
      newTodo: ['', []]
    });
  }

  addTodo(event): boolean {
    const newTodo = this.todoForm.get('newTodo').value;

    // if enter has been pressed
    if (event.keyCode === 13 && newTodo !== '') {
      const todo: ITodo = this._todoService.addTodo(newTodo);

      this.todoForm.get('newTodo').reset('', []);
    }
    return true;
  }

  setTodosStatus(status: todoStatus): boolean {
    this.todosStatus = status;
    return true;
  }

}
