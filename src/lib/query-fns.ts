import { T_Book, T_Books } from "@/types/query-types";

const BASE_URL = "https://library-api.uidotdev.workers.dev";

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
      const data = await response.json();
      console.log(data.books[0]);
      return data.books[0];
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export async function getBooksByAuthor({
  authors,
}: {
  authors?: string[];
}): Promise<T_Books> {
  try {
    if (!authors || authors.length === 0) {
      // Return an empty array or handle the case appropriately.
      return []; // Or a specific message like { books: [], message: "No authors provided" }
    }

    const queryString = authors.map(encodeURIComponent).join(","); // Properly encode authors
    console.log("queryString", queryString);
    let url = `${BASE_URL}/books/search`;
    if (queryString) {
      // Only add the query parameter if queryString is not empty
      url += `?q=${queryString}`;
    }
    const response = await fetch(url);
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
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
