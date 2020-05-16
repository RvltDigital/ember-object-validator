import { CustomValidator } from 'ember-object-validator';
import v from 'validate.js';

class IsValidator extends CustomValidator
{
    message = 'must be exactly "%{value}" value';

    validate(_value, { value, message }) {
        if (_value === value) {
            return;
        }
        const _message = message || this.message;
        return v.format(_message, { value });
    }
}

export default IsValidator;
