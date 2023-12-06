import classNames from "classnames";

export function Card({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={classNames(
        className,
        "rounded-md border shadow-md overflow-hidden"
      )}
    />
  );
}
