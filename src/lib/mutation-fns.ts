import { T_MockBook } from "@/types/query-types";

export const updateBook = async ({
  bookId,
  updateData,
}: {
  bookId: number;
  updateData: Partial<T_MockBook>;
}): Promise<unknown> => {
  try {
    if (!bookId) {
      throw new Error("book ID is required");
    }
    if (!updateData?.title && !updateData?.author) {
      throw new Error("title or author is required");
    }

    const response = await fetch(
      `${import.meta.env.VITE_MOCK_API_BASE_URL}/books/${String(bookId)}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: updateData?.title,
          author: updateData?.author,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
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
