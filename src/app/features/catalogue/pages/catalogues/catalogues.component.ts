import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CatalogueService } from '../../services/catalogue.service';

@Component({
  selector: 'app-catalogues',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.scss']
})
export class CataloguesComponent {

  private catalogueService = inject(CatalogueService);

  books$ = this.catalogueService.books$;
 
}
