import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  get history() {
    return this.gifsService.history;
  }

  constructor( private gifsService: GifsService ) { }

  search( term: string ) {
    this.gifsService.searchGifs( term );
  }
}
