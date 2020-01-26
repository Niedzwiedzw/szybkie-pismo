export type Commentary<T> = {
    [key in keyof T & string]: string;
}
