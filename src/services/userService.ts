import { IUser, UserModel } from "../database/models/userModel";

export class UserService {

  public async getAllUsers(filter: any, sort: any): Promise<Array<IUser>> {
    return await UserModel.find({ ...filter }).sort({ ...sort });
  }

  public async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  public async updateUserById(id: string, user: IUser): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }
}
