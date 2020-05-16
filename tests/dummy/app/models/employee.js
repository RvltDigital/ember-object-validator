import { attr, belongsTo } from '@ember-data/model';
import { validatable, constrain } from 'ember-object-validator';
import UserModel from './user';

@validatable
@constrain('name', { length: { minimum: 2 } })
@constrain('username', { presence: { allowEmpty: false } })
class EmployeeModel extends UserModel
{
    @constrain({ presence: { allowEmpty: false } })
    @attr('string') position;

    @attr('string') username;

    @constrain({ nullContent: true })
    @belongsTo('department') department;

    @constrain({ datetime: { earliest: new Date() } })
    @attr('date', { defaultValue: () => new Date() }) hired;
}

export default EmployeeModel;
