import validate from 'validate.js';
import { getProperties } from '@ember/object';


const constrains = new WeakMap();

function getRelatedTargets(_target)
{
    const target = Object.getPrototypeOf(_target);
    if (target === null) {
        return [ _target ];
    }
    return [ _target, ...getRelatedTargets(target) ];
}



class Validator
{
    static addConstrain(target, property, constrain)
    {
        const config = constrains.get(target) || {};
        config[property] = constrain;
        constrains.set(target, config);
    }

    static validate(target, values)
    {
        const errors = {};

        for (const _target of getRelatedTargets(target)) {
            const _constrains = constrains.get(_target) || {};
            const _errors = validate(values, getProperties(_constrains, Object.keys(values)));

            for (const key in _errors) {
                errors[key] = [ ...(errors[key] || []), ..._errors[key]];
            }
        }

        return errors;
    }

    static getValidatableProperties(target)
    {
        const properties = new Set();
        for (const constructor of getRelatedTargets(target)) {
            for (const property of Object.keys(constrains.get(constructor) || {})) {
                properties.add(property);
            }
        }
        return Array.from(properties);
    }
}

export default Validator;
