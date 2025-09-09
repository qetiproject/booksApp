export interface BookResult<T = BookData> {
  items: T[];
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

export type BooksView = Pick<BookData, 'id'> & {
  title: VolumeInfo['title'];
  authors: VolumeInfo['authors'];
  language: VolumeInfo['language'];
  imageLinks: NonNullable<VolumeInfo['imageLinks']>;
};

export const BookCategories  = {
  Fiction: 'Fiction',
  Science: 'Science',
  Computers: 'Computers',
  BusinessEconomics: 'Business & Economics',
  Character: 'Character'
}as const

export type BookCategory = typeof BookCategories[keyof typeof BookCategories];