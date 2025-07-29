// import Link from 'next/link'
// import React from 'react'

// function Sidebar() {
//   return (
//     <div className='min-h-screen h-full bg-[var(--sidebar-bg-color)] text-[var(--foreground)] dark:bg-[var(--sidebar-bg-color)] dark:text-[var(--foreground)] border-r-[1px] border-r-[#dcdce3] dark:border-r-gray-700 transition-all duration-300'>
//      <div className='w-full flex flex-col items-center justify-center pt-[33px]'>
//      <img src="/pealenLogo.svg" alt="logo" className='w-[116px]' />
//      <h2 className='text-[14px]  text-[#5D5D5D] pt-2'>Make home green</h2>
//      <div className='w-full flex flex-col gap-y-[22px]'>
//       <div className='flex items-center pt-[60px] ps-[50px] gap-x-2'>
//         <img src="/dashboard.svg" alt="" />
//         <h1 className='text-[14px] text-[#9E9E9E]'>Dashboard</h1>

//       </div>
//       <Link href={"/dashboard/courses"}>
//       <div className='flex items-center pt-[60px] ps-[50px] gap-x-2'>
//         <img src="/dashboard.svg" alt="" />
//         <h1 className='text-[14px] text-[#9E9E9E]'>Courses</h1>

//       </div>
//       </Link>
//       <div className='flex items-center pt-[60px] ps-[50px] gap-x-2'>
//         <img src="/dashboard.svg" alt="" />
//         <h1 className='text-[14px] text-[#9E9E9E]'>Dashboard</h1>

//       </div>
//      </div>
//      </div>
//     </div>
//   )
// }

// export default Sidebar

"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BsBarChart } from "react-icons/bs";
import { IoAnalytics } from "react-icons/io5";
import { PiGraduationCap } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi2";
import { GrGroup } from "react-icons/gr";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "/dashboard.svg" },
    { name: "Courses", path: "/dashboard/courses", icon: "/dashboard.svg" },
  ];

  return (
    <div className="w-full min-h-screen h-full bg-[var(--background-primary)] transition-all duration-300">
      <div className="w-full flex flex-col items-center justify-center pt-[33px]">
        <img src="/pealenLogo.svg" alt="logo" className="w-[116px]" />
        <h2 className="text-[14px] text-[#5D5D5D] pt-2">Make home green</h2>
        <div className="w-full flex flex-col mt-12">
          {/* {menuItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <div
                className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all ${
                  pathname === item.path ? "bg-[#2f2f2fbc] text-white" : "text-[#9E9E9E]"
                }`}
              >
                <img src={item.icon} alt={item.name} />
                <h1 className="text-[14px]">{item.name}</h1>
              </div>
            </Link>
          ))} */}

          <Link href={"/dashboard"}>
            <div
              className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all duration-300 ${
                pathname === "/dashboard"
                  ? "bg-[#72c347] text-white"
                  : "text-[#9E9E9E]"
              }`}
            >
              <BsBarChart className="text-2xl" />
              <h1 className="text-[14px]">Dashboard</h1>
            </div>
          </Link>

          <Link href={""}>
            <div
              className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all duration-300 ${
                pathname.includes("/dashboard/analytics")
                  ? "bg-[#72c347] text-white"
                  : "text-[#9E9E9E]"
              }`}
            >
              <IoAnalytics className="text-2xl" />
              <h1 className="text-[14px]">Analytics</h1>
            </div>
          </Link>

          <Link href={"/dashboard/courses"}>
            <div
              className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all duration-300 ${
                pathname.includes("/dashboard/courses")
                  ? "bg-[#72c347] text-white"
                  : "text-[#9E9E9E]"
              }`}
            >
              <PiGraduationCap className="text-2xl" />
              <h1 className="text-[14px]">Courses</h1>
            </div>
          </Link>

          <Link href={""}>
            <div
              className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all duration-300 ${
                pathname.includes("/dashboard/users")
                  ? "bg-[#72c347] text-white"
                  : "text-[#9E9E9E]"
              }`}
            >
              <HiOutlineUsers className="text-2xl" />
              <h1 className="text-[14px]">Users</h1>
            </div>
          </Link>

          <Link href={"/dashboard/faculties"}>
            <div
              className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all duration-300 ${
                pathname.includes("/dashboard/faculties")
                  ? "bg-[#72c347] text-white"
                  : "text-[#9E9E9E]"
              }`}
            >
              <LiaChalkboardTeacherSolid className="text-2xl" />
              <h1 className="text-[14px]">Faculties</h1>
            </div>
          </Link>

          <Link href={""}>
            <div
              className={`flex items-center py-[15px] ps-[50px] gap-x-2 cursor-pointer transition-all duration-300 ${
                pathname.includes("/dashboard/communities")
                  ? "bg-[#72c347] text-white"
                  : "text-[#9E9E9E]"
              }`}
            >
              <GrGroup className="text-2xl" />
              <h1 className="text-[14px]">Communities</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
