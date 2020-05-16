

class CustomValidator extends Function
{
    constructor() {
        const fn = super('return arguments.callee.validate.apply(arguments.callee, arguments)');
        Object.defineProperty(fn, 'name', { value: null });
    }
}

export default CustomValidator;
