import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InfoElement, InfoService } from '@gaandeweg-ws/data-access';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  selector: 'gaandeweg-ws-info-element-detail-component',
  templateUrl: './info-element-detail.component.html',
  styleUrls: ['./info-element-detail.component.scss'],
})
export class InfoElementDetailComponent implements OnInit {
  infoElement!: InfoElement;
  id = 0;

  constructor(
    private infoElementService: InfoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: Params) => {
      this.id = +params['id'];
      this.infoElement = await lastValueFrom(
        this.infoElementService.getInfoElement(this.id)
      );
    });
  }

  onDeleteInfoEelement(): void {
    this.infoElementService.deleteInfoElement(this.id).subscribe(() => {
      this.router.navigate(['/info-element']);
    });
  }
}
