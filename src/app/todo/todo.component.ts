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
  todoForm: FormGroup = this._formBuilder.group({ newTodo: ['', []] });
  todosStatus: todoStatus = 0;
  _showTodosListFooter = true;
  private _todos: ITodo[] = [];

  get todos(): ITodo[] {
    const todos: ITodo[] = this._todos;
    this._showTodosListFooter = this._todos.length > 0;

    // if the status is any - return all of the list
    if (this.todosStatus === 0) {
      return todos;
    }

    return _.filter(todos, (todo: ITodo) => {
      return todo.status === this.todosStatus;
    });
  }

  set todos(todos: ITodo[]) {
    this._todos = todos;
  }

  get numberOfIncompleteTodo(): number {
    return this._todoService.numberOfIncompleteTodo;
  }

  get showTodosListFooter(): boolean {
    return this._showTodosListFooter;
  }

  constructor(
    private _todoService: TodoService,
    private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initTodos();
  }

  initTodos() {
    this._todoService.getTodos().subscribe((result) => {
      this.todos = result;
    })
  }

  addTodo(event) {
    const todoValue = this.todoForm.get('newTodo').value;

    // if enter has been pressed
    if (event.keyCode === 13 && todoValue !== '') {
      const todo: ITodo = { id: new Date().getTime(), text: todoValue, status: todoStatus.uncompleted };

      this._todoService.addTodo(todo).subscribe((result) => {
        const todos: ITodo[] = this._todos;
        todos.push(result);
        this._todos = todos;

        this.todoForm.get('newTodo').reset('', []);
      });
    }
  }

  setTodosStatus(status: todoStatus): boolean {
    this.todosStatus = status;
    return true;
  }

}
