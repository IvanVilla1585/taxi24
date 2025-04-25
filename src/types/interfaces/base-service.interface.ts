export interface IBaseService<
  Model,
  Filters,
  BodyCreate,
  BodyUpdate,
  PaginateResponse,
> {
  find(filters: Filters): Promise<Model[]>;
  findById(id: number): Promise<Model>;
  create(data: BodyCreate): Promise<Model>;
  updateById(id: number, data: BodyUpdate): Promise<Model>;
  deleteById(id: number): Promise<Model>;
  findAndPaginate(filters: Filters): Promise<PaginateResponse>;
}
