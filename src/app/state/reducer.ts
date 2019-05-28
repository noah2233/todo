import { ITodo } from '@core/interface';

export interface State {
    todos: ITodo[];
}

const initialState: State = {
    todos: []
};

export function reducer(state = initialState, action): State {
    switch (action.type) {
        case 'addTodo':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        default:
            return state;
    }
}
