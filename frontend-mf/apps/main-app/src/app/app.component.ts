import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '@frontend-mf/data-access-user';
import { User } from 'libs/shared/data-access-user/src/lib/user.model';
import { distinctUntilChanged } from 'rxjs/operators';
import { NotificationsComponent } from './notification/notification.component';
import { ChatComponent } from './chat/chat.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationsComponent, TopBarComponent],
  selector: 'ng-mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  private router = inject(Router);
  private userService = inject(UserService);
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  userConnected !: User;
  usersList !: any[];

  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl('login');
        } else {

          // Get user data
          let user_id = localStorage.getItem("user_id");
          let token_api = localStorage.getItem("token_api");
          if (user_id !== null) {
            this.userService.getUserById(user_id).subscribe((response: any) => {
              this.userConnected = new User(
                response.id,
                response.email,
                response.password,
              );
              console.log('User connected:', this.userConnected);
            })
          }

          // Get all users
          // let token_api = localStorage.getItem("token_api") as string;
          // if (token_api !== null) {
          //   this.userService.getAllUsers(token_api).subscribe((response: any) => {
          //     this.usersList = response;
          //     console.log('Users list:', this.usersList);
          //   });
          // }

          // console.log('User connected:', this.userConnected);


          this.router.navigateByUrl('list-ad');
        }

      });
  }

  logout() {
    this.userService.logout();  
    this.router.navigateByUrl('login'); 
  }

  isLoginRoute(): boolean {
    return this.router.url.includes('login');
  }

  isUserConnected() {
    return localStorage.getItem("user_id") !== null;
  }

  onOutletLoaded(component: { userConnected: User; }) {
    component.userConnected = this.userConnected;
  }
}