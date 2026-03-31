"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";
import {
  Users,
  Mail,
  BookOpen,
  ShieldCheck,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const addToast = useToastStore((state) => state.addToast);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  if (!user)
    return <div className="p-8 animate-pulse text-slate-400">Loading...</div>;

  const handleSave = async () => {
    try {
      const response = await api.patch(`/users/${user.id}`, formData);

      if (response.status === 200) {
        updateUser(formData);
        setIsEditing(false);
        addToast("Profile updated correctly", "success");
      }
    } catch (error: any) {
      const message = error.response?.data?.email
        ? "The email is already taken"
        : "Error updating profile";
      addToast(message, "error");
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-emerald-600/90 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.8),transparent)]" />
        </div>

        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6 flex justify-between items-end">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center p-1">
              <div className="w-full h-full bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <Users size={40} strokeWidth={1.5} />
              </div>
            </div>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                isEditing
                  ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100",
              )}
            >
              {isEditing ? (
                <>
                  <Save size={16} /> Save Changes
                </>
              ) : (
                <>
                  <Edit2 size={16} /> Edit Profile
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            {isEditing ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-700"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">
                    Email Address
                  </label>
                  <input
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-700"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 mt-2"
                >
                  <X size={14} /> Cancel edition
                </button>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-2xl font-bold text-slate-800 capitalize">
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck size={14} /> {user.role}
                  </span>
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="grid gap-4 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <BookOpen size={18} className="text-slate-400" />
                  </div>
                  <span className="text-sm font-medium">
                    Student ID: #{user.id}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
