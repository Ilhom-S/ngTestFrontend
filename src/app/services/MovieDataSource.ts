import { MovieService } from './movie.service';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Movie } from '../Movie';
export class MovieDataSource extends DataSource<any> {
  private moviesSubject = new BehaviorSubject<Movie[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public totalMovies: number;
  public loading$ = this.loadingSubject.asObservable();
  constructor(private movieService: MovieService) {
    super();
  }
  loadMovies(filter: string, sortDirection: string, pageIndex: number) {
    this.loadingSubject.next(true);

    this.movieService
      .findMovies(filter, sortDirection, pageIndex)
      .pipe(
        catchError(() => of([])),
        finalize(() => {
          this.loadingSubject.next(false);
        })
      )
      .subscribe(movies => {
        this.moviesSubject.next(movies);
        this.totalMovies = this.movieService.totalRows;
      });
  }
  getTotalRows() {
    return this.totalMovies;
  }
  connect(): Observable<Movie[]> {
    console.log('Connecting data source');
    return this.moviesSubject.asObservable();
  }
  disconnect() {
    this.moviesSubject.complete();
    this.loadingSubject.complete();
  }
}
