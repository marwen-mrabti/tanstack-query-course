import { T_Post } from "@/types/query-types";

export const updatePost = async ({
  postId,
  updateData,
}: {
  postId: number;
  updateData: Partial<T_Post>;
}): Promise<unknown> => {
  try {
    if (!postId) {
      throw new Error("post ID is required");
    }
    if (!updateData?.title && !updateData?.body) {
      throw new Error("title or body is required");
    }

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title: updateData?.title,
          body: updateData?.body,
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
