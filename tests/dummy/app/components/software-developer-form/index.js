import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get, set } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { validatable, constrain } from 'ember-object-validator';

@validatable
class SoftwareDeveloperFormComponent extends Component
{
    showError = {
        name: false,
        email: false,
        username: false,
        position: false,
        department: false,
        languages: false,
        confirmation: false
    };

    @constrain({ is: { value: true, message: '^The employee have to confirm.' } })
    @tracked confirmation = false;

    get hasErrors()
    {
        if (!this.areErrorsVisible) {
            return false;
        }
        return !this.args.model.isValid || !this.isValid;
    }

    get areErrorsVisible()
    {
        for (const property in this.showError) {
            if (get(this, `showError.${property}`) === true && this.args.model.errors[property]) {
                return true;
            }
        }
        return false;
    }

    _hired = '';

    get hired()
    {
        const hired = this.args.model.hired;
        if (hired instanceof Date) {
            this._hired = `${hired.getMonth() + 1}/${hired.getDate()}/${hired.getFullYear()}`;
        }
        return this._hired;
    }

    set hired(value)
    {
        const _date = value.split('/');
        const date = new Date(value);
        const isValid = (date && (date.getMonth() + 1) == _date[0] && date.getDate() == Number(_date[1]) && date.getFullYear() == Number(_date[2]));
        this.args.model.hired = isValid? date: '';

        this._hired = value;
    }

    get guid()
    {
        return guidFor(this);
    }

    @action
    setDepartment(department)
    {
        set(this, 'showError.department', true);
        this.args.model.department = department;
    }

    @action
    save()
    {
        if (!this.areErrorsVisible) {
            for (const property in this.showError) {
                set(this, `showError.${property}`, true);
            }
        }
        if (this.hasErrors) {
            return;
        }
        alert('Save was successful!');
    }
}

export default SoftwareDeveloperFormComponent;
