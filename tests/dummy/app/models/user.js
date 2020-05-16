import Model, { attr } from '@ember-data/model';
import { validatable, constrain } from 'ember-object-validator';

@validatable
class UserModel extends Model
{
    @constrain({ presence: { allowEmpty: false } })
    @attr('string', { defaultValue: '' }) name;

    @constrain({ presence: true, email: true })
    @attr('string') email;
}

export default UserModel;
