"use client";
import { StudyRoomTableData } from "@/types/StudyRoom";
import React from "react";

interface UsersIconProps extends React.SVGProps<SVGSVGElement> {}
export const TableComponent = ({ data }: { data: StudyRoomTableData }) => {
  console.log("data, ", data.category);
  return (
    <>
      <div className="w-full max-w-none mx-auto p-4 md:p-6">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full table-auto border-collapse">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
                  카테고리
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {data.category}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
                  한줄설명
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {data.description}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800">
                  참가인원
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="w-5 h-5" />
                    <span>{data.memberNum}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const UsersIcon: React.FC<UsersIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
};
