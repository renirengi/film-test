import { IFeedback } from "./feedback";
import { ICelebre } from "./celebre"
export interface IFilm {
  title: string,
  originalTitle?: string,
  id: number,
  trailer: string,
  year: number,
  directors: ICelebre[],
  writers: ICelebre[],
  actors: ICelebre[],
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


