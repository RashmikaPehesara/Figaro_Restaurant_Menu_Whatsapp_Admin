"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  Shield, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Loader2, 
  Save, 
  KeyRound,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "react-toastify";

export default function SecurityPage() {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Password update form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Email update form state
  const [newEmail, setNewEmail] = useState("");
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  const fetchSecurityDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/security");
      const data = await response.json();

      if (response.ok) {
        setEmail(data.email || "");
        // Keep newEmail field empty by default
        setNewEmail("");
        setIsVerified(data.verified ?? true);
      } else {
        throw new Error(data.error || "Failed to load security details");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load account security info");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSecurityDetails();
  }, [fetchSecurityDetails]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (isUpdatingPassword) return;

    if (!currentPassword) {
      toast.error("Please enter current password");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter new password");
      return;
    }

    if (!confirmNewPassword) {
      toast.error("Please confirm new password");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await fetch("/api/admin/security/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.error === "Incorrect current password" || res.status === 400) {
          toast.error("Current password is incorrect");
        } else {
          toast.error(data.error || "Something went wrong");
        }
        setIsUpdatingPassword(false);
        return;
      }

      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (isUpdatingEmail) return;

    if (!newEmail) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error("Invalid email format");
      return;
    }

    setIsUpdatingEmail(true);
    try {
      const res = await fetch("/api/admin/security", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update email");
      }

      toast.success(data.message || "Email updated successfully");
      setEmail(newEmail);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-4xl w-full animate-pulse pb-16">
        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 bg-zinc-900 border border-zinc-800 rounded-xl w-1/3" />
          <div className="h-4 bg-zinc-900 border border-zinc-800 rounded-xl w-1/2" />
        </div>
        
        {/* Account Info Skeleton */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8 space-y-6">
          <div className="h-6 bg-zinc-800 rounded-xl w-1/4" />
          <div className="h-12 bg-zinc-800/40 rounded-2xl border border-zinc-800" />
        </div>

        {/* Change Password Skeleton */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8 space-y-6">
          <div className="h-6 bg-zinc-800 rounded-xl w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-12 bg-zinc-800/40 rounded-2xl border border-zinc-800" />
            <div className="h-12 bg-zinc-800/40 rounded-2xl border border-zinc-800" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl w-full min-w-0 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          
          Security Settings
        </h1>
        <p className="text-zinc-400">Manage your account security and login credentials.</p>
      </div>

      {/* Account Info */}
      <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 lg:p-8 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="text-orange-500 h-5 w-5" />
          Account Information
        </h2>
        <div className="bg-zinc-800/30 border border-zinc-800/80 p-5 rounded-2xl flex flex-col gap-1 w-full">
          <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Current Admin Email</span>
          <span className="text-white font-medium break-all">{email}</span>
        </div>
      </div>

      {/* Change Password Form */}
      <form onSubmit={handlePasswordSubmit} className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 lg:p-8 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <KeyRound className="text-orange-500 h-5 w-5" />
          Change Password
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">Current Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type={showCurrentPassword ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isUpdatingPassword}
                placeholder="••••••••"
                className="block w-full pl-11 pr-12 py-3.5 bg-zinc-800/30 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isUpdatingPassword}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-12 py-3.5 bg-zinc-800/30 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">Confirm New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  disabled={isUpdatingPassword}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-12 py-3.5 bg-zinc-800/30 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdatingPassword}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isUpdatingPassword ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Updating Password...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Update Password
            </>
          )}
        </button>
      </form>

      {/* Change Email Form */}
      <form onSubmit={handleEmailSubmit} className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 lg:p-8 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Mail className="text-orange-500 h-5 w-5" />
          Change Email Address
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-500 mb-2 ml-1">Current Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-600" />
              </div>
              <input
                type="text"
                disabled
                value={email}
                className="block w-full pl-11 pr-4 py-3.5 bg-zinc-800/10 border border-zinc-800/40 rounded-2xl text-zinc-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2 ml-1">New Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-500" />
              </div>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                disabled={isUpdatingEmail}
                
                className="block w-full pl-11 pr-4 py-3.5 bg-zinc-800/30 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdatingEmail}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isUpdatingEmail ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Updating Email...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Update Email
            </>
          )}
        </button>
      </form>
    </div>
  );
}
