import { IPaginationOptions } from 'src/core/types/pagination-options';
import { PaginatorDto } from 'src/core/types/paginator.dto';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
  count: number,
): PaginatorDto<T> => {
  return {
    data,
    count,
    hasNextPage: data.length === options.limit,
  };
};
