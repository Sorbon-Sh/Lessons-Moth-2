export interface IUser {
    email: string;
    password: string;
}


export interface ITasks {
    name: string;
    title: string;
    completed: boolean;
    date: string;
    userId: number;
    id: number;
}