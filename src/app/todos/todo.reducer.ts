import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, limpiarTodos } from './todo.actions';
import { Todo } from './models/todo.model';


export const initialState: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a thanos'),
    new Todo('Comparar traje de ironman'),
    new Todo('Robar escudo del capitan america')
];

export const _todoReducer = createReducer(initialState,
    on(crear, (state, { texto }) => [...state, new Todo( texto )]),
    on(borrar, (state, { id }) => state.filter( todo => todo.id !== id)),
    on(toggle, (state, { id }) => {
        return state.map( todo => {
            if( todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }
        });
    }),
    on(editar, (state, { id, texto }) => {
        return state.map( todo => {
            if( todo.id === id) {
                return {
                    ...todo,
                    texto: texto
                }
            } else {
                return todo;
            }
        });
    }),
    on(toggleAll, (state, { completado }) => {
        return state.map( todo => {
                return {
                    ...todo,
                    completado: completado
                }
        });
    }),
    on(limpiarTodos, (state) => state.filter( todo => !todo.completado)),
);


export function todoReducer(state: any, action: any) {
    return _todoReducer(state, action);
}