import { attr } from '@ember-data/model';
import { validatable, constrain } from 'ember-object-validator';
import EmployeeModel from './employee';

@validatable
class SoftwareDeveloperModel extends EmployeeModel
{
    @constrain({ presence: { allowEmpty: false } })
    @attr('string') languages;
}

export default SoftwareDeveloperModel;
