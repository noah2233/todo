import { ITodo } from '@core/interface';

/* NgRx */
import { Action } from '@ngrx/store';


export enum ActionTypes {
    AddTodo = 'Add Todo'
}

// Action Creators
export class AddTodo implements Action {
    readonly type = ActionTypes.AddTodo;

    constructor(public payload: ITodo) { }
}

// Union the valid types
export type Actions = AddTodo;
