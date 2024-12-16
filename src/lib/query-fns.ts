import {
  T_Book,
  T_Books,
  T_MockBook,
  T_Photo,
  T_Post,
} from "@/types/query-types";

export const BASE_URL = "https://library-api.uidotdev.workers.dev";

export const getBookDetails = async ({
  bookId,
  searchTerm,
}: {
  bookId?: string;
  searchTerm?: string;
}): Promise<T_Book | undefined> => {
  try {
    if (!bookId && !searchTerm) {
      throw new Error("Book ID or search term is required");
    }
    if (bookId) {
      const response = await fetch(`${BASE_URL}/books/${bookId}`);
      return response.json();
    }
    if (searchTerm) {
      const response = await fetch(`${BASE_URL}/books/search?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data.books[0];
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export async function getBooksByAuthor({
  signal,
  authors,
}: {
  authors?: string;
  signal?: AbortSignal;
}): Promise<T_Books> {
  try {
    if (!authors?.length) {
      throw new Error("Authors are required");
    }

    const response = await fetch(`${BASE_URL}/books/search?q=${authors}`, {
      signal,
    });
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data.books;
  } catch (error) {
    if (error instanceof Error) {
      return [];
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export const getBookReviews = async (bookId?: string) => {
  try {
    if (!bookId) {
      throw new Error("Book ID is required");
    }
    const response = await fetch(`${BASE_URL}/reviews/${bookId}`);
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getBookById = async (
  bookId: number | null,
): Promise<T_MockBook> => {
  try {
    if (!bookId) {
      throw new Error("Review ID is required");
    }

    const response = await fetch(
      `${import.meta.env.VITE_MOCK_API_BASE_URL}/books/${String(bookId)}`,
    );
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const PHOTOS_PER_PAGE = 6;

export async function getPhotos({
  page,
}: {
  page: number;
}): Promise<T_Photo[]> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${PHOTOS_PER_PAGE}`,
    );
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getPosts({ page }: { page: number }): Promise<T_Post[]> {
  try {
    const POST_PER_PAGE = 6;

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POST_PER_PAGE}`,
    );
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
