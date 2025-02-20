import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.listenForNotifications().subscribe((notification) => {
      this.notifications.push(notification);
      console.log("Notification reçue :", notification);
    });

    console.log("Notifications :", this.notifications);
    
  }
}
