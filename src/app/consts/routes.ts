export const ROUTE = ``;
export const ROUTE_FAULT = `**`;
export const ROUTE_ROOT = `/`;

//Admin
export const ROUTE_MANAGEMENT = `management`;
export const ROUTE_MANAGEMENT_CATEGORY = `category-management`;






export const GetPageFullRoute = (page: string, section: string | null): string => {
    if (page) {
        return `/${page}/${section}`;
    }
    return `/${page}`;
};