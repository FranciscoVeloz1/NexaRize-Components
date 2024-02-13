export interface PaginationStyles {
  container?: string;
  btn?: string;
  btn_disabled?: string;
  content?: string;
  input?: string;
  label?: string;
}

export interface IPagination<T> {
  data: T;
  total: number;
  extra?: number;
}
