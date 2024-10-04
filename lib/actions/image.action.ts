"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.models";
import {connectToDatabase}  from "../database/mongoose";
import ImageModel from "../database/models/image.model";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

const populateUser = (query) =>
  query.populate({
    path: "author",
    model: "User",
    select: "_id firstName lastName",
  });
export async function addImage({ image, userId, path }) {
  console.log("userId", userId);
  try {
    await connectToDatabase();

    const author = await User.findById(userId);
    console.log("author",author)
    if (!author) {
      throw new Error("User not found");
    }

    const newImage = await ImageModel.create({
      ...image,
      author: author._id,
    });

    console.log("Image saved successfully:", newImage);

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    console.error("Error saving image:", error);
    return null;
  }
}

export async function updateImage({ image, userId, path }) {
  try {
    await connectToDatabase();

    const imageToUpdate = await ImageModel.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updatedImage = await ImageModel.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    // handleError(error);
  }
}

export async function deletemage(imageId) {
  try {
    await connectToDatabase();
    await ImageModel.find(imageId);
  } catch (error) {
  } finally {
    redirect("/");
  }
}

export async function getImageById(imageId) {
  try {
    await connectToDatabase();
    const image = await populateUser(ImageModel.findById(imageId));
    return JSON.parse(JSON.stringify(image));
  } catch (error) {}
}
