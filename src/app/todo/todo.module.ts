import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TodoComponent} from './todo.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoListItemComponent} from './todo-list-item/todo-list-item.component';

import {TodoService} from './todo.service';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoListItemComponent
  ],
  exports: [
    TodoComponent,
    TodoListComponent,
    TodoListItemComponent
  ],
  providers: [TodoService]
})
export class TodoModule {
}
