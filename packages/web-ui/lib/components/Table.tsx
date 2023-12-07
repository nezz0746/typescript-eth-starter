import classNames from "classnames";

type TableDataProps = {
  pending?: boolean;
  id?: string;
} & Record<string, any>;

export function Table<T extends TableDataProps = Record<string, any>>({
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
            <th key={String(head.key ?? head.label)}>{head.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const rowKey = String(row.id);

          return (
            <tr
              key={rowKey}
              className={classNames({
                "opacity-40": row.pending,
              })}
            >
              {head.map(({ key, label, render }, _i) => {
                const cellKey = label + "_" + rowKey;

                return (
                  <td key={cellKey}>
                    {render ? render(row) : ((row as unknown) as any)[key]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
