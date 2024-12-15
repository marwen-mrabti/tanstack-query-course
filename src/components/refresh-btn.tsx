import { cn } from "@/lib/utils";
import React from "react";

interface RefreshButtonProps {
  isStale: boolean;
  isRefetching: boolean;
  onRefetch: () => void;
  className?: string;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  isStale,
  isRefetching,
  onRefetch,
  className,
}) => {
  const buttonText = (() => {
    if (isRefetching)
      return <span className="[grid-area:stack]">Refetching...</span>;
    if (!isStale)
      return <span className="[grid-area:stack]">Data is fresh</span>;
    return <span className="[grid-area:stack]">Refresh data</span>;
  })();

  return (
    <button
      disabled={!isStale || isRefetching}
      className={cn(
        "cursor-pointer rounded-lg px-4 py-2",
        "bg-primary text-primary-foreground",
        "hover:bg-primary/90 disabled:bg-primary/80 disabled:text-primary-foreground/90 disabled:cursor-not-allowed",
        "grid [grid-template-areas:'stack']",
        className,
      )}
      onClick={onRefetch}
    >
      {buttonText}
    </button>
  );
};

export default RefreshButton;
