import validate from 'validate.js';

function parse(value)
{
    if (value instanceof Date) {
        return value.getTime();
    }
    if (typeof value === 'string') {
        return Date.parse(value);
    }
    if (Number.isInteger(value)) {
        return value;
    }
    return NaN;
}

function format(value, options)
{
    const date = new Date(value);
    return options.dateOnly? date.toLocaleDateString(): date.toLocaleString();
}

export function initialize()
{
    validate.extend(validate.validators.datetime, { parse, format });
}

export default {
    initialize
};
