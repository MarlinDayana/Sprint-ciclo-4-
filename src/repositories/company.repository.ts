import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Company, CompanyRelations, Employed, Provider} from '../models';
import {EmployedRepository} from './employed.repository';
import {ProviderRepository} from './provider.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {

  public readonly employeds: HasManyRepositoryFactory<Employed, typeof Company.prototype.id>;

  public readonly providers: HasManyRepositoryFactory<Provider, typeof Company.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmployedRepository') protected employedRepositoryGetter: Getter<EmployedRepository>, @repository.getter('ProviderRepository') protected providerRepositoryGetter: Getter<ProviderRepository>,
  ) {
    super(Company, dataSource);
    this.providers = this.createHasManyRepositoryFactoryFor('providers', providerRepositoryGetter,);
    this.registerInclusionResolver('providers', this.providers.inclusionResolver);
    this.employeds = this.createHasManyRepositoryFactoryFor('employeds', employedRepositoryGetter,);
    this.registerInclusionResolver('employeds', this.employeds.inclusionResolver);
  }
}
