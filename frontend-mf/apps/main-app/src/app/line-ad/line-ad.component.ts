import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'libs/shared/data-access-user/src/lib/user.model';
import { Ad } from '../model/ad.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ng-mf-line-ad',
  imports: [CommonModule],
  templateUrl: './line-ad.component.html',
  styleUrl: './line-ad.component.css',
})
export class LineAdComponent {
  @Input() userConnected!: User;
  @Input() ad!: Ad;

  constructor(
    private router: Router,
  ) {}

  onViewAd() {
    this.router.navigateByUrl(`ad-detail/${this.ad.id}`);
  }

}
