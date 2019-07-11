import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from '@core/interface';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: ITodo[];
  @Output() removeTodoEvent = new EventEmitter<ITodo>();

  constructor() {
  }

  ngOnInit() {
  }

  removeTodo(todo: ITodo) {
    this.removeTodoEvent.emit(todo);
  }

}
