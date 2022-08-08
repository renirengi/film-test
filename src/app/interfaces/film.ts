export interface IFilm {
  title: string,
  originalTitle?: string,
  id?: number,
  trailer: string,
  year: number,
  directors: string[],
  writers: string[],
  actors: IActor[],
  runtime: string,
  urlPoster: string,
  countries: string[],
  languages: string[],
  genres: string[],
  plot: string,
  urlIMDB: string,
  rated?: string,
  type: string,
  rating: number,
  price: number,
  counts: number
}

export interface IActor {
  name: string,
  photo?: string
}


