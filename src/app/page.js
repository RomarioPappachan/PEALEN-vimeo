"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

function page() {
  const { user, token, checkAuth } = useAuthStore();

  const router = useRouter();

  // Ensure if user is already logged in
  useEffect(() => {
    checkAuth(); // Load auth state once on mount
  }, []);

  useEffect(() => {
    if (user && token) {
      router.push("/dashboard/courses");
    } else {
      router.push("/login");
    }
  }, [user, token]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <img src="/pealenLogo.svg" alt="Logo" className="w-[300px]" />
    </div>
  );
}

export default page;
