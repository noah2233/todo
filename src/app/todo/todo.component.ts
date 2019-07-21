import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ITodo } from '../core/interface'
import { TodoStatus } from '../core/enum'
import { TodoService } from './todo.service';

import * as _ from 'lodash';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoForm: FormGroup = this._formBuilder.group({ newTodo: ['', Validators.required] });
  todosStatus: TodoStatus = 0;
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

  addTodo(event, todoForm: FormGroup) {
    // if enter has been pressed and the value is not empty
    if (event.key === 'Enter' && todoForm.valid) {
      const todo: ITodo = { id: null, text: todoForm.get('newTodo').value, status: TodoStatus.uncompleted };

      this._todoService.addTodo(todo).subscribe((result) => {
        const todos: ITodo[] = this.todos;
        todos.push(result);
        this.todos = todos;

        this.todoForm.get('newTodo').reset('', []);
      });
    }
  }

  setTodosStatus(status: TodoStatus) {
    this.todosStatus = status;
  }

  removeTodo(todo: ITodo) {
    this._todoService.removeTodo(todo).subscribe(() => {
      _.remove(this.todos, function (todoItem) {
        return todoItem.id === todo.id;
      });
    });
  }

  toggleComplete(todo: ITodo) {
    const localTodo: ITodo = { id: todo.id, status: todo.status, text: todo.text };
    localTodo.status === TodoStatus.complete ? localTodo.status = TodoStatus.uncompleted : localTodo.status = TodoStatus.complete;

    this._todoService.updateTodo(todo).subscribe(() => {
      // if the update on server was successful
      todo.status = localTodo.status;
    });
  }

  filterTodos(todos: ITodo[], todosStatus: TodoStatus): ITodo[] {
    // if the status is any - return all of the list
    if (todosStatus === 0) {
      return todos;
    }

    return _.filter(todos, (todo: ITodo) => {
      return todo.status === todosStatus;
    });
  }
}
