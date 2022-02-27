import { model, Schema } from 'mongoose';

const modelName: string = "users";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
}, {
  timestamps: true,
});

export const UserModel = model(modelName, UserSchema);
