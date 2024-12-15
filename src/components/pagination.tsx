import { getPhotosQueryOptions, usePhotos } from "@/hooks/usePhotos";
import { PHOTOS_PER_PAGE } from "@/lib/query-fns";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PaginationButton from "./pagination-btn";

export default function Pagination() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const {
    isLoading,
    isError,
    isSuccess,
    isPlaceholderData,
    data: photos,
    error,
  } = usePhotos({ page });

  // prefetch the next page
  useEffect(() => {
    queryClient.prefetchQuery({
      ...getPhotosQueryOptions({ page: page + 1 }),
    });
  }, [page, queryClient]);

  return (
    <div className="grid w-full grid-cols-1 content-start justify-items-center gap-4">
      {isLoading && !isPlaceholderData ? (
        <ul className="border-border bg-background-muted grid min-h-[70dvh] w-full auto-rows-fr grid-cols-1 gap-4 border border-dashed px-4 py-2 sm:grid-cols-2 lg:w-2/3 lg:grid-cols-3">
          {Array.from({ length: PHOTOS_PER_PAGE }, (_, i) => i).map(
            (_, index) => (
              <li
                key={index}
                className="relative aspect-square w-full overflow-clip rounded-2xl"
              >
                <div className="bg-foreground-subtle absolute inset-0 h-full w-full animate-pulse" />
              </li>
            ),
          )}
        </ul>
      ) : null}

      {isError ? (
        <h3 className="bg-destructive text-destructive-foreground rounded-lg px-8 py-2 text-center text-lg">
          Error: {error.message}
        </h3>
      ) : null}

      {isSuccess && photos ? (
        <ul className="border-border bg-background-muted grid min-h-[70dvh] w-full auto-rows-fr grid-cols-1 gap-4 border border-dashed px-4 py-2 sm:grid-cols-2 lg:w-2/3 lg:grid-cols-3">
          {photos.map((photo) => (
            <li
              key={photo.id}
              className={cn(
                "relative aspect-square w-full overflow-clip rounded-2xl",
                {
                  "opacity-70": isPlaceholderData,
                },
              )}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex w-full items-center justify-center gap-4">
        <PaginationButton
          disabled={isPlaceholderData || page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          title="previous page"
        />

        <PaginationButton
          disabled={isPlaceholderData}
          onClick={() => setPage((prev) => prev + 1)}
          title="next page"
        />
      </div>
    </div>
  );
}
