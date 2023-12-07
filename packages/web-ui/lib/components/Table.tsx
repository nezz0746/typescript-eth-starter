import classNames from "classnames";

export function Table<T = Record<string, any>>({
  children,
  className,
  head,
  data,
  ...rest
}: React.HTMLAttributes<HTMLTableElement> & {
  head: {
    label: string;
    key?: keyof T;
    render?: (row: T) => React.ReactNode;
  }[];
  data: T[];
}) {
  return (
    <table className={classNames(className, "table table-xs")} {...rest}>
      <thead>
        <tr>
          {head.map((head) => (
            <th key={String(head.key)}>{head.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {head.map(({ key, render }) => (
              <td key={String(key)}>
                {render ? render(row) : ((row as unknown) as any)[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
