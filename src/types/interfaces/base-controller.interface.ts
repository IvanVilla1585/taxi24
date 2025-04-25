export interface IBaseController<
  Model,
  Params,
  Filters,
  BodyCreate,
  BodyUpdate,
  PaginateResponse,
> {
  findById(params: Params): Promise<Model>;
  create(data: BodyCreate): Promise<Model>;
  deleteById(params: Params): Promise<void>;
  updateById(params: Params, data: BodyUpdate): Promise<Model>;
  findAndPaginate(filters: Filters): Promise<PaginateResponse>;
}
