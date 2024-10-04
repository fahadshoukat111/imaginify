import React from "react";
import Header from "@/app/components/shared/header";
import TransFormationForm from "@/app/components/shared/transformationForm";
import { transformationTypes } from "@/app/constants";
import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const AddTranformationTypePage = async ({ params: { type } }) => {
  const { userId } = auth();
  console.log("authId",userId)
  const transformation = transformationTypes[type];
  console.log("transformationType", transformation.type);

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  return (
    <>
      <Header
        title={transformation?.title}
        subTitle={transformation?.subTitle}
      />
      <section className="mt-10">
        <TransFormationForm
          action="Add"
          userId={user._id}
          type={transformation.type as any}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTranformationTypePage;
