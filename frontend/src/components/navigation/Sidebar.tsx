"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  GraduationCap,
  ClipboardList,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  type: "admin" | "student";
}

export default function Sidebar({ type }: SidebarProps) {
  const pathname = usePathname();

  const theme =
    type === "admin"
      ? {
          bg: "bg-slate-900",
          text: "text-slate-400",
          active: "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20",
          hover: "hover:bg-slate-800 hover:text-white",
          accent: "text-indigo-400",
          logo: "text-indigo-500",
        }
      : {
          bg: "bg-slate-50/50",
          text: "text-slate-500",
          active: "bg-white text-emerald-600 shadow-sm border-slate-100 border",
          hover: "hover:bg-white hover:text-emerald-500 hover:shadow-sm",
          accent: "text-emerald-600",
          logo: "text-emerald-600",
        };

  const menuItems =
    type === "admin"
      ? [
          {
            label: "Overview",
            icon: LayoutDashboard,
            href: "/admin/dashboard",
          },
          { label: "Courses", icon: BookOpen, href: "/admin/courses" },
          { label: "Students", icon: Users, href: "/admin/students" },
          { label: "Settings", icon: Settings, href: "/admin/settings" },
        ]
      : [
          { label: "My Courses", icon: GraduationCap, href: "/learn" },
          { label: "Assignments", icon: ClipboardList, href: "/learn/tasks" },
          { label: "Achievements", icon: Trophy, href: "/learn/achievements" },
          { label: "Profile", icon: Users, href: "/learn/profile" },
        ];

  return (
    <aside
      className={cn(
        "w-72 flex flex-col h-screen border-r border-slate-100 transition-all",
        theme.bg,
      )}
    >
      <div className="p-8 flex items-center gap-3">
        <div className={cn("p-2.5 rounded-2xl bg-white shadow-sm", theme.logo)}>
          <GraduationCap size={24} strokeWidth={2.5} />
        </div>
        <span
          className={cn(
            "text-xl font-bold tracking-tight",
            type === "admin" ? "text-white" : "text-slate-800",
          )}
        >
          LearnTech{" "}
          <span className={theme.accent}>
            {type === "admin" ? "Pro" : "Edu"}
          </span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl font-medium transition-all duration-300",
                theme.text,
                theme.hover,
                isActive && theme.active,
              )}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(
                  "transition-colors",
                  isActive ? "" : "opacity-80",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
