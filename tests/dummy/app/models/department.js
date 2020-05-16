import Model, { attr } from '@ember-data/model';

class DepartmentModel extends Model
{
    @attr('string') name;
}

export default DepartmentModel;
