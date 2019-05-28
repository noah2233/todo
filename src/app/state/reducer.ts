import { ITodo } from '@core/interface';

export interface State {
    todos: ITodo[];
}

const initialState: State = {
    todos: []
};

export function reducer(state = initialState, action): State {
    switch (action.type) {
        default:
            return state;
    }
}
