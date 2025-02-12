import { NgFor, AsyncPipe } from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injectable,
} from '@angular/core';
import { UsersApiService } from './users-api-service';
import { UserCardComponent } from './user-card/user-card.component';
import { TodosApiService } from '../todos-list/todos-api.service';
import { CreateUserFormComponent } from '../components/create-user-form/create-user-form.component';
import { State, Store } from '@ngrx/store';
import { selectUsers } from './state/users.selectors';
import { userActions } from './state/user.actions';
import { CreateUser } from '../interfaces/user.interface';

Injectable();

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent,],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);
  private readonly store = inject (Store);
  public readonly users$ = this.store.select(selectUsers);
  constructor() {
    this.usersApiService.getUsers().subscribe((response: any) => {
      this.store.dispatch(userActions.set({users: response}));
    });
  }
  
  deleteUser(id: number) {
    this.store.dispatch(userActions.delete({ id }));
  }

  public createUser(user: CreateUser) {
    this.store.dispatch(userActions.create({ user }));
}
}

