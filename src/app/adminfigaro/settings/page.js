"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Loader2,
  Settings as SettingsIcon,
  Globe,
  Phone,
  MapPin,
  Clock,
  Layout,
  MessageSquare,
  Video,
  Image as ImageIcon,
  X,
} from "lucide-react";

import { FaFacebook, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";
import ImageUpload from "@/components/admin/ImageUpload";

// ─────────────────────────────────────────────
// Small Toggle Component
// ─────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none ${
        checked ? "bg-orange-500" : "bg-zinc-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

const parseDbWhatsappToLocal = (dbVal) => {
  if (!dbVal) return "";
  let clean = dbVal.trim().replace(/[\s\-()]/g, "");
  // If it starts with +94 or 94, replace with 0
  if (clean.startsWith("+94")) {
    return "0" + clean.substring(3);
  }
  if (clean.startsWith("94") && clean.length > 9) {
    return "0" + clean.substring(2);
  }
  return clean;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  // ─────────────────────────────────────────────
  // Fetch Settings
  // ─────────────────────────────────────────────
  const fetchSettings = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/settings");
      const data = await res.json();

      if (res.ok) {
        const s = data?.settings || data?.data || data || {};

        setSettings({
          features: s.features || {},

          restaurantInfo: {
            name: s.restaurantName || s.restaurantInfo?.name || "",
            phone: s.phoneNumber || s.restaurantInfo?.phone || "",
            whatsapp: parseDbWhatsappToLocal(s.whatsappNumber || s.restaurantInfo?.whatsapp || ""),
            address: s.address || s.restaurantInfo?.address || "",
            openingHours:
              s.openingHours || s.restaurantInfo?.openingHours || "",
          },

          socialMedia: s.socialMedia || {},

          serviceCharge: s.serviceCharge ?? 5,

          mapEmbedUrl: s.mapEmbedUrl || "",

          heroBackgroundImage: s.heroBackgroundImage || "",

          gallery: Array.isArray(s.gallery) ? s.gallery : [],
        });
      } else {
        toast.error("Failed to load settings data");
      }
    } catch (error) {
      console.error("fetchSettings error:", error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  // ─────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────
  const handleFeatureToggle = (feature) => {
    if (!settings) return;

    const features = settings.features || {};

    setSettings({
      ...settings,
      features: {
        ...features,
        [feature]: !features[feature],
      },
    });
  };

  const handleInfoChange = (field, value) => {
    if (!settings) return;

    let updatedValue = value;
    if (field === "whatsapp") {
      updatedValue = value.replace(/\D/g, "").substring(0, 10);
    }

    setSettings({
      ...settings,
      restaurantInfo: {
        ...(settings.restaurantInfo || {}),
        [field]: updatedValue,
      },
    });
  };

  const handleSocialChange = (key, value) => {
    if (!settings) return;

    setSettings({
      ...settings,
      socialMedia: {
        ...(settings.socialMedia || {}),
        [key]: value,
      },
    });
  };

  // ─────────────────────────────────────────────
  // Submit
  // ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!settings) return;

    setIsSubmitting(true);

    try {
      let localWhatsapp = settings.restaurantInfo?.whatsapp || "";
      localWhatsapp = localWhatsapp.trim().replace(/\D/g, "");

      if (!localWhatsapp) {
        toast.error("WhatsApp number is required.");
        setIsSubmitting(false);
        return;
      }

      if (localWhatsapp.length !== 10) {
        toast.error("WhatsApp number must be exactly 10 digits (e.g. 0768638725).");
        setIsSubmitting(false);
        return;
      }

      const prefix = localWhatsapp.substring(0, 3);
      const allowedPrefixes = ["070", "071", "072", "074", "075", "076", "077", "078"];
      if (!allowedPrefixes.includes(prefix)) {
        toast.error("Invalid WhatsApp number prefix. Must start with 070, 071, 072, 074, 075, 076, 077, or 078.");
        setIsSubmitting(false);
        return;
      }

      const dbWhatsapp = "+94" + localWhatsapp.substring(1);

      // Keep state as local number (07xxxxxxxx) so the user never sees +94
      setSettings((prev) => ({
        ...prev,
        restaurantInfo: {
          ...prev.restaurantInfo,
          whatsapp: localWhatsapp,
        },
      }));

      const payload = {
        restaurantName: settings.restaurantInfo?.name || "",
        phoneNumber: settings.restaurantInfo?.phone || "",
        whatsappNumber: dbWhatsapp,
        address: settings.restaurantInfo?.address || "",
        openingHours: settings.restaurantInfo?.openingHours || "",

        socialMedia: settings.socialMedia || {},

        features: settings.features || {},

        serviceCharge: settings.serviceCharge ?? 5,

        mapEmbedUrl: settings.mapEmbedUrl || "",

        heroBackgroundImage: settings.heroBackgroundImage || "",

        gallery: settings.gallery || [],
      };

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Settings saved successfully!");
        fetchSettings();
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      console.error("handleSubmit error:", error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────
  // Loading State
  // ─────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500 mb-4" />
        <p className="text-zinc-500">Loading settings...</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // Safe Data
  // ─────────────────────────────────────────────
  const HIDDEN_FEATURES = [
    "showWaiterMode",
    "waiterMode",
    "enableWaiterMode",
  ];

  const features = settings?.features || {};

  const visibleFeatures = Object.entries(features).filter(
    ([key]) => !HIDDEN_FEATURES.includes(key)
  );

  const restaurantInfo = settings?.restaurantInfo || {};

  const socialMedia = settings?.socialMedia || {};

  const socialPlatforms = [
    {
      key: "facebook",
      enabledKey: "facebookEnabled",
      label: "Facebook URL",
      icon: <FaFacebook size={14} />,
      placeholder: "https://facebook.com/yourpage",
    },

    {
      key: "instagram",
      enabledKey: "instagramEnabled",
      label: "Instagram URL",
      icon: <FaInstagram size={14} />,
      placeholder: "https://instagram.com/yourpage",
    },

    {
      key: "tiktok",
      enabledKey: "tiktokEnabled",
      label: "TikTok URL",
      icon: <Video size={14} />,
      placeholder: "https://tiktok.com/@yourpage",
    },
  ];

  // ─────────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────────
  return (
    <div className="space-y-8 max-w-4xl">

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Settings
          </h1>

          <p className="text-zinc-400">
            Configure your restaurant profile and app features.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* ───────────────────────────── */}
        {/* App Features */}
        {/* ───────────────────────────── */}
        {visibleFeatures.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                <Layout size={20} />
              </div>

              <h2 className="text-xl font-bold text-white">
                App Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visibleFeatures.map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50"
                >
                  <span className="text-zinc-300 font-medium capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>

                  <Toggle
                    checked={!!value}
                    onChange={() => handleFeatureToggle(key)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────────────────── */}
        {/* Restaurant Information */}
        {/* ───────────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
              <Globe size={20} />
            </div>

            <h2 className="text-xl font-bold text-white">
              Restaurant Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                <SettingsIcon size={14} />
                Restaurant Name
              </label>

              <input
                type="text"
                value={restaurantInfo.name || ""}
                onChange={(e) =>
                  handleInfoChange("name", e.target.value)
                }
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                <Phone size={14} />
                Phone Number
              </label>

              <input
                type="text"
                value={restaurantInfo.phone || ""}
                onChange={(e) =>
                  handleInfoChange("phone", e.target.value)
                }
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                <MessageSquare size={14} />
                WhatsApp Number
              </label>

              <input
                type="text"
                value={restaurantInfo.whatsapp || ""}
                onChange={(e) =>
                  handleInfoChange("whatsapp", e.target.value)
                }
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                <MapPin size={14} />
                Address
              </label>

              <input
                type="text"
                value={restaurantInfo.address || ""}
                onChange={(e) =>
                  handleInfoChange("address", e.target.value)
                }
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                <Clock size={14} />
                Opening Hours
              </label>

              <input
                type="text"
                value={restaurantInfo.openingHours || ""}
                onChange={(e) =>
                  handleInfoChange("openingHours", e.target.value)
                }
                placeholder="e.g. Mon-Sun: 10:00 AM - 11:00 PM"
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:ring-2 focus:ring-orange-500/50 outline-none"
              />
            </div>

          </div>
        </div>

        {/* ───────────────────────────── */}
        {/* Social Media */}
        {/* ───────────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
              <FaInstagram size={20} />
            </div>

            <h2 className="text-xl font-bold text-white">
              Social Media Links
            </h2>
          </div>

          <div className="space-y-6">
            {socialPlatforms.map((platform) => (
              <div key={platform.key} className="space-y-2">

                <div className="flex items-center justify-between">

                  <label className="text-sm font-medium text-zinc-500 flex items-center gap-2">
                    {platform.icon}
                    {platform.label}
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">
                      {socialMedia[platform.enabledKey] !== false
                        ? "Visible"
                        : "Hidden"}
                    </span>

                    <Toggle
                      checked={
                        socialMedia[platform.enabledKey] !== false
                      }
                      onChange={() =>
                        handleSocialChange(
                          platform.enabledKey,
                          !(
                            socialMedia[platform.enabledKey] !== false
                          )
                        )
                      }
                    />
                  </div>
                </div>

                <input
                  type="text"
                  value={socialMedia[platform.key] || ""}
                  onChange={(e) =>
                    handleSocialChange(
                      platform.key,
                      e.target.value
                    )
                  }
                  placeholder={platform.placeholder}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl text-white focus:ring-2 focus:ring-orange-500/50 outline-none placeholder-zinc-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ───────────────────────────── */}
        {/* Hero Background */}
        {/* ───────────────────────────── */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
              <ImageIcon size={20} />
            </div>

            <h2 className="text-xl font-bold text-white">
              Hero Background Image
            </h2>
          </div>

          <p className="text-zinc-500 text-sm mb-6">
            This image appears as the full-screen background on your homepage hero section.
          </p>

          {/* Preview */}
          {settings?.heroBackgroundImage && (
            <div className="mb-5 relative rounded-2xl overflow-hidden border border-zinc-700 h-40 bg-zinc-800">

              <img
                src={settings.heroBackgroundImage}
                alt="Hero background preview"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                <span className="text-xs text-zinc-300 bg-black/60 px-2 py-1 rounded-lg">
                  Current hero image
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSettings({
                    ...settings,
                    heroBackgroundImage: "",
                  })
                }
                className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <ImageUpload
            value={settings?.heroBackgroundImage || ""}
            onChange={(url) =>
              setSettings({
                ...settings,
                heroBackgroundImage: url,
              })
            }
            label="Upload Hero Image"
          />
        </div>

        {/* ───────────────────────────── */}
        {/* Bottom Save Button */}
        {/* ───────────────────────────── */}
        <div className="pt-2 pb-6">

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-base transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Save size={20} />
            )}

            <span className="text-center">
              Save Settings
            </span>
          </button>

        </div>

      </form>
    </div>
  );
}