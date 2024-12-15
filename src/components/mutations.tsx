import { usePost } from "@/hooks/usePost";
import { useUpdatePOST } from "@/hooks/useUpdatePOST";
import { cn } from "@/lib/utils";
import { T_UpdatePost } from "@/types/query-types";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export default function Mutations() {
  const [postId, setPostId] = useState<number | null>(null);
  const debouncedPostId = useDebounce(postId, 300);
  const [postContent, setPostContent] = useState<T_UpdatePost>({
    title: null,
    body: null,
  });

  const {
    isLoading,
    isSuccess,
    data: post,
    isError,
    error,
  } = usePost({ postId: debouncedPostId });

  useEffect(() => {
    if (isSuccess) {
      setPostContent({
        title: post?.title,
        body: post?.body,
      });
    }
  }, [isSuccess, post]);

  const {
    mutateAsync: updatePost,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useUpdatePOST();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post) {
      alert("Post data not yet available.");
      return;
    }

    await updatePost(
      {
        postId: post.id,
        updateData: {
          title: postContent.title ?? post?.title,
          body: postContent.body ?? post?.body,
        },
      },
      {
        onSuccess: () => {
          console.log("success");
        },
      },
    );
  };

  return (
    <div className="bg-grid grid min-h-[50dvh] w-full grid-cols-1 content-start justify-items-center gap-4 py-10">
      {isError ? (
        <p className="text-destructive-foreground bg-destructive text-md px-4 py-2">
          Error: {error.message}
        </p>
      ) : null}
      {isUpdateError ? (
        <p className="text-destructive-foreground bg-destructive text-md px-4 py-2">
          Error: {updateError.message}
        </p>
      ) : null}

      <div className="mx-auto grid w-full grid-rows-2 place-items-start md:w-[clamp(300px,50%,500px)]">
        <label htmlFor="postId" className="text-foreground-subtle row-span-1">
          post ID
        </label>
        <input
          disabled={isLoading || isUpdatePending}
          type="number"
          name="postId"
          placeholder="enter post ID between 1 and 100"
          min={1}
          max={100}
          value={postId ?? ""}
          onChange={(e) => setPostId(Number(e.target.value))}
          className="rows-span-1 focus-visible:ring-ring bg-input text-foreground placeholder:text-foreground-muted w-full rounded-lg border-none px-4 py-2 focus-visible:ring-1 focus-visible:outline-none"
        />
      </div>
      <form
        onSubmit={handleOnSubmit}
        className={cn(
          "bg-card text-card-foreground flex min-h-[inherit] w-full flex-col items-center justify-around gap-4 rounded-md px-4 py-2 shadow-xl md:w-[clamp(300px,50%,500px)]",
          {
            "bg-accent/70 animate-pulse": isUpdatePending || isLoading,
          },
        )}
      >
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="title" className="text-foreground-subtle">
            title
          </label>
          <input
            readOnly={!post || isLoading || isUpdatePending}
            disabled={!post || isLoading || isUpdatePending}
            value={postContent?.title ?? ""}
            onChange={(e) =>
              setPostContent({
                ...postContent,
                title: e.target.value,
              })
            }
            id="title"
            name="title"
            type="text"
            placeholder="title"
            className="focus-visible:ring-ring bg-input text-foreground placeholder:text-foreground-muted w-full rounded-lg border-none px-4 py-2 focus-visible:ring-1 focus-visible:outline-none"
          />
        </div>

        <div className="flex w-full flex-col gap-1">
          <label htmlFor="post" className="text-foreground-subtle">
            post
          </label>
          <textarea
            readOnly={!post || isLoading || isUpdatePending}
            disabled={!post || isLoading || isUpdatePending}
            value={postContent?.body ?? ""}
            onChange={(e) =>
              setPostContent({
                ...postContent,
                body: e.target.value,
              })
            }
            id="post"
            name="text"
            rows={4}
            placeholder="post body"
            className="focus-visible:ring-ring bg-input text-foreground placeholder:text-foreground-muted w-full rounded-lg border-none px-4 py-2 focus-visible:ring-1 focus-visible:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!post || isLoading || isUpdatePending}
          className={cn(
            "bg-primary border-border text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-md border px-4 py-2",
            "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
            "grid place-items-center [grid-template-areas:'stack']",
          )}
        >
          <span
            className={cn("visible", "[grid-area:stack]", {
              invisible: isUpdatePending,
            })}
          >
            Submit
          </span>
          <span
            className={cn("invisible animate-pulse", "[grid-area:stack]", {
              visible: isUpdatePending,
            })}
          >
            submitting
          </span>
        </button>
      </form>
    </div>
  );
}
