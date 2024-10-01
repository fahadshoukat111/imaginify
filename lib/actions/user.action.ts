import { revalidatePath } from "next/cache";

import User from "../database/models/user.models";
import { connectToDatabase } from "../database/mongoose";

export async function createUser(user) {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {}
}

export async function getUserById(userId) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {}
}

export async function updateUser(clerkId: string, user) {
  try {
    await connectToDatabase();
    const updateUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updateUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updateUser));
  } catch (error) {}
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {}
}

export async function updateUserCredits(userId: string, creditFree: number) {
  try {
    await connectToDatabase();
    const updateUserCredit = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFree } },
      { new: true }
    );
    if (!updateUserCredit) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updateUserCredit));
  } catch (error) {}
}
