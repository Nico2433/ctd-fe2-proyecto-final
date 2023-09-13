export interface Inews {
  id: number;
  title: string;
  description: string;
  date: Date;
  isPremium: boolean;
  image: string;
}

export interface InormalizedNews extends Inews {
  normalizedDate: number | string;
  isPremium: boolean;
  image: string;
  shortDescription?: string;
}
