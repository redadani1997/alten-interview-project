export type COMMON_ROUTE_ID = 'NOT_FOUND' | 'ADMIN' | 'BASKET' | 'CONTACT';

export interface ActiveLink {
    id: COMMON_ROUTE_ID | undefined;
}

export interface OpenedLink {
    id: COMMON_ROUTE_ID;
}
