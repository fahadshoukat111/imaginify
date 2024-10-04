import { model, models, ObjectId, Schema } from "mongoose";

const UserSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  planId: { type: Number, default: 1 },
  creditBalance: {
    type: Number,
    default: 10,
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const User = models?.User || model("User", UserSchema);
export default User;
