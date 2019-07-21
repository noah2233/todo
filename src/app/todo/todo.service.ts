import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { ITodo } from '../core/interface';

import * as _ from 'lodash';

@Injectable()
export class TodoService {
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
      tap(data => console.log('get Todos: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addTodo(todo: ITodo): Observable<ITodo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._httpClient.post<ITodo>(this.todosUrl, todo, { headers: headers })
      .pipe(
        tap(data => console.log('create Todo: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  removeTodo(todo: ITodo): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.todosUrl}/${todo.id}`;

    return this._httpClient.delete<ITodo>(url, { headers: headers })
      .pipe(
        tap(() => console.log('delete Todo: ' + todo.id)),
        catchError(this.handleError)
      );
  }

  updateTodo(todo: ITodo): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.todosUrl}/${todo.id}`;

    return this._httpClient.put<ITodo>(url, todo, { headers: headers })
      .pipe(
        tap(() => console.log('update Todo: ' + todo.id)),
        catchError(this.handleError)
      );
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
