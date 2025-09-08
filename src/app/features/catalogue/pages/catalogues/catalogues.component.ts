import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddBooktoCatalogueComponent } from '../../components/add-bookto-catalogue/add-bookto-catalogue.component';

@Component({
  selector: 'app-catalogues',
  standalone: true,
  imports: [CommonModule, AddBooktoCatalogueComponent],
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.scss']
})
export class CataloguesComponent {

}
