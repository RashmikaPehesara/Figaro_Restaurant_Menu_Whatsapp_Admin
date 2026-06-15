"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useData } from "@/context/DataContext";
import Link from "next/link";

function ResetPasswordForm() {
  const clientData = useData();
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit started");

    if (!token) {
      toast.error("Invalid or missing password reset token.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      console.log("api request sent");
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      console.log("api response received", { status: response.status, data });

      if (response.ok && data.success !== false) {
        console.log("success branch entered");
        toast.success(data.message || "Password updated successfully. Redirecting to login...");
        console.log("toast triggered (success)");
        // Wait approximately 2 seconds before redirecting
        setTimeout(() => {
          router.push("/adminfigaro/login");
        }, 2000);
      } else {
        console.log("error branch entered", data.error || data.message);
        toast.error(data.error || data.message || "Something went wrong. Please try again.");
        console.log("toast triggered (error)");
      }
    } catch (error) {
      console.log("error branch entered (exception)", error);
      toast.error("Something went wrong. Please try again.");
      console.log("toast triggered (exception error)");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] sm:max-w-[480px] md:max-w-[500px] lg:max-w-[520px] mx-auto px-4 sm:px-6 md:px-0 flex flex-col justify-center items-center min-h-screen py-10 sm:py-16 md:py-20 overflow-x-hidden">
      <div className="w-full">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
            {clientData?.restaurantInfo?.name || "FIGARO"}
            <span className="text-orange-500">.</span>
          </h1>

          <p className="text-zinc-400 mt-3 text-sm sm:text-base font-medium">
            Admin Control Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/70 border border-zinc-800 backdrop-blur-2xl rounded-[32px] shadow-2xl p-6 sm:p-10 w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
            Set New Password
          </h2>

          {!token ? (
            <div className="text-center space-y-4">
              <p className="text-red-500 font-medium">
                Invalid or missing reset token. Please check your email link.
              </p>
              <div className="mt-6">
                <Link
                  href="/adminfigaro/login"
                  className="text-sm text-zinc-400 hover:text-white transition font-medium underline underline-offset-4"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              {/* New Password */}
              <div className="w-full">
                <label className="block text-sm text-zinc-400 mb-2 ml-1 font-medium">
                  New Password
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

              {/* Confirm Password */}
              <div className="w-full">
                <label className="block text-sm text-zinc-400 mb-2 ml-1 font-medium">
                  Confirm Password
                </label>

                <div className="relative w-full">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 h-5 w-5" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-14 rounded-2xl bg-zinc-800/70 border border-zinc-700 pl-12 pr-12 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-base"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
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
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Updating...
                  </>
                ) : (
                  <>
                    Update Password
                    <span className="translate-y-[1px]">→</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center w-full">
          <p className="text-zinc-600 text-xs sm:text-sm leading-6">
            &copy; {new Date().getFullYear()}{" "}
            {clientData?.restaurantInfo?.name || "Figaro"} Restaurant System.
            <br />
            Secure Admin Access Only.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
