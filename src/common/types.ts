
export type PaginationResult<T = any> = {
    page: number;
    totalItems: number;
    totalPages: number;
    itemsCount: number;
    perPage: number;
    items: T[];
};
