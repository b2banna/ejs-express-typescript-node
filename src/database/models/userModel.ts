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
  email: { type: String, required: true, unique: true },
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

// indexing for firstName and lastName
UserSchema.index({ firstName: 1, lastName: 1 });

export const UserModel = model(modelName, UserSchema);
