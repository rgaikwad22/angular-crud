import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any = [];

  constructor(private router: Router, public userservice: UserService) { }

  ngOnInit() {
    const storedDataString = localStorage.getItem('users');

    if (storedDataString) {
      this.users = JSON.parse(storedDataString);
    }
  }

  deleteUser(index: number): void {
    // Remove the user from the array
    this.users.splice(index, 1);

    // Update local storage with the modified data
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  editUser(index: number): void {
    // Retrieve the user based on the index
    const userToEdit = this.users[index];
    this.userservice.setEditMode(userToEdit, true)
    // Navigate to the edit form with the user data
    this.router.navigate(['/add-user'], { state: { user: userToEdit } });
  }
}
