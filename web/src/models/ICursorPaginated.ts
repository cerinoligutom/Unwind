export interface ICursorPaginated<T> {
  pageInfo: {
    hasNext: boolean;
    hasPrevious: boolean;
    next: string;
    previous: string;
    remaining: number;
    total: number;
  };
  results: T[];
}
