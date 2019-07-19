import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';

import { TodoService } from './todo.service';
import { By } from '@angular/platform-browser';
describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
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

  //   it('on enter click on input - if not empty, create new todo with data on input', () => {
  //     const inputDE = fixture.debugElement.query(By.css('input[name=newTodo]'));
  //     const inputNE = inputDE ? inputDE.nativeElement : null;
  //     console.log(inputDE);
  //   });
});
