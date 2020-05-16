
export default function() {

    this.get('/departments', (schema) => schema.departments.all());

}
