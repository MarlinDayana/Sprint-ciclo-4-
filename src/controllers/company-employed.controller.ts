import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Company,
  Employed,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyEmployedController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/employeds', {
    responses: {
      '200': {
        description: 'Array of Company has many Employed',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employed)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Employed>,
  ): Promise<Employed[]> {
    return this.companyRepository.employeds(id).find(filter);
  }

  @post('/companies/{id}/employeds', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employed)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employed, {
            title: 'NewEmployedInCompany',
            exclude: ['id'],
            optional: ['companyId']
          }),
        },
      },
    }) employed: Omit<Employed, 'id'>,
  ): Promise<Employed> {
    return this.companyRepository.employeds(id).create(employed);
  }

  @patch('/companies/{id}/employeds', {
    responses: {
      '200': {
        description: 'Company.Employed PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employed, {partial: true}),
        },
      },
    })
    employed: Partial<Employed>,
    @param.query.object('where', getWhereSchemaFor(Employed)) where?: Where<Employed>,
  ): Promise<Count> {
    return this.companyRepository.employeds(id).patch(employed, where);
  }

  @del('/companies/{id}/employeds', {
    responses: {
      '200': {
        description: 'Company.Employed DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Employed)) where?: Where<Employed>,
  ): Promise<Count> {
    return this.companyRepository.employeds(id).delete(where);
  }
}
