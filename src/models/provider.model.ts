import {Entity, model, property, hasMany} from '@loopback/repository';
import {Company} from './company.model';

@model()
export class Provider extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  Nit?: string;

  @property({
    type: 'string',
    required: true,
  })
  BussinessName: string;

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
  LegalRepresentative: string;

  @property({
    type: 'string',
    required: true,
  })
  Website: string;

  @property({
    type: 'string',
  })
  companyId?: string;

  @hasMany(() => Company)
  companies: Company[];

  constructor(data?: Partial<Provider>) {
    super(data);
  }
}

export interface ProviderRelations {
  // describe navigational properties here
}

export type ProviderWithRelations = Provider & ProviderRelations;
