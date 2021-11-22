import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employed} from './employed.model';
import {Provider} from './provider.model';

@model()
export class Company extends Entity {
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
  BusinessName: string;

  @property({
    type: 'string',
    required: true,
  })
  Nit: string;

  @property({
    type: 'string',
    required: true,
  })
  Address: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Phone: string;

  @hasMany(() => Employed)
  employeds: Employed[];

  @hasMany(() => Provider)
  providers: Provider[];

  @property({
    type: 'string',
  })
  providerId?: string;

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
