import { cn } from "@/lib/utils";

type PaginationButtonProps = {
  disabled: boolean;
  onClick: () => void;
  title: string;
  className?: string;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  disabled,
  onClick,
  title,
  className,
}) => {
  return (
    <button
      aria-label={`pagination button: move to ${title}`}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "bg-secondary border-border text-secondary-foreground hover:bg-secondary/90 cursor-pointer rounded-md border px-4 py-2",
        "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed",
        className,
      )}
    >
      {title}
    </button>
  );
};

export default PaginationButton;
