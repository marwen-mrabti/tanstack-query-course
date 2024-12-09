export type T_Book = {
  id: string | undefined;
  title: string;
  authors: string[];
  thumbnail: string;
  description: string;
};

export type T_Books = T_Book[];
