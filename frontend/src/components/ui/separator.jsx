"use client";
import React from "react";
import * as Separator from "@radix-ui/react-separator";

export default function separator() {
  return (
    <Separator.Root
      className="bg-gray-300 data-[orientation=horizontal]:h-px
            data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full 
            data-[orientation=vertical]:w-px my-[15px]"
    />
  );
}
