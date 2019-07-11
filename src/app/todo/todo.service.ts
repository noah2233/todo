import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

import { ITodo } from '../core/interface';

import * as _ from 'lodash';

import { todoStatus } from '@core/enum';

@Injectable()
export class TodoService {
  private _todos: ITodo[] = [];
  private _numberOfIncompleteTodo = 0;
  private todosUrl = 'api/todos';

  set numberOfIncompleteTodo(value: number) {
    if (value >= 0) {
      this._numberOfIncompleteTodo = value;
    }
  }

  get numberOfIncompleteTodo(): number {
    return this._numberOfIncompleteTodo;
  }

  constructor(private _httpClient: HttpClient) {
  }

  getTodos(): Observable<ITodo[]> {
    return this._httpClient.get<ITodo[]>(this.todosUrl).pipe(
      tap(data => console.log('getTodos: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addTodo(todo: ITodo): Observable<ITodo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._httpClient.post<ITodo>(this.todosUrl, todo, { headers: headers })
      .pipe(
        tap(data => console.log('createTodo: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  removeTodo(todo: ITodo): Observable<{}> {
    // _.remove(this._todos, function (todoItem) {
    //   return todoItem.id === todo.id;
    // });

    // if (todo.status === todoStatus.uncompleted) {
    //   this.numberOfIncompleteTodo = this.numberOfIncompleteTodo - 1;
    // }
    // return true;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.todosUrl}/${todo.id}`;
    return this._httpClient.delete<ITodo>(url, { headers: headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + todo.id)),
        catchError(this.handleError)
      );
  }

  toggleComplete(todo: ITodo): boolean {
    todo.status === todoStatus.complete ? this.numberOfIncompleteTodo = this.numberOfIncompleteTodo + 1 :
      this.numberOfIncompleteTodo = this.numberOfIncompleteTodo - 1;
    todo.status === todoStatus.complete ? todo.status = todoStatus.uncompleted : todo.status = todoStatus.complete;

    return true;
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
