import { IObject } from "../interfaces/IObject";

export class DbQueryDTO {
  public filter: IObject<any>;
  public sort: IObject<number>;
  public page: number;
  public limit: number;
  public offset: number;
  constructor(query: IObject<any>) {
    this.filter = query.filter || {};
    this.sort = query.sort || {};
    this.page = query.page || 1;
    this.limit = query.limit || 30;
    this.offset = (this.page - 1) * this.limit;

    Object.keys(this.filter).forEach((key: any) => {
      const value = this.filter[key];
      this.filter[key] = new RegExp(value, "i");
    });
  }
}
