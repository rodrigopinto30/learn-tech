"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  CourseIcon,
  UserGroupIcon,
  Settings03Icon,
  Logout03Icon,
  BookOpen01Icon,
  Task01Icon,
  Award01Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

interface SidebarProps {
  type: "admin" | "student";
}

export default function Sidebar({ type }: SidebarProps) {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  const theme =
    type === "admin"
      ? {
          bg: "bg-slate-900",
          text: "text-slate-300",
          active: "bg-indigo-600 text-white",
          hover: "hover:bg-slate-800 hover:text-white",
          accent: "text-indigo-400",
          logo: "text-indigo-500",
        }
      : {
          bg: "bg-white",
          text: "text-slate-600",
          active:
            "bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600",
          hover: "hover:bg-slate-50 hover:text-slate-900",
          accent: "text-emerald-600",
          logo: "text-emerald-600",
        };

  const menuItems =
    type === "admin"
      ? [
          {
            label: "Overview",
            icon: DashboardSquare01Icon,
            href: "/admin/dashboard",
          },
          { label: "Courses", icon: CourseIcon, href: "/admin/courses" },
          { label: "Students", icon: UserGroupIcon, href: "/admin/students" },
          { label: "Settings", icon: Settings03Icon, href: "/admin/settings" },
        ]
      : [
          { label: "My Learning", icon: BookOpen01Icon, href: "/dashboard" },
          { label: "Assignments", icon: Task01Icon, href: "/dashboard/tasks" },
          {
            label: "Achievements",
            icon: Award01Icon,
            href: "/dashboard/achievements",
          },
          { label: "Profile", icon: UserGroupIcon, href: "/dashboard/profile" },
        ];

  return (
    <aside
      className={cn(
        "w-72 flex flex-col h-screen border-r transition-all",
        theme.bg,
      )}
    >
      <div className="p-8 flex items-center gap-3">
        <div
          className={cn("p-2 rounded-lg bg-opacity-10 bg-current", theme.logo)}
        >
          <HugeiconsIcon icon={CourseIcon} size={24} />
        </div>
        <span
          className={cn(
            "text-xl font-bold tracking-tight",
            type === "admin" ? "text-white" : "text-slate-900",
          )}
        >
          LearnTech{" "}
          <span className={theme.accent}>
            {type === "admin" ? "Pro" : "Edu"}
          </span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200",
                theme.text,
                theme.hover,
                isActive && theme.active,
              )}
            >
              <HugeiconsIcon icon={item.icon} size={22} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200/10">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold"
        >
          <HugeiconsIcon icon={Logout03Icon} size={22} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
