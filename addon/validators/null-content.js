import { CustomValidator } from 'ember-object-validator';


class NullContentValidator extends CustomValidator
{
    message = 'can not be null';

    validate(value, { message })
    {
        if (value.content !== null) {
            return;
        }
        return message || this.message;
    }
}


export default NullContentValidator;
