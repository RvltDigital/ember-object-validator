import Validator from './validator';

function propertyConstrain(constrain)
{
    return function (target, property, descriptor)
    {
        Validator.addConstrain(target.constructor, property, constrain);
        return descriptor;
    }
}

function classConstrain(property, constrain)
{
    return function (target)
    {
        Validator.addConstrain(target, property, constrain);
        return target;
    }
}

function constrain()
{
    if (typeof arguments[0] === 'string') {
        return classConstrain(...arguments);
    }
    return propertyConstrain(...arguments);
}

export default constrain;
