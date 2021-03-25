import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey     : string = 'lXeglDrGOquHO5b0HuWT2f3ZzJUTlRAN';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _history : string[] = [];
  public results: {title: string, url: string}[] = [];

  get history() {
    return [...this._history];
  }

  constructor( private http: HttpClient ) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs( query: string = '' ) {
    query = query.trim().toLocaleLowerCase();
    if( !this._history.includes( query ) ) {
      this._history.unshift( query );
      this._history = this._history.splice(0,10);
      localStorage.setItem('history', JSON.stringify( this._history )  );
    }
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '12')
          .set('q', query );
    this.http.get<SearchGifsResponse>(`${ this.serviceUrl }/search`, { params } )
      .subscribe( ( resp ) => {
        this.results = [];
        resp.data.forEach((aux: Gif) => {
          this.results.push({
            title: aux.title,
            url: aux.images.downsized_medium.url
          });
        });
        localStorage.setItem('results', JSON.stringify( this.results ) );
      });
  }
  
}
