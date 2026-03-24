"use client";

import {
  UserGroupIcon,
  CourseIcon,
  BookOpen01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 mt-1">
          Welcome back! Here is what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value="1,284"
          icon={UserGroupIcon}
          trend="+12% this month"
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          title="Active Courses"
          value="42"
          icon={CourseIcon}
          trend="+3 new"
          color="text-indigo-600"
          bg="bg-indigo-50"
        />
        <StatCard
          title="Course Completions"
          value="856"
          icon={BookOpen01Icon}
          trend="+5.4%"
          color="text-emerald-600"
          bg="bg-emerald-50"
        />
        <StatCard
          title="Total Revenue"
          value="$12,450"
          icon={Wallet01Icon}
          trend="+18%"
          color="text-amber-600"
          bg="bg-amber-50"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4 text-slate-800">
          Recent Registrations
        </h3>
        <div className="text-slate-400 text-sm italic">
          Fetching latest data from server...
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, color, bg }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h4 className="text-2xl font-bold mt-1 text-slate-900">{value}</h4>
        </div>
        <div className={`p-3 rounded-xl ${bg} ${color}`}>
          <HugeiconsIcon icon={icon} size={24} />
        </div>
      </div>
      <div className="mt-4">
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          {trend}
        </span>
      </div>
    </div>
  );
}
