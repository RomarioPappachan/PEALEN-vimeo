"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const ProtectedRoute = ({ children }) => {
  const { token, checkAuth, logout } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    checkAuth();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !token) {
      logout();
      router.push("/login");
    }
  }, [token, loading, router, logout]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex items-center justify-center space-x-2">
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 bg-[#72C347] rounded-full animate-bounce"></span>
        </div>
      </div>
    );

  return token ? children : null;
};

export default ProtectedRoute;
