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
    if (isRefetching) return "Refetching...";
    if (!isStale) return "Data is fresh";
    return "Refresh data";
  })();

  return (
    <button
      disabled={!isStale}
      className={cn(
        "cursor-pointer rounded-lg bg-yellow-400 px-4 py-2 hover:bg-yellow-500",
        "text-yellow-100 disabled:cursor-not-allowed disabled:bg-yellow-600 disabled:opacity-70",
        className,
      )}
      onClick={onRefetch}
    >
      {buttonText}
    </button>
  );
};

export default RefreshButton;
