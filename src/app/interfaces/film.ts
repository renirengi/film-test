import { IFeedback } from "./feedback";

export interface IFilm {
  title: string,
  originalTitle?: string,
  id: number,
  trailer: string,
  year: number,
  directors: number[],
  writers: number[],
  actors: number[],
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
  feedback: IFeedback []
}


