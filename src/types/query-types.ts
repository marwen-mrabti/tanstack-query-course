export type T_Book = {
  id: string | undefined;
  title: string;
  authors: string[];
  thumbnail: string;
  description: string;
};

export type T_Books = T_Book[];

export type T_UpdatePost = {
  title: string | null;
  body: string | null;
};

export type T_Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type T_Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
