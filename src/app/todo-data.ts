import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ITodo } from '@core/interface';

import { todoStatus } from '@core/enum';

export class TodoData implements InMemoryDbService {

    createDb() {
        const todos: ITodo[] = [
            {
                'id': 1,
                status: todoStatus.uncompleted,
                text: '1'
            },
            {
                'id': 2,
                status: todoStatus.uncompleted,
                text: '2'
            },
            {
                'id': 5,
                status: todoStatus.uncompleted,
                text: '5'
            },
            {
                'id': 8,
                status: todoStatus.complete,
                text: '8'
            },
            {
                'id': 10,
                status: todoStatus.uncompleted,
                text: '10'
            }
        ];
        return { todos };
    }
}
