import { BookData, VolumeInfo } from "./book";

export type BookDetails = Pick<BookData, "id" | "saleInfo"> & {
  volumeInfo: Partial<BookDetailsVolumeInfo>;
};

export interface BookDetailsRouteData {
  book: Readonly<BookDetails>;
}

export interface BookDetailsVolumeInfo extends VolumeInfo {
    publisher: string;
    publishedDate: string;
    description: string;
    pageCount: number;
    printType: string;
    categories: string[];
    previewLink: string;
}