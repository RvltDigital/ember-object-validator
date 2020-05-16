import Validator from './validator';
import { defineProperty, computed, getProperties } from '@ember/object';



function validate(...properties)
{
    const prototype = Object.getPrototypeOf(this);
    if (!Object.prototype.hasOwnProperty.call(prototype, 'validate')) {
        throw new Error('Validation can not be called from child class instance. Make sure that child class has own validate function.');
    }
    if (properties.length === 0) {
        properties = Validator.getValidatableProperties(prototype.constructor);
    }
    return Validator.validate(prototype.constructor, getProperties(this, properties));
}

function errorsGetter()
{
    return this.validate() || {};
}

function isValid()
{
    return Object.keys(this.errors).length === 0;
}



function validatable(target)
{
    const prototype = target.prototype;

    // Add validate function
    const validateDescriptor = {
        configurable: true,
        enumerable: false,
        writable: false,
        value: validate
    }
    defineProperty(
        prototype,
        'validate',
        validateDescriptor
    );


    // Add cached error getter
    const propertiesToObserve = [];
    for (const property of Validator.getValidatableProperties(target)) {
        propertiesToObserve.push(property, `${property}.[]`);
    }

    const errorsDescriptor = {
        configurable: true,
        enumerable: true,
        writable: false,
        get: errorsGetter
    }
    defineProperty(
        prototype,
        'errors',
        computed(...propertiesToObserve)(prototype, 'errors', errorsDescriptor)
    );


    // Add cached isValid getter
    const isValidDescriptor = {
        configurable: true,
        enumerable: true,
        writable: false,
        get: isValid
    }
    defineProperty(
        prototype,
        'isValid',
        computed('errors')(prototype, 'isValid', isValidDescriptor)
    );

    return target;
}



export default validatable;
