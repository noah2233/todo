/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';

import { TodoService } from './todo.service';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/from';

import { ITodo } from '@core/interface';
import { todoStatus } from '@core/enum';
describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      providers: [TodoService],
      declarations: [TodoComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('initTodos - should call to getTodos and init todos with the results', () => {
    const service = TestBed.get(TodoService);
    const todos: ITodo[] = [{ id: 1, status: todoStatus.uncompleted, text: 'some todo' }];

    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([todos]);
    });

    component.ngOnInit();

    expect(component.todos.length).toBe(1);
  });

  it('addTodo - should call add todo and add the result to the todos', () => {
    const service = TestBed.get(TodoService);

    const todo: ITodo = { id: 1, text: 'new todo', status: todoStatus.uncompleted };

    spyOn(service, 'addTodo').and.callFake(() => {
      return Observable.from([todo]);
    });

    component.addTodo({ keyCode: 13 }, 'new todo');

    expect(component.todos.length).toBe(1);
  });

  it('setTodosStatus - change status of the list to the status that was received', () => {
    component.setTodosStatus(todoStatus.complete);

    expect(component.todosStatus).toBe(todoStatus.complete);
  });

  it('removeTodo - should call remove todo and remove the result from the todos', () => {
    const service = TestBed.get(TodoService);
    const todo: ITodo = { id: 1, text: 'new todo', status: todoStatus.uncompleted };

    component.todos = [{ id: 1, text: 'new todo', status: todoStatus.uncompleted }];

    spyOn(service, 'removeTodo').and.callFake(() => {
      return Observable.from([todo]);
    });

    component.removeTodo(todo);

    expect(component.todos.length).toBe(0);
  });

  it('toggleComplete - change the todo status to its inverse', () => {
    const todo: ITodo = { id: 1, text: 'new todo', status: todoStatus.uncompleted };

    component.toggleComplete(todo);

    expect(todo.status).toBe(todoStatus.complete);
  });
});
