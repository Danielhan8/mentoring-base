import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { MatSnackBar, } from '@angular/material/snack-bar';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosApiService } from './todos-api.service';

import { CreateTodoFormComponent } from '../components/create-todo-form/create-todo-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ITodo } from '../interfaces/todo.interface';
import { State, Store } from '@ngrx/store';
import { todoActions } from './state-todos/todo.actions';
import { selectTodos } from './state-todos/todos.selectors';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  standalone: true,
  imports: [NgFor, TodoCardComponent, AsyncPipe, CreateTodoFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);

  readonly snackBar = inject(MatSnackBar);
  private readonly store = inject(Store);
  public readonly todos$ = this.store.select(selectTodos);

  constructor() {
    this.todosApiService.getTodos().subscribe((response: any) =>  {
        this.store.dispatch(todoActions.set({todos: response}))});
    }

    deleteTodo(id: number) {
      this.store.dispatch(todoActions.delete({ id }))
    };
  
 createITodo(todo:ITodo) {
      this.store.dispatch(todoActions.create({ todo }));
  };
    
//   @Output()
//   editTodo = new EventEmitter<ITodo>();

//   @Output()
//   deleteTodo = new EventEmitter<ITodo>();

//   readonly dialog = inject(MatDialog);

  
}
