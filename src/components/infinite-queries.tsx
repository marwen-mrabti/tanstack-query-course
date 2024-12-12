import { usePosts } from "@/hooks/usePosts";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

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
        <ul className="flex max-h-[70dvh] w-2/3 flex-col gap-2 overflow-y-scroll border border-dashed border-amber-200 px-4 py-2">
          <li className="flex w-full items-center justify-end gap-4">
            <button
              disabled={isFetchingPreviousPage || !hasPreviousPage}
              onClick={() => fetchPreviousPage()}
              className={cn(
                "grid min-w-[10ch] cursor-pointer place-items-center rounded-md bg-orange-200 px-4 py-2 text-amber-800 hover:bg-amber-200",
                "disabled:cursor-not-allowed disabled:bg-amber-100 disabled:text-slate-500",
                { hidden: !hasPreviousPage },
              )}
            >
              {isLoading || isFetchingPreviousPage ? (
                <span className="inline-block size-8 animate-spin rounded-full border-2 border-t-orange-700 text-orange-400"></span>
              ) : !hasPreviousPage ? (
                "you are on the first post"
              ) : (
                "load previous posts"
              )}
            </button>
          </li>
          {posts.map((post) => (
            <li
              key={post.id}
              className="w-full rounded-2xl p-2 overflow-ellipsis text-slate-100 outline-1 outline-violet-300"
            >
              {post.title}
            </li>
          ))}
          <li
            ref={loadMoreRef}
            className={cn(
              "grid w-1/2 place-items-center place-self-center rounded-2xl border border-slate-200 bg-orange-200 px-4 py-2 text-center font-semibold text-orange-500",
              {
                hidden: !hasNextPage,
              },
            )}
          >
            {isFetchingNextPage ? (
              <span className="inline-block size-8 animate-spin rounded-full border-2 border-t-orange-700 text-orange-400"></span>
            ) : hasNextPage ? (
              "load more posts"
            ) : (
              "no more posts"
            )}
          </li>
        </ul>
      ) : null}
      <div className="flex w-full items-center justify-center gap-4">
        <button
          disabled={isFetchingNextPage || !hasNextPage}
          onClick={() => fetchNextPage()}
          className={cn(
            "grid min-w-[10ch] cursor-pointer place-items-center rounded-md bg-orange-200 px-4 py-2 text-amber-800 hover:bg-amber-200",
            "disabled:cursor-not-allowed disabled:bg-amber-100 disabled:text-slate-500",
          )}
        >
          {isLoading || isFetchingNextPage ? (
            <span className="inline-block size-8 animate-spin rounded-full border-2 border-t-orange-700 text-orange-400"></span>
          ) : !hasNextPage ? (
            "no more posts"
          ) : (
            "load more"
          )}
        </button>
      </div>
    </div>
  );
}
