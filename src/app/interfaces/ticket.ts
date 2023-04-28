import { Movie } from "./movie";
import { User } from "./user";

export interface Ticket {
    id:number;
    movie:Movie;
    user:User;
    amount:number;
}
