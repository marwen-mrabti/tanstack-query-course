import { T_Book } from "@/types/query-types";

const BASE_URL = "https://library-api.uidotdev.workers.dev";

export const getBook = async ({
  bookId,
}: {
  bookId?: string;
}): Promise<T_Book> => {
  try {
    if (!bookId) {
      throw new Error("Book ID is required");
    }
    const response = await fetch(`${BASE_URL}/books/${bookId}`);
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
