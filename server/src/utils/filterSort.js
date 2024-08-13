import querystring from 'querystring';

const allowedOperators = {
    eq: '$eq',
    ne: '$ne',
    gt: '$gt',
    gte: '$gte',
    lt: '$lt',
    lte: '$lte',
    in: '$in',
    nin: '$nin',
    regex: '$regex',
};

export const filterSort = (searchParmas) => {
    try {
        const unescapeSearchParams = querystring.unescape(
            searchParmas.slice(1),
        );
        const parsedQuery = querystring.parse(unescapeSearchParams);

        let { filter, sortBy } = parsedQuery;

        let filters = [];
        let Sorts = {};

        if (filter) {
            filter = Array.isArray(filter) ? filter : [filter];
            filter.map((items) => {
                const [field, operator, value] = items.split(':');
                filters.push({ field, operator, value });
            });
        }

        if (sortBy) {
            const data = sortBy.split(',');

            data.map((item) => {
                let [value, field] = item.split('(');
                field = field.substring(0, field.length - 1);
                Sorts[field] = value;
            });
        }

        return { filters, Sorts };
    } catch (error) {
        throw new Error(error.message);
    }
};

export function parseFilters(filters) {
    const query = {};
    filters.forEach((filter) => {
        if (allowedOperators[filter.operator]) {
            const mongoOperator = allowedOperators[filter.operator];

            let parsedValue;
            if (mongoOperator === '$in' || mongoOperator === '$nin') {
                parsedValue = filter.value.split(',');
            } else if (mongoOperator === '$regex') {
                parsedValue = new RegExp(filter.value, 'i');
            } else if (filter.field === 'isPay' || filter.field === 'status') {
                if (filter.value.toLowerCase() === 'done') {
                    parsedValue = true;
                }

                if (filter.value.toLowerCase() === 'pending') {
                    parsedValue = false;
                }
            } else if (filter.field === 'createdAt') {
                parsedValue = new Date(filter.value);
            } else if (!isNaN(filter.value)) {
                parsedValue = Number(filter.value);
            } else {
                parsedValue = filter.value;
            }

            query[filter.field] = { [mongoOperator]: parsedValue };
        }
    });
    return query;
}
