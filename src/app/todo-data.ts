import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ITodo } from '@core/interface';

import { TodoStatus } from '@core/enum';

export class TodoData implements InMemoryDbService {

    createDb() {
        const todos: ITodo[] = [
            {
                'id': 1,
                status: TodoStatus.uncompleted,
                text: '1'
            },
            {
                'id': 2,
                status: TodoStatus.uncompleted,
                text: '2'
            },
            {
                'id': 3,
                status: TodoStatus.uncompleted,
                text: '5'
            },
            {
                'id': 4,
                status: TodoStatus.complete,
                text: '8'
            },
            {
                'id': 5,
                status: TodoStatus.uncompleted,
                text: '10'
            }
        ];
        return { todos };
    }

    // Overrides the genId method to ensure that a hero always has an id.
    // If the heroes array is empty,
    // the method below returns the initial number (11).
    // if heroes array is not empty, the method below returns the highest
    // hero id + 1.
    genId(todos: ITodo[]): number {
        return todos.length > 0 ? Math.max(...todos.map(hero => hero.id)) + 1 : 1;
    }
}
