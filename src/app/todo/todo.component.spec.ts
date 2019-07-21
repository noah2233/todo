import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';

import { TodoService } from './todo.service';

import { By } from '@angular/platform-browser';

import { ITodo } from '@core/interface';
import { TodoStatus } from '@core/enum';

import { Observable } from 'rxjs';

import { Ng2PageScrollModule } from 'ng2-page-scroll';

describe('TodoComponent integration test', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule, Ng2PageScrollModule],
      providers: [TodoService],
      declarations: [TodoComponent, TodoListComponent, TodoListItemComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on enter click on input - if not empty, create new todo', () => {
    const inputDE = fixture.debugElement.query(By.css('input[name=newTodo]'));
    const inputNE: HTMLElement = inputDE ? inputDE.nativeElement : null;
    const service = TestBed.get(TodoService);
    component.todoForm.get('newTodo').setValue('newTodo');
    const todo: ITodo = { id: 1, text: component.todoForm.get('newTodo').value, status: TodoStatus.uncompleted };

    spyOn(service, 'addTodo').and.callFake(() => {
      return Observable.from([todo]);
    });

    if (inputNE) {
      inputDE.triggerEventHandler('keyup', { key: 'Enter' });
      const liDE = fixture.debugElement.query(By.css('ul'));

      fixture.detectChanges();

      expect(liDE.children.length).toBe(1);
    }
  });
});
