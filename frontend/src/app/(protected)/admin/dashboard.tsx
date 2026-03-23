"use client";

import { useAuthStore } from "@/src/store/useAuthStore";
import { Button } from "@/src/components/ui/button";
// import { DashboardSquare01Icon } from "@hugeicons/react";

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          {/* <DashboardSquare01Icon className="w-8 h-8 text-indigo-600" /> */}
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
          <h3 className="font-medium text-slate-500">Role</h3>
          <p className="text-2xl font-bold capitalize text-indigo-600">
            {user?.role}
          </p>
        </div>
      </div>
    </div>
  );
}
