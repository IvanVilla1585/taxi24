// import Boom from '@hapi/boom';
// import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

// export abstract class BaseService<
//   Model extends ObjectLiteral,
//   Filters,
//   PaginationResponse,
//   Repo extends Repository<Model>,
// > {
//   protected readonly entity: string;
//   protected readonly repository: Repo;

//   constructor(repository: Repo, entity: string) {
//     this.entity = entity;
//     this.repository = repository;
//   }

//   async find(filters: Filters): Promise<Model[]> {
//     return Promise.resolve([]);
//   }

//   async findAndPaginate(filters: Filters): Promise<PaginationResponse> {
//     const [data, total] = await this.repository.findAndPaginate(filters);

//     return {
//       data,
//       total,
//     };
//   }

//   async findById(id: number): Promise<Model> {
//     const data = (await this.repository.findById(id) as Model | null);

//     if (!data) {
//       throw Boom.notFound(`The ${this.entity} does not exist`);
//     }

//     return data;
//   }

//   async deleteById(id: number): Promise<Model> {
//     const data = await this.repository.findById(id);

//     if (!data) {
//       throw Boom.notFound(`The ${this.entity} does not exist`);
//     }

//     await this.repository.delete(id);

//     return data;
//   }
// }
