import { usePosts } from "@/hooks/usePosts";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import LoadButton from "./load-button";

export default function InfiniteQueries() {
  const loadMoreRef = useRef<HTMLLIElement>(null);

  const {
    fetchStatus,
    isPending,
    isFetchingPreviousPage,
    isFetchingNextPage,
    isSuccess,
    isError,
    hasPreviousPage,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage,
    data,
    error,
  } = usePosts();
  const posts = data?.pages.flat();

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;
    // Intersection Observer API
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.7 },
    );
    // Observe the load more element
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }
    // Clean up : unobserve the load more element
    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="grid w-full grid-cols-1 content-start justify-items-center gap-4">
      {fetchStatus === "paused" ? (
        <p>
          <span className="bg-destructive text-destructive-foreground rounded-lg px-8 py-2 text-center text-lg">
            device offline, try to reconnect, we are serving cached data
          </span>
        </p>
      ) : null}
      {isPending && fetchStatus === "fetching" ? (
        <ul
          className={cn(
            "border-border bg-background-muted flex max-h-[70dvh] w-full flex-col gap-4 overflow-y-scroll border border-dashed px-4 py-2 lg:w-2/3",
            "[scrollbar-color:var(--color-accent-foreground)_var(--color-accent)] [scrollbar-gutter:stable_both-edges] [scrollbar-width:thin]",
          )}
        >
          {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
            <li
              key={index}
              className={cn(
                "outline-border h-10 w-full rounded-2xl p-2 outline-1",
                "bg-foreground-subtle animate-pulse",
              )}
            ></li>
          ))}
        </ul>
      ) : null}

      {isError ? <p>Error: {error.message}</p> : null}

      {isSuccess && posts ? (
        <ul
          className={cn(
            "border-border bg-background-muted flex max-h-[70dvh] w-full flex-col gap-4 overflow-y-scroll border border-dashed px-4 py-4 lg:w-2/3",
            "[scrollbar-color:var(--color-accent-foreground)_var(--color-accent)] [scrollbar-gutter:stable_both-edges] [scrollbar-width:thin]",
          )}
        >
          <li className="flex w-full items-center justify-end gap-4">
            <LoadButton
              direction="previous"
              onLoad={fetchPreviousPage}
              isFetching={isFetchingPreviousPage}
              hasMore={hasPreviousPage}
              className={cn(
                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 hover:-translate-y-0.5",
                { hidden: !hasPreviousPage },
              )}
            />
          </li>
          {posts.map((post) => (
            <li
              key={post.id}
              className="text-card-foreground bg-card w-full rounded-2xl p-2 overflow-ellipsis shadow-md outline-1 outline-violet-300"
            >
              {post.title}
            </li>
          ))}
          <li
            ref={loadMoreRef}
            className={cn(
              "grid w-1/2 place-items-center place-self-center text-2xl",
              {
                hidden: !hasNextPage,
              },
            )}
          >
            {isFetchingNextPage ? (
              <span className="text-primary flex size-8 animate-ping rounded-full">
                ...
              </span>
            ) : null}
          </li>
        </ul>
      ) : null}
      <div className="flex w-full items-center justify-center gap-4">
        <LoadButton
          direction="next"
          onLoad={fetchNextPage}
          isFetching={isFetchingNextPage}
          hasMore={hasNextPage}
          className={cn(
            "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground/90 hover:-translate-y-0.5",
            { hidden: isPending },
          )}
        />
      </div>
    </div>
  );
}
