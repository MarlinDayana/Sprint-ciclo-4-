import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Employed, EmployedRelations, Company} from '../models';
import {CompanyRepository} from './company.repository';

export class EmployedRepository extends DefaultCrudRepository<
  Employed,
  typeof Employed.prototype.id,
  EmployedRelations
> {

  public readonly company: BelongsToAccessor<Company, typeof Employed.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>,
  ) {
    super(Employed, dataSource);
    this.company = this.createBelongsToAccessorFor('company', companyRepositoryGetter,);
    this.registerInclusionResolver('company', this.company.inclusionResolver);
  }
}
