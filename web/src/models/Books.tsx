export type Book = {
  id: number;
  bookState: BookState;
  title: string;
  year: number;
  owner: string;
  lender: string;
};

export type NewBook = {
  isInTheHouse: boolean;
  title: string;
  year: number;
  owner: string;
};

export enum BookState {
  Lent,
  AtTheHouse,
}
