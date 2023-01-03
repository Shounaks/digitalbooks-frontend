import { User } from "./User";

export interface Book {
    bookId: number;
    title: string;
    category: string;
    price: number;
    authorId: number;
    publisher: string;
    publishedDate: Date;
    content: string;//should be Hashmap<chapterTitle,COntent>
    blocked: boolean;
}