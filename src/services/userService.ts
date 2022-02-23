import { IUser, UserModel } from "../database/models/userModel";

export class UserService {

  public async getAllUsers(filter: any, sort: any) {
    return await UserModel.find({ ...filter }).sort({ ...sort });
  }

  public async updateUserById(id: string, user: IUser) {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }
}
