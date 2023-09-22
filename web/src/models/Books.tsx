
export type Book = {
    id : number;
    isInTheHouse: boolean;
    title: string;
    year: number;
    owner: string
}

export type NewBook = {
    isInTheHouse: boolean;
    title: string;
    year: number;
    owner: string;
}

export enum BookField {
    Title,
    Year,
    isInTheHouse,
    Owner,
}