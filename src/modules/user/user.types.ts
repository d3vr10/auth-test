export type UserFilter = {
    id?: string;
    username?: string;
    email?: string;
    role?: string;
    skip?: number;
    take?: number;
}

export type FindUserFields = {
    email: string;
    username: string;
    role: string;
}

export type FindUserPagination = {
    page: number;
    perPage: number;
}

export type FindUserOptions = {
    filter: FindUserFields;
    pagination: FindUserPagination;
}

