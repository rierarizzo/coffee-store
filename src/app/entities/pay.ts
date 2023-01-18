import { Product } from "./products";
import { User } from "./users";

export interface Pay {
    user: User;
    product: Product[];
    numTar: string;
    cvv: string;
}