import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="w-screen h-screen flex">
        <div className="w-1/6 h-screen">
          <Sidebar />
        </div>
        <div className="w-5/6 h-screen bg-[var(--background-secondary)] transition-colors duration-300">
          <div className="h-28 px-[50px]">
            <Navbar />
          </div>
          <div className="h-[calc(100vh-7rem)] px-[50px] py-13 overflow-y-auto">
            <div className="px-9 py-6 min-h-full bg-[var(--background-primary)] rounded-[10px] drop-shadow-sm transition-colors duration-300">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
