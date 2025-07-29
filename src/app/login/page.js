// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/authStore";
// import { login } from "@/api/auth";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login: setAuth } = useAuthStore();
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const data = await login(username, password);
//       console.log(data);

//       setAuth(data.adminDetails, data.token);
//       //   router.push("/dashboard/courses");
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="flex bg-amber-50">
//       <div className="w-3/5 h-screen flex justify-center items-center">
//         <img src="/pealenLogo.svg" alt="Logo" className="w-[300px]" />
//       </div>
//       <form
//         onSubmit={handleSubmit}
//         className="w-2/5 flex flex-col justify-center items-start"
//       >
//         <h1 className="text-3xl font-semibold text-[#1f285b]">Admin Login</h1>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-[300px] outline-none border-[1px] rounded-lg bg-transparent border-[#bfbfc4] p-2 mt-5"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-[300px] outline-none border-[1px] rounded-lg bg-transparent border-[#bfbfc4] p-2 mt-5"
//         />
//         <button
//           type="submit"
//           className="w-[300px] h-[40px] rounded-lg bg-[#20b24c] text-white flex justify-center items-center mt-5"
//         >
//           Submit
//         </button>
//         {error && <p className="text-red-400 mt-4">{error}</p>}
//       </form>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { login } from "@/api/auth";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { user, token, login: setAuth, checkAuth } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // Ensure if user is already logged in
  useEffect(() => {
    checkAuth(); // Load auth state once on mount
  }, []);

  useEffect(() => {
    if (user && token) {
      router.push("/dashboard/courses");
    }
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);
      console.log(data);

      setAuth(data.adminDetails, data.token);
      toast.success("Login Successful");
      router.push("/dashboard/courses");
    } catch (err) {
      setError("Invalid username or password");
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-teal-50">
      {/* Logo Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <img
          src="/pealenLogo.svg"
          alt="Logo"
          className="w-48 sm:w-60 md:w-72 lg:w-80 xl:w-[300px]"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-1/2 flex flex-col justify-center items-center p-6"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1f285b] mb-4">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-10 max-w-xs border border-[#20b24c] rounded-lg p-2 mt-3 outline-none text-[#1f285b] bg-transparent"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-10 max-w-xs border border-[#20b24c] rounded-lg p-2 mt-3 outline-none text-[#1f285b] bg-transparent"
        />

        <button
          type="submit"
          className="w-full max-w-xs h-12 mt-5 bg-[#20b24c] text-white rounded-lg flex justify-center items-center hover:bg-[#199c41] transition-colors duration-200"
        >
          Submit
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}
