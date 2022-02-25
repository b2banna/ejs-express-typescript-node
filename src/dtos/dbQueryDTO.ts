import { IEmptyObject } from "../interfaces/IEmptyObject";

export class DbQueryDTO {
  public filter: Array<IEmptyObject>;
  public sort: IEmptyObject;
  public page: number;
  public limit: number;
  public offset: number;
  constructor(query: IEmptyObject) {
    this.filter = query.filter || {};
    this.sort = query.sort || {};
    this.page = query.page || 1;
    this.limit = query.limit || 30;
    this.offset = (this.page - 1) * this.limit;
  }
}
