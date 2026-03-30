"use client";

import Sidebar from "@/components/navigation/Sidebar";
import { UserCircle, LogOut, Bell, Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar type="student" />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Welcome back!
            </h1>
            <p className="text-slate-900 font-bold text-lg">Student Name</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-2xl transition-all">
              <Bell size={20} strokeWidth={2} />
            </button>

            <div className="h-8 w-px bg-slate-100 mx-2" />

            <button
              onClick={logout}
              className="flex items-center gap-3 p-1.5 pr-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100 group"
            >
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm group-hover:bg-emerald-100 transition-colors">
                <UserCircle size={24} strokeWidth={2} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold text-slate-700">Logout</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase">
                  Session
                </span>
              </div>
              <LogOut
                size={16}
                className="text-slate-300 group-hover:text-red-400 transition-colors ml-2"
              />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
