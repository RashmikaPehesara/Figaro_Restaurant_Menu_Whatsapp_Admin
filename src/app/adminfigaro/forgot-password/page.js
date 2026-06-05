"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useData } from "@/context/DataContext";

export default function ForgotPasswordPage() {
  const clientData = useData();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit started", { email });
    setIsLoading(true);

    try {
      console.log("api request sent");
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log("api response received", { status: response.status, data });

      if (response.ok && data.success !== false) {
        console.log("success branch entered");
        toast.success(
          data.message || "Password reset link has been sent to your email address."
        );
        console.log("toast triggered (success)");
        setEmail("");
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
            Reset Password
          </h2>

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
                  
                  className="w-full h-14 rounded-2xl bg-zinc-800/70 border border-zinc-700 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-base"
                />
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
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Link
                  <span className="translate-y-[1px]">→</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <Link
              href="/adminfigaro/login"
              className="text-sm text-zinc-400 hover:text-white transition font-medium underline underline-offset-4"
            >
              Back to Sign In
            </Link>
          </div>
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

      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
    </div>
  );
}
