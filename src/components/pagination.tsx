import { getPhotosQueryOptions, usePhotos } from "@/hooks/usePhotos";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Pagination() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const {
    isPending,
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
      {isPending ? (
        <ul className="grid min-h-[50dvh] w-2/3 grid-cols-3 place-items-center gap-2 border border-dashed border-amber-200 px-4 py-2">
          {Array.from({ length: 7 }, (_, i) => i).map((_, index) => (
            <li
              key={index}
              className="aspect-square h-38 overflow-clip rounded-2xl text-slate-100"
            >
              <div className="h-full w-full animate-pulse bg-slate-200"></div>
            </li>
          ))}
        </ul>
      ) : null}

      {isError ? <p>Error: {error.message}</p> : null}

      {isSuccess && photos ? (
        <ul className="grid min-h-[50dvh] w-2/3 grid-cols-3 place-items-center gap-2 border border-dashed border-amber-200 px-4 py-2">
          {photos.map((photo) => (
            <li
              key={photo.id}
              className={cn("w-full overflow-clip rounded-2xl text-slate-100", {
                "opacity-70": isPlaceholderData,
              })}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex w-full items-center justify-center gap-4">
        <button
          disabled={isPlaceholderData || page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={cn(
            "cursor-pointer rounded-md bg-amber-300 px-4 py-2 text-amber-800 hover:bg-amber-200",
            "disabled:cursor-not-allowed disabled:bg-amber-100 disabled:text-slate-500",
          )}
        >
          previous page
        </button>

        <button
          disabled={isPlaceholderData}
          onClick={() => setPage((prev) => prev + 1)}
          className={cn(
            "cursor-pointer rounded-md bg-amber-300 px-4 py-2 text-amber-800 hover:bg-amber-200",
            "disabled:cursor-not-allowed disabled:bg-amber-100 disabled:text-slate-500",
          )}
        >
          next page
        </button>
      </div>
    </div>
  );
}
