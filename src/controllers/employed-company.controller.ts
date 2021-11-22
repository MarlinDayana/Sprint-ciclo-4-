import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Employed,
  Company,
} from '../models';
import {EmployedRepository} from '../repositories';

export class EmployedCompanyController {
  constructor(
    @repository(EmployedRepository)
    public employedRepository: EmployedRepository,
  ) { }

  @get('/employeds/{id}/company', {
    responses: {
      '200': {
        description: 'Company belonging to Employed',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Company)},
          },
        },
      },
    },
  })
  async getCompany(
    @param.path.string('id') id: typeof Employed.prototype.id,
  ): Promise<Company> {
    return this.employedRepository.company(id);
  }
}
