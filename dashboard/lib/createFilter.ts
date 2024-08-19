
const createFilterQuery = (query: string | string[]) => {
    const queryArray = typeof query === "string" ? [query] : query;

    const validFilters = queryArray.filter((item) => {
        const parts = item.split(":");
        return parts.length === 3 && parts.every((part) => part.length > 0);
    });

    return validFilters.length ? validFilters.join("&filter=") : "";
};

export default createFilterQuery;
