export interface BookResult {
  items: BookData[];
  totalItems: number;
}

export interface BookData {
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
}

export interface SaleInfo {
  buyLink: string;
  isEbook: boolean;
  saleability: string;
}


export interface Pdf {
  isAvailable: boolean;
}

export interface BooksView {
  title: string;
  authors: string[];
  language: string;
     imageLinks: {
    thumbnail: string;
    smallThumbnail: string;
  };
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