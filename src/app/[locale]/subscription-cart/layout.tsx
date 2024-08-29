"use client";
import MainLayout from "../layoutComponent/MainLayout";
import { ChildrenProps } from "@/types";
import dynamic from "next/dynamic";

const ProfileLayout = ({ children }: ChildrenProps) => {
  return (
    <MainLayout>
      <div>{children}</div>
    </MainLayout>
  );
};

// export default ProfileLayout
export default dynamic(() => Promise.resolve(ProfileLayout), { ssr: false });
