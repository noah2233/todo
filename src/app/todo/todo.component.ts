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
  public todos: ITodo[] = [];

  get showFooter(): boolean {
    return this.todos.length > 0 ? true : false;
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
    }, error => {
      alert('some thing want wrong!');
    });
  }

  addTodo(event, todoValue: string) {
    // if enter has been pressed and the value is not empty
    if (event.keyCode === 13 && todoValue !== '') {
      const todo: ITodo = { id: null, text: todoValue, status: todoStatus.uncompleted };

      this._todoService.addTodo(todo).subscribe((result) => {
        const todos: ITodo[] = this.todos;
        todos.push(result);
        this.todos = todos;

        this.todoForm.get('newTodo').reset('', []);
      });
    }
  }

  setTodosStatus(status: todoStatus) {
    this.todosStatus = status;
  }

  removeTodo(todo: ITodo) {
    this._todoService.removeTodo(todo).subscribe((result) => {
      _.remove(this.todos, function (todoItem) {
        return todoItem.id === todo.id;
      });
    })
  }

  toggleComplete(todo: ITodo) {
    todo.status === todoStatus.complete ? todo.status = todoStatus.uncompleted : todo.status = todoStatus.complete;
  }

  filterTodos() {
    const todos: ITodo[] = this.todos;
    // if the status is any - return all of the list
    if (this.todosStatus === 0) {
      return todos;
    }

    return _.filter(todos, (todo: ITodo) => {
      return todo.status === this.todosStatus;
    });
  }
}
