import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { environment } from '../../../environments/environment';
import { ConfirmDialog } from '../../shared/components/confirm-dialog/confirm-dialog';
import { DynamicAttrDirective } from '../../shared/directives/dynamic-attr.directive';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatCheckbox,
    DynamicAttrDirective,
    MatIcon,
    MatDivider,
  ],
  selector: 'app-auth',
  styleUrl: './auth.scss',
  templateUrl: './auth.html',
})
export class Auth {
  isDarkMode: boolean = false;

  form: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);
  // private readonly snackBar = inject(MatSnackBar);

  constructor() {
    this.form = this.fb.nonNullable.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false, [Validators.required]],
    });

    if (!environment.production) {
      this.form.patchValue({
        username: 'cesar.borges@trt.rn.br',
        password: 'fg76sdf76g78sdf6g',
        remember: false,
      });
    }
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.log('Invalido !');
      return;
    }

    console.log('Valido !');
  }

  logarComGov() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        message: 'Deseja efetuar login com sua conta do GOV.BR ?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar',
        },
      },
    });
    // const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        window.alert('Abrindo');
        // href="https://sso.acesso.gov.br"
        // target="_parent"
        // snack.dismiss();
        // const a = document.createElement('a');
        // a.click();
        // a.remove();
        // snack.dismiss();
        // this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
        //   duration: 2000,
        // });
      }
    });
  }
}
