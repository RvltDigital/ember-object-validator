import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

class DepartmentPickerComponent extends Component
{
    departments;

    @service store;

    constructor()
    {
        super(...arguments);
        this.departments = this.store.peekAll('department');
    }

    @action
    select({ target : { value: id } })
    {
        let department = null;

        if (id) {
            department = this.store.peekRecord('department', id);
        }

        this.args.onchange(department);
    }
}

export default DepartmentPickerComponent;
