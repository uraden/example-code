"use client";
import MainLayout from "../layoutComponent/MainLayout";
import { ChildrenProps } from "@/types";
import dynamic from "next/dynamic";

const TermsAndConditions = ({ children }: ChildrenProps) => {
  return (
    <MainLayout>
      <div>{children}</div>
    </MainLayout>
  );
};

export default dynamic(() => Promise.resolve(TermsAndConditions), { ssr: false });