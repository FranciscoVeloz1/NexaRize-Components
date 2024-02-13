import React from 'react'
import { TableStyles, TableConfig } from "../interfaces/ITable";

interface Props<T> {
  data: T[];
  config: TableConfig<T>;
  styles?: TableStyles;
}

function Table<T>({ data, config, styles }: Props<T>) {
  return (
    <div>
      <table className={styles?.table}>
        <thead>
          <tr className={styles?.tr}>
            {Object.values(config).map((v) => (
              <th className={styles?.th} key={v.name}>
                {v.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((d, i) => (
            <tr key={i} className={styles?.tr}>
              {Object.entries(config).map(([key, value], j) => (
                <td className={styles?.td} key={j}>
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
