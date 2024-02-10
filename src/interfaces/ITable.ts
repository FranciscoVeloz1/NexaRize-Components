export interface TableStyles {
  table: string;
  tr: string;
  th: string;
  td: string;
}

interface TableItem<T> {
  name: string;
  render: (item: T, field: string) => JSX.Element;
}

export interface TableConfig<T> {
  [key: string]: TableItem<T>;
}
