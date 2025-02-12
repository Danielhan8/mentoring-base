import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EditUserDialogComponent } from './EDIT-USER-DIALOG/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { CustomUpperCasePipe } from '../../Pipes/upper-case.pipe';
import { RedDirective } from '../../directives/red.directive';
import { ShadowDirective } from '../../directives/shadow-card.directive';
import { Store } from '@ngrx/store';
import { userActions } from '../state/user.actions';
import { User } from '../../interfaces/user.interface';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    CustomUpperCasePipe,
    RedDirective,
    ShadowDirective,
  ],
})
export class UserCardComponent {
  private readonly store = inject (Store);
  @Input()
  user!: User;

  @Output()
  editUser = new EventEmitter();

  @Output()
  deleteUser = new EventEmitter();
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  public openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe((result: boolean | undefined) => {
      if (result) {
        this.deleteUser.emit(this.user);
        this.snackBar.open('Удаление завершено', 'Ок', {
          duration: 10000,
          horizontalPosition: 'center', // Положение по горизонтали
          verticalPosition: 'bottom',
        });
      } else
        this.snackBar.open('Отмена удаления', 'Ок', {
          duration: 10000,
          horizontalPosition: 'right', 
          verticalPosition: 'bottom',
        });
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user: this.user }, 
    });
    dialogRef.afterClosed().subscribe((user: User) => 
    { this.store.dispatch(userActions.edit({ user}));})
  }
}
