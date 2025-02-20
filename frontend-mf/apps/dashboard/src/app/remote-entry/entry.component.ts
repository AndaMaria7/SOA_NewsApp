import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [CommonModule],
  selector: 'ng-mf-dashboard-entry',
  template: `<h1>Dashboard</h1>`,
})
export class RemoteEntryComponent {}
