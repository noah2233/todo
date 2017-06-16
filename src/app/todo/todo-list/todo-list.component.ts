import {Component, OnInit, Input} from '@angular/core';
import {ITodo} from "../../shared/interface";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: ITodo[];

  constructor() {
  }

  ngOnInit() {
  }

}
