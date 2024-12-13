import { usePosts } from "@/hooks/usePosts";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import LoadButton from "./load-button";

export default function InfiniteQueries() {
  const loadMoreRef = useRef<HTMLLIElement>(null);

  const {
    isLoading,
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
      { threshold: 1 },
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
      {isLoading ? (
        <ul className="flex w-2/3 flex-col gap-2 border border-dashed border-amber-200 px-4 py-2">
          {Array.from({ length: 6 }, (_, i) => i).map((_, index) => (
            <li
              key={index}
              className={cn(
                "h-10 w-full rounded-2xl p-2 outline-1 outline-violet-300",
                "animate-pulse bg-slate-200",
              )}
            ></li>
          ))}
        </ul>
      ) : null}

      {isError ? <p>Error: {error.message}</p> : null}

      {isSuccess && posts ? (
        <ul
          className={cn(
            "flex max-h-[70dvh] w-2/3 flex-col gap-2 overflow-y-scroll border border-dashed border-amber-200 px-4 py-2",
            "[scrollbar-color:#fbbf24_#2b2b2b] [scrollbar-gutter:stable_both-edges] [scrollbar-width:thin]",
          )}
        >
          <li className="flex w-full items-center justify-end gap-4">
            <LoadButton
              direction="previous"
              onLoad={fetchPreviousPage}
              isFetching={isFetchingPreviousPage}
              hasMore={hasPreviousPage}
              className={cn(
                "bg-orange-200 text-orange-400 hover:-translate-y-0.5 hover:bg-orange-100 hover:text-orange-300",
                {
                  hidden: !hasPreviousPage,
                },
              )}
            />
          </li>
          {posts.map((post) => (
            <li
              key={post.id}
              className="text-foreground w-full rounded-2xl p-2 overflow-ellipsis outline-1 outline-violet-300"
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
              <span className="flex size-8 animate-ping rounded-full text-orange-400">
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
          className="bg-orange-400 text-slate-100 hover:-translate-y-0.5 hover:bg-orange-300 hover:text-slate-50"
        />
      </div>
    </div>
  );
}
