export interface BookResult {
  items: BookData[];
  totalItems: number;
}

export interface BookData {
  id: string;
  accessInfo: AccessInfo;
  searchInfo: {
    textSnippet: string;
  };
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
}

export interface AccessInfo {
  country: string;
  pdf: Pdf;
  webReaderLink: string;
}

export interface VolumeInfo {
  title: string;
  authors: string[];
  language: string;
  imageLinks: {
    thumbnail: string;
    smallThumbnail: string;
  };
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  printType?: string;
  categories?: string[];
  previewLink?: string;
}

export interface SaleInfo {
  buyLink: string;
  isEbook: boolean;
  saleability: string;
}


export interface Pdf {
  isAvailable: boolean;
  webReaderLink?: string;
}

export interface BooksView {
  id: string;
  title: string;
  authors: string[];
  language: string;
     imageLinks: {
    thumbnail: string;
    smallThumbnail: string;
  };
}

export interface BookDetails {
    id: string;
    saleInfo: SaleInfo;
    volumeInfo: VolumeInfo;
}

export interface BookDetailsRouteData {
  book: BookDetails;
}


// -------------------------------------------------------------------

// export type BookWithId = BookBody & { id: string };

// export interface Book {
//   accessInfo: {
//     country: Country[];
//     pdf: Pdf;
//     webReaderLink: string;
//   };
//   textSnippet: string;
//   volumeInfo: VolumeInfo;
//   saleInfo: SaleInfo;
// }



// export interface BookListItem {
//   data: BookWithId;
//   book: BookResult;
// }

// export interface BookBody {
//   title: string;
//   uid: string;
//   rating: number;
//   review: string;
//   status: Status;
//   whenToRead: WhenToRead;
// }

// export enum Status {
//   Read = 'Read',
//   ReadLater = 'ReadLater',
// }

// export enum WhenToRead {
//   Tomorrow = 'Tomorrow',
//   ThisWeek = 'ThisWeek',
//   ThisMonth = 'ThisMonth',
//   ThisYear = 'ThisYear',
// }


export enum BookCategories {
  Fiction = 'Fiction',
  Science = 'Science',
  Computers = 'Computers',
  BusinessEconomics = 'Business & Economics',
  Character = 'Character'
}