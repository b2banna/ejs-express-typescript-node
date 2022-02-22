import { IUser, UserModel } from "../database/models/userModel";

export class UserService {

  public async getAllUsers() {
    return await UserModel.find({});
  }

  public async updateUserById(id: string, user: IUser) {
    return await UserModel.findByIdAndUpdate(id, user, { new: true });
  }
}
