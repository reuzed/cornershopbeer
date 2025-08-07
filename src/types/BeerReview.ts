// types/BeerReview.ts
export interface BeerReview {
  favourite: boolean;
  rating: string; // using string to bind input value easily
  description: string;
  date: string; // ISO date string
}
