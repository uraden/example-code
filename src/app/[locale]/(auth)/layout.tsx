import React from "react";
import { ChildrenProps } from "@/types";

export default function LayoutAuth({ children }: ChildrenProps) {
  return (
  <div className="h-screen flex items-center justify-center">
    {children}
  </div>);
}
