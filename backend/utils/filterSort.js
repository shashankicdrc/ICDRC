const querystring = require('querystring')

const allowedFields = [
    'name',
    "caseId",
    'email',
    'createdAt',
    'isPay',
    'status',
    'policyType',
    'policyCompany',
    "problem",
    "problemDetails",
    "mobile",
    "state",
    "country",
    "city",
    "transactionId",
    "organization_name"
];

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


const filterSort = (searchParmas) => {
    try {
        const unescapeSearchParams = querystring.unescape(searchParmas.slice(1));
        const parsedQuery = querystring.parse(unescapeSearchParams);

        // Destructure the parsedQuery object with proper types
        let { filter, sort_by } = parsedQuery;

        let filters = [];
        let Sorts = {}

        if (filter) {
            // If filter is a string, convert it to an array
            filter = Array.isArray(filter) ? filter : [filter];
            // Now, filterData contains an array of strings (or an empty array if filter is undefined)
            filter.map((items) => {
                const [field, operator, value] = items.split(':')
                filters.push({ field, operator, value })
            });
        }

        if (sort_by) {
            // conver the sort into an array by splitting
            const data = sort_by.split(",")

            // get the field and ordery_by value by splitting "(" and then remove last parantehis from field
            data.map(item => {
                let [value, field] = item.split("(")
                field = field.substring(0, field.length - 1)
                Sorts[field] = value
            })
        }

        return { filters, Sorts }
    } catch (error) {
        throw new Error(error.message)
    }
}

function parseFilters(filters) {
    const query = {};
    filters.forEach(filter => {
        if (allowedFields.includes(filter.field) && allowedOperators[filter.operator]) {
            const mongoOperator = allowedOperators[filter.operator];

            // Convert value to appropriate type if necessary
            let parsedValue;
            if (mongoOperator === '$in' || mongoOperator === '$nin') {
                parsedValue = filter.value.split(','); // Split comma-separated values
            } else if (mongoOperator === '$regex') {
                parsedValue = new RegExp(filter.value, 'i'); // Case-insensitive regex
            }
            else if (filter.field === 'isPay' || filter.field === 'status') {
                if (filter.value.toLowerCase() === 'done') {
                    parsedValue = true
                }

                if (filter.value.toLowerCase() === 'pending') {
                    parsedValue = false
                }
            }
            else if (filter.field === 'createdAt') {
                parsedValue = new Date(filter.value)
            }
            else if (!isNaN(filter.value)) {
                parsedValue = Number(filter.value); // Convert to number if possible
            } else {
                parsedValue = filter.value; // Use string value
            }

            query[filter.field] = { [mongoOperator]: parsedValue };
        }
    });
    return query;
}


module.exports = { filterSort, parseFilters }
