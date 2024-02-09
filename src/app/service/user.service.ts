// src/app/user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  editData : any;
  isEdit: any;
  constructor() {
  }

  setEditMode(userToEdit: any, isEdite: boolean): void {
    this.editData = userToEdit;
    this.isEdit = isEdite;
  }
}
