import { Component, OnInit, AfterViewInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { ITodo } from '../../core/interface';
import { todoStatus } from '../../core/enum';
import { TodoService } from '../todo.service';

import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

@Component({
  selector: 'todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit, AfterViewInit {
  @Input() todo: ITodo;
  status: todoStatus = todoStatus.uncompleted;

  constructor(private _todoService: TodoService, private _pageScrollService: PageScrollService, @Inject(DOCUMENT) private _document: any) {
  }

  ngOnInit() {
    this.status = this.todo.status;
  }

  ngAfterViewInit() {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this._document, '#' + this.todo.id.toString());
    this._pageScrollService.start(pageScrollInstance);
  }

  removeTodo(): boolean {
    this._todoService.removeTodo(this.todo);
    return true;
  }

  toggleComplete(): boolean {
    this.status === todoStatus.complete ? this.status = todoStatus.uncompleted : this.status = todoStatus.complete;
    this._todoService.toggleComplete(this.todo);

    return true;
  }

}
