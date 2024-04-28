import React from "react";

export default function ProfileSkeleton() {
  return (
    <div
      role="status"
      className="p-4 border rounded shadow animate-pulse md:p-6 w-full min-h-32"
    >
      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
    </div>
  );
}
