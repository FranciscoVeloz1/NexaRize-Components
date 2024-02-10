import React from "react";
import { TableStyles, TableConfig } from "../interfaces/ITable";

interface Props<T> {
  data: T[];
  config: TableConfig<T>;
  className?: TableStyles;
}

function Table<T>({ data, config, className }: Props<T>) {
  return (
    <div>
      <table className={className?.table}>
        <thead>
          <tr className={className?.tr}>
            {Object.values(config).map((v) => (
              <th className={className?.th} key={v.name}>
                {v.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i} className={className?.tr}>
              {Object.entries(config).map(([key, value], j) => (
                <td className={className?.td} key={j}>
                  {value.render(d, key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
