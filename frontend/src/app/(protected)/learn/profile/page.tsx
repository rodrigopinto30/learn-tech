"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Users, Mail, BookOpen, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="p-8 animate-pulse text-slate-400">
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-emerald-600/90 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.8),transparent)]" />
        </div>

        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center p-1">
              <div className="w-full h-full bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <Users size={40} strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 capitalize">
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck size={14} />
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3 text-slate-600 group">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50 transition-colors">
                  <Mail
                    size={18}
                    className="text-slate-400 group-hover:text-emerald-600"
                  />
                </div>
                <span className="text-sm font-medium">{user.email}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-600 group">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-emerald-50 transition-colors">
                  <BookOpen
                    size={18}
                    className="text-slate-400 group-hover:text-emerald-600"
                  />
                </div>
                <span className="text-sm font-medium">
                  Student ID: #{user.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
