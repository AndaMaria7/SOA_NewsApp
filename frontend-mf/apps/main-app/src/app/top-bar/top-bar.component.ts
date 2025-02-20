import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'libs/shared/data-access-user/src/lib/user.model';
import { UserService } from '@frontend-mf/data-access-user';
import { NotificationsComponent } from '../notification/notification.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'ng-mf-top-bar',
  imports: [CommonModule, NotificationsComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  @Input() userConnected!: User;

  showNotifications: boolean = false;
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.listenForNotifications().subscribe((notification) => {
      this.notifications.push(notification);
      console.log("Notification reçue :", notification);
    });
  }

  isUserConnected() {
    return this.userConnected !== null;
  }

  logout() {
    this.userService.logout();  
    this.router.navigateByUrl('login');  
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

}
