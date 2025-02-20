// add-ad.component.ts
import { Component, Input } from '@angular/core';
import { AdService } from '../services/ad.service';
import { FormsModule } from '@angular/forms';
import { User } from 'libs/shared/data-access-user/src/lib/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ad',
  imports: [FormsModule],
  templateUrl: './add-ad.component.html',
})
export class AddAdComponent {
  @Input() userConnected!: User;

  title: string = '';
  description: string = '';
  category: string = '';
  location: string = '';
  poster_id: string = ''; // L'ID de l'utilisateur (poster_id)

  constructor(
    private adService: AdService,
    private router : Router,
    ) {}

  addAd() {
    const adData = {
      title: this.title,
      description: this.description,
      category: this.category,
      location: this.location,
      poster_id: this.userConnected.id, // À remplacer par l'ID de l'utilisateur connecté
    };

    this.adService.createAd(adData).subscribe(
      (response) => {
        console.log('Ad created successfully:', response);
        this.router.navigateByUrl('list-ad');
      },
      (error) => {
        console.error('Error creating ad:', error);
      }
    );
  }
}
