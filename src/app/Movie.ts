export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rated?: string;
  Released?: Date;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Response: string;
}

interface IMovieListResult {
  Search: Movie[];
  totalResults: number;
  Response: string;
}

export class MovieListResult implements IMovieListResult {
  public Search: Movie[];
  public totalResults: number;
  public Response: string;
}
