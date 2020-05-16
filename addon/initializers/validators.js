import validate from 'validate.js';
import { camelize } from '@ember/string';

function loadValidator(module)
{
    const { default: validatorClass } = require(module);

    if (typeof validatorClass !== 'function') {
        throw new Error(`Default export from module '${module}' must be validatorClass function.'`);
    }

    const validator = new validatorClass();
    const name = camelize(module.split('/').pop());

    validate.validators[name] = validator;
}

export function initialize(application)
{
    const modulePrefix = application.resolveRegistration('config:environment').modulePrefix;

    const modules = Object.keys(require._eak_seen);
    for (const module of modules) {
        if (module.indexOf(modulePrefix + '/validators/') !== 0) {
            continue;
        }
        loadValidator(module);
    }
}

export default {
    initialize
};
