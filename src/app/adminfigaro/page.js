"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successful!");
        router.push("/adminfigaro/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] md:max-w-[500px] lg:max-w-[520px] mx-auto px-4 sm:px-6 md:px-0 flex flex-col justify-center items-center min-h-screen py-10 sm:py-16 md:py-20 overflow-x-hidden">
      <ToastContainer theme="dark" />

      <div className="w-full">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
            FIGARO<span className="text-orange-500">.</span>
          </h1>

          <p className="text-zinc-400 mt-3 text-sm sm:text-base font-medium">
            Admin Control Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/70 border border-zinc-800 backdrop-blur-2xl rounded-[32px] shadow-2xl p-6 sm:p-10 w-full">
          
          <form onSubmit={handleSubmit} className="space-y-6 w-full">

            {/* Email */}
            <div className="w-full">
              <label className="block text-sm text-zinc-400 mb-2 ml-1 font-medium">
                Email Address
              </label>

              <div className="relative w-full">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 h-5 w-5" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@figaro.com"
                  className="w-full h-14 rounded-2xl bg-zinc-800/70 border border-zinc-700 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-base"
                />
              </div>
            </div>

            {/* Password */}
            <div className="w-full">
              <label className="block text-sm text-zinc-400 mb-2 ml-1 font-medium">
                Password
              </label>

              <div className="relative w-full">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 h-5 w-5" />

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 rounded-2xl bg-zinc-800/70 border border-zinc-700 pl-12 pr-12 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-base"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Sign In
                  <span className="translate-y-[1px]">→</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center w-full">
          <p className="text-zinc-600 text-xs sm:text-sm leading-6">
            © {new Date().getFullYear()} Figaro Restaurant System.
            <br />
            Secure Admin Access Only.
          </p>
        </div>
      </div>
    </div>
  );
}