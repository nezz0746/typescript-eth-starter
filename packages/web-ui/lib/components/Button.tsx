import classNames from "classnames";

type ButtonVariant = "base" | "primary" | "secondary";

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export function Button({
  className,
  loading = false,
  variant = "base",
  disabled = false,
  size = "md",
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={classNames(
        "btn",
        {
          "btn-primary": variant === "primary",
          "btn-secondary": variant === "secondary",
          "btn-disabled": disabled,
          "btn-xs": size === "xs",
          "btn-sm": size === "sm",
          "btn-md": size === "md",
          "btn-lg": size === "lg",
          "btn-xl": size === "xl",
        },
        className
      )}
    >
      {loading && <span className="loading loading-xs loading-bars"></span>}
      {children}
    </button>
  );
}
