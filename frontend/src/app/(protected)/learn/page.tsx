"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
// import { UniversityIcon } from "@hugeicons/react";

export default function StudentDashboard() {
  const { user, logout } = useAuthStore();

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-semibold mb-2">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-muted-foreground">
          This is your private learning area.
        </p>
      </div>
    </div>
  );
}
