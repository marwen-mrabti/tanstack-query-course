import { cn } from "@/lib/utils";

interface LoadButtonProps {
  /**
   * Direction of loading - 'next' or 'previous'
   */
  direction: "next" | "previous";
  /**
   * Whether more data is being fetched
   */
  isFetching?: boolean;
  /**
   * Whether there is more data to load
   */
  hasMore?: boolean;
  /**
   * Initial loading state
   */
  isLoading?: boolean;
  /**
   * Callback function when button is clicked
   */
  onLoad: () => void;
  /**
   * Custom text for the load more button
   */
  loadMoreText?: string;
  /**
   * Custom text for when there's no more content
   */
  noMoreText?: string;
  /**
   * Optional className for additional styling
   */
  className?: string;
}

const LoadButton = ({
  direction,
  isFetching = false,
  hasMore = true,
  isLoading = false,
  onLoad,
  loadMoreText,
  noMoreText,
  className,
}: LoadButtonProps) => {
  // Compute button state
  const isDisabled = isFetching || !hasMore;
  const showSpinner = isFetching || isLoading;
  const showLoadMore = !isFetching && !isLoading && hasMore;
  const showNoMore = !hasMore;

  // Default text based on direction
  const defaultLoadMoreText =
    direction === "next" ? "Load more" : "Load previous";
  const defaultNoMoreText =
    direction === "next" ? "No more posts" : "No previous posts";

  // Use custom text if provided, otherwise use defaults
  const displayLoadMoreText = loadMoreText ?? defaultLoadMoreText;
  const displayNoMoreText = noMoreText ?? defaultNoMoreText;

  // Compute appropriate ARIA label based on state and direction
  const getAriaLabel = () => {
    if (showSpinner) return `Loading ${direction} content...`;
    if (showNoMore) return `No ${direction} content available`;
    return `Load ${direction} content`;
  };

  return (
    <button
      onClick={onLoad}
      disabled={isDisabled}
      aria-label={getAriaLabel()}
      aria-busy={showSpinner}
      className={cn(
        "grid cursor-pointer place-items-center rounded-md px-4 py-2 shadow-md [grid-template-areas:'stack']",
        "transition-all duration-300 ease-in-out",
        "disabled:cursor-not-allowed disabled:bg-amber-100 disabled:text-slate-500",
        className,
      )}
    >
      {/* Loading spinner */}
      <span
        className={cn(
          "invisible size-6 animate-spin rounded-full border-2 border-t-orange-200 [grid-area:stack]",
          { visible: showSpinner },
        )}
        aria-hidden="true"
      />

      {/* Load more/previous text */}
      <span
        className={cn("invisible [grid-area:stack]", {
          visible: showLoadMore,
        })}
        aria-hidden="true"
      >
        {displayLoadMoreText}
      </span>

      {/* No more content text */}
      <span
        className={cn("invisible [grid-area:stack]", {
          visible: showNoMore,
        })}
        aria-hidden="true"
      >
        {displayNoMoreText}
      </span>
    </button>
  );
};

export default LoadButton;
