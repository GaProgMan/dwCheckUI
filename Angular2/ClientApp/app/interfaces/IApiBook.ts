export interface IApiBook {
    bookId: number;
    bookOrdinal: number;
    bookCoverImage: string;
    bookImageIsBase64String: boolean;
    bookDescription: string;
    bookIsbn10: string;
    bookIsbn13: string;
    bookName: string;
    characters: string[];
    series: { [key: number]: string };
}