export interface User{
    id?: number;
    idUser?: string;
    name:string;
    lastname:string;
    email:string;
    password:string;
    rol:'USER'|'ADMIN';
}