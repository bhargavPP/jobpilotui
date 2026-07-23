import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApplicationService } from '../../services/application.service';
import { ApplicationSummary } from '../../models/application.models';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  private readonly applicationService = inject(ApplicationService);
  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  applications: ApplicationSummary[] = [];

  loading = true;
 
 

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;

    this.applicationService
      .getApplications()
      .subscribe({
        next: apps => {

          //console.log('before:'+this.loading);
          this.applications = apps;
          this.loading = false;
          this.cdr.markForCheck();

        },
        error: () => {
          this.loading = false;
        }
      });
  }

  delete(id: string): void {

    if (!confirm('Delete this application?'))
      return;

    this.applicationService
      .deleteApplication(id)
      .subscribe(() => this.loadApplications());
  }

  getStatusClass(status: any): string {
    switch (status) {
      case 0:
        return 'status-applied';
      case 1:
        return 'status-interview';
      case 2:
        return 'status-offer';
      case 3:
        return 'status-rejected';
      default:
        return 'status-default';
    }
  }
  getStatusText(status: any): string {
    switch (status) {
      case 0:
        return 'Applied';
      case 1:
        return 'Interview';
      case 2:
        return 'Offer';
      case 3:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }
}
