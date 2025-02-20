import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '@frontend-mf/data-access-user';
import { inject } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'ng-mf-login-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
})
export class RemoteEntryComponent {
  private userService = inject(UserService);
  
  email = '';
  password = '';
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  
  isRegisterMode = false; 

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  submit() {
    if (this.isRegisterMode) {
      this.userService.signup(this.email, this.password).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
        },
        error: (error) => {
          console.error('Signup failed:', error);
        }
      });
      
    } else {
      this.userService.login(this.email, this.password).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }
}
