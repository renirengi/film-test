export interface IFeedback {
  id: number;
  userId: number;
  filmId: number;
  movieRating?: number;
  text: string;
}
