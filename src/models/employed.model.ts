import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Company} from './company.model';

@model()
export class Employed extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  PersonalIdentification: string;

  @property({
    type: 'string',
    required: true,
  })
  Givennames: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  Gender: string;

  @property({
    type: 'string',
    required: true,
  })
  City: string;

  @property({
    type: 'string',
    required: true,
  })
  Address: string;

  @property({
    type: 'string',
    required: true,
  })
  Phone: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Employment: string;

  @property({
    type: 'number',
    required: true,
  })
  Sueldo: number;

  @belongsTo(() => Company)
  companyId: string;

  constructor(data?: Partial<Employed>) {
    super(data);
  }
}

export interface EmployedRelations {
  // describe navigational properties here
}

export type EmployedWithRelations = Employed & EmployedRelations;
