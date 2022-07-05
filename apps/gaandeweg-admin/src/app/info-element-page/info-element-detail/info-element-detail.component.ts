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

  /**
   * Constructor for the InfoService.
   * @param {InfoService} infoElementService - The InfoService instance.
   * @param {ActivatedRoute} route - The ActivatedRoute instance.
   * @param {Router} router - The Router instance.
   */
  constructor(
    private infoElementService: InfoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Initializes the component.
   * @returns None
   */
  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: Params) => {
      this.id = +params['id'];
      this.infoElement = await lastValueFrom(
        this.infoElementService.getInfoElement(this.id)
      );
    });
  }

  /**
   * Deletes the info element from the database and navigates the user back to the info element list.
   * @returns None
   */
  onDeleteInfoEelement(): void {
    this.infoElementService.deleteInfoElement(this.id).subscribe(() => {
      this.router.navigate(['/info-element']);
    });
  }
}
