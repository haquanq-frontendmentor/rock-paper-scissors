import { cn } from "../../utils/cn";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant: "outlined" | "solid";
}

export const Button = ({ children, variant, className, ...restProps }: ButtonProps) => {
  return (
    <button
      className={cn(
        "h-12 w-50 rounded-lg border-2 border-gray-800 text-lg tracking-wider uppercase focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-gray-800 dark:border-gray-50 focus-visible:dark:outline-gray-50",
        {
          "bg-gray-800 text-gray-50 transition-opacity hover:opacity-75 dark:bg-gray-50 dark:text-gray-900":
            variant === "solid",
          "text-gray-900 transition-colors hover:bg-gray-800 hover:text-gray-50 dark:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-900":
            variant === "outlined",
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
