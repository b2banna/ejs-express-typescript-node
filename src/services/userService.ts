import { IUser, UserModel } from "../database/models/userModel";
import { DbQueryDTO } from "../dtos/dbQueryDTO";
import { FILTER_ENUMS } from "../enums/filterEnums";

const filterCondition = (value: any, options: FILTER_ENUMS) => {
  switch (options) {
    case FILTER_ENUMS.LIKE:
      return new RegExp(value, "i");
    default:
      return value;
  }
}

export class UserService {

  public async getAllUsers(dbQueryDTO: DbQueryDTO): Promise<Array<IUser>> {
    const { limit, offset, sort, filter } = dbQueryDTO;

    Object.keys(filter).forEach((key: any) => {
      filter[key] = filterCondition(filter[key], FILTER_ENUMS.LIKE);
    });
    return await UserModel.find({ ...filter }).sort({ ...sort }).limit(limit).skip(offset);
  }

  public async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  public async updateUserById(id: string, user: IUser): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }
}
