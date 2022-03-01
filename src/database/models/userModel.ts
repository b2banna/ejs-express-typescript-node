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
  toJSON: {
    virtuals: true,
    versionKey: false,
  },
  toObject: {
    virtuals: true,
    versionKey: false,
  }
});

export const UserModel = model(modelName, UserSchema);
