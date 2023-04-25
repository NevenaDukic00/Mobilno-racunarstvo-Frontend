import { Genre } from "./genre";

export interface Movie {
    id:number;
    title:string;
    genre:Genre;
    description:string;
    date:Date;
    duration:string;
    image:string;
    price:number;
    rating:number;
}
