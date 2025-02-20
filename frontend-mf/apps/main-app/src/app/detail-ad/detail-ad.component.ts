import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ad } from '../model/ad.model';
import { AdService } from '../services/ad.service';
import { ActivatedRoute } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { User } from 'libs/shared/data-access-user/src/lib/user.model';
import { UserService } from '@frontend-mf/data-access-user';


@Component({
  selector: 'ng-mf-detail-ad',
  imports: [CommonModule, ChatComponent],
  templateUrl: './detail-ad.component.html',
  styleUrl: './detail-ad.component.css',
})
export class DetailAdComponent implements OnInit {
  userConnected!: User;
  ad!: Ad;

  constructor(
    private adService: AdService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {} 
  
  ngOnInit() {
    // Get user data
    let user_id = localStorage.getItem("user_id");
    if (user_id !== null) {
      this.userService.getUserById(user_id).subscribe((response: any) => {
        this.userConnected = new User(
          response.id,
          response.email,
          response.password,
        );
        console.log('User connecteddddddddddd DETAIL ADDDD:', this.userConnected);
      })
    }

    this.route.params.subscribe(() => {
      let adId = this.route.snapshot.params["id"];

      this.adService.getAdById(adId).subscribe((ad) => {
        this.ad = ad;
        console.log(" AD Detaiiiiiiil:" + this.ad);
        
      });
    });
  }

}
