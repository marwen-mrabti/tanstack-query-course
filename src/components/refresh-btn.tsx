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
        "cursor-pointer rounded-lg bg-yellow-400 px-4 py-2 text-yellow-100",
        "hover:bg-yellow-500 disabled:cursor-not-allowed disabled:bg-yellow-600 disabled:opacity-70",
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
