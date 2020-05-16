import Route from '@ember/routing/route';

class IndexRoute extends Route
{
    async model()
    {
        await this.store.findAll('department');
        return this.store.createRecord('software-developer');
    }
}

export default IndexRoute;
