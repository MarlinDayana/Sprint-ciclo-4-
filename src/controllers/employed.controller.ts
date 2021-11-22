import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Employed} from '../models';
import {EmployedRepository} from '../repositories';

export class EmployedController {
  constructor(
    @repository(EmployedRepository)
    public employedRepository: EmployedRepository,
  ) { }

  @post('/employeds')
  @response(200, {
    description: 'Employed model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employed)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employed, {
            title: 'NewEmployed',
            exclude: ['id'],
          }),
        },
      },
    })
    employed: Omit<Employed, 'id'>,
  ): Promise<Employed> {
    return this.employedRepository.create(employed);
  }

  @get('/employeds/count')
  @response(200, {
    description: 'Employed model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Employed) where?: Where<Employed>,
  ): Promise<Count> {
    return this.employedRepository.count(where);
  }

  @get('/employeds')
  @response(200, {
    description: 'Array of Employed model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Employed, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Employed) filter?: Filter<Employed>,
  ): Promise<Employed[]> {
    return this.employedRepository.find(filter);
  }

  @patch('/employeds')
  @response(200, {
    description: 'Employed PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employed, {partial: true}),
        },
      },
    })
    employed: Employed,
    @param.where(Employed) where?: Where<Employed>,
  ): Promise<Count> {
    return this.employedRepository.updateAll(employed, where);
  }

  @get('/employeds/{id}')
  @response(200, {
    description: 'Employed model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Employed, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Employed, {exclude: 'where'}) filter?: FilterExcludingWhere<Employed>
  ): Promise<Employed> {
    return this.employedRepository.findById(id, filter);
  }

  @patch('/employeds/{id}')
  @response(204, {
    description: 'Employed PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employed, {partial: true}),
        },
      },
    })
    employed: Employed,
  ): Promise<void> {
    await this.employedRepository.updateById(id, employed);
  }

  @put('/employeds/{id}')
  @response(204, {
    description: 'Employed PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() employed: Employed,
  ): Promise<void> {
    await this.employedRepository.replaceById(id, employed);
  }

  @del('/employeds/{id}')
  @response(204, {
    description: 'Employed DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.employedRepository.deleteById(id);
  }
}
