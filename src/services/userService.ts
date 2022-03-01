import { IUser, UserModel } from "../database/models/userModel";
import { DbQueryDTO } from "../dtos/dbQueryDTO";

export class UserService {

  public async getAllUsers(dbQueryDTO: DbQueryDTO): Promise<Array<IUser>> {
    const { filter, sort, limit, offset } = dbQueryDTO;
    return await UserModel.find(filter).sort(sort).limit(limit).skip(offset);
  }

  public async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  public async updateUserById(id: string, user: IUser): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }
}
