export const CreateSortQuery = (sort) => {
    if (!Array.isArray(sort) || sort.length === 0) {
        return '';
    }
    const result = sort.map((obj) => `${obj.value}(${obj.column})`).join(',');
    return result;
};


export const CreateFilterQuery = (filter) => {
    if (filter.length < 1) {
        return '';
    }
    const filterquery = filter
        .filter((item) => item.value.length > 0) // Filter out items with an empty value
        .map((item) => {
            return `${item.column}:${item.operator}:${item.value}`;
        })
        .join('&filter=');

    return filterquery;
};
