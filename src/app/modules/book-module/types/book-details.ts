import { BookData, VolumeInfo } from "./book";

export type BookDetailsResult = Pick<BookData, "id" | "accessInfo" | "searchInfo" | "saleInfo"> & {
  volumeInfo: BookDetailsVolumeInfo;
}

export type BookDetails = Pick<BookData, "id" | "saleInfo"> & {
  volumeInfo: BookDetailsVolumeInfo;
  // userId: number;
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
    previewLink: string;
}