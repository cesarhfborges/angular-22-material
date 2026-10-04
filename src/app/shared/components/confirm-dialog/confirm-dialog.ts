import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  imports: [MatDialogContent, MatDialogActions],
  selector: 'app-confirm-dialog',
  styleUrl: './confirm-dialog.scss',
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  title: string | undefined;
  message: string | undefined;
  confirmButtonText = 'Sim';
  cancelButtonText = 'Nao';

  private readonly data = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialog>);

  constructor() {
    if (this.data) {
      if (this.data.message) {
        this.message = this.data.message;
      }
      if (this.data.buttonText) {
        this.confirmButtonText = this.data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = this.data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
