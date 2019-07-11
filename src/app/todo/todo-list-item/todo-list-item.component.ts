import { Component, OnInit, AfterViewInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { ITodo } from '@core/interface';
import { todoStatus } from '@core/enum';

import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

@Component({
  selector: 'todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent implements OnInit, AfterViewInit {
  @Input() todo: ITodo;
  @Output() removeTodoEvent = new EventEmitter<ITodo>();
  @Output() toggleCompleteEvent = new EventEmitter<ITodo>();

  get status(): todoStatus {
    return this.todo.status;
  }

  constructor(
    private _pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private _document: any) {
  }

  ngOnInit() { }

  ngAfterViewInit() {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this._document, '#' + this.todo.id.toString());
    this._pageScrollService.start(pageScrollInstance);
  }

  removeTodo() {
    this.removeTodoEvent.emit(this.todo);
  }

  toggleComplete() {
    this.toggleCompleteEvent.emit(this.todo);
  }

}
