import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  myForm!: FormGroup;
  patchData: any;
  isEdite: any = false;
  constructor(private fb: FormBuilder, public userService: UserService) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.maxLength(2)]],
      phone: [null, Validators.required],
    });

  }

  ngOnInit() {
    this.isEdite = this.userService.isEdit;
    if (this.isEdite) {
      this.patchData = this.userService.editData;
      console.log(this.patchData)
      this.myForm.patchValue({
        name: this.patchData.name,
        email: this.patchData.email,
        age: this.patchData.age,
        phone: this.patchData.phone,
      });
    }
  }

  onSubmit() {
    if (this.isEdite) {
      if (this.myForm.valid) {
        // Get existing users data from local storage
        const existingDataString = localStorage.getItem('users');
        let existingData = existingDataString ? JSON.parse(existingDataString) : [];
  
        // Find the index of the edited user in existingData
        const editedIndex = existingData.findIndex((user: any) => user.id === this.myForm.value.id);
  
        if (editedIndex !== -1) {
          // Update the existing user data
          existingData[editedIndex] = this.myForm.value;
          localStorage.setItem('users', JSON.stringify(existingData));
  
          // Reset the form and exit edit mode
          this.myForm.reset();
          this.isEdite = false;
        } else {
          console.log('User not found for editing.');
        }
      } else {
        console.log('Form is invalid. Please check the fields.');
      }
    } else {
      // Add new user logic (same as before)
      if (this.myForm.valid) {
        const existingDataString = localStorage.getItem('users');
        const existingData = existingDataString ? JSON.parse(existingDataString) : [];
  
        // Assign a unique ID to the new user
        this.myForm.value.id = this.generateUniqueId(existingData);
  
        existingData.push(this.myForm.value);
  
        localStorage.setItem('users', JSON.stringify(existingData));
  
        // Reset the form
        this.myForm.reset();
      } else {
        console.log('Form is invalid. Please check the fields.');
      }
    }
  }
  
  // Function to generate a unique user ID
  generateUniqueId(existingData: any[]): number {
    return existingData.length > 0 ? Math.max(...existingData.map(user => user.id)) + 1 : 1;
  }

  onReset() {
    this.myForm.reset();
  }
}
