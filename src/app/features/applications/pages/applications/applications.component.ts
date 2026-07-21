import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ApplicationService } from '../../services/application.service';
import { ApplicationSummary } from '../../models/application.models';

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
          
          this.applications = apps;
          this.loading = false;
       
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
}
