"use client";

import React, { useState } from "react";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_TASKS = [
  {
    id: 1,
    title: "Introduction to React Hooks",
    course: "Modern Web Dev",
    dueDate: "2026-04-05",
    status: "pending",
  },
  {
    id: 2,
    title: "Database Schema Design",
    course: "Backend Fundamentals",
    dueDate: "2026-03-20",
    status: "completed",
  },
  {
    id: 3,
    title: "UI Components Library",
    course: "Design Systems",
    dueDate: "2026-03-25",
    status: "overdue",
  },
];

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filteredTasks = MOCK_TASKS.filter((task) =>
    filter === "all" ? true : task.status === filter,
  );

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Assignments</h1>
          <p className="text-slate-500">
            Manage your course tasks and deadlines.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all",
                filter === f
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex gap-4 items-start">
              <div
                className={cn(
                  "p-3 rounded-xl shrink-0",
                  task.status === "completed"
                    ? "bg-emerald-50 text-emerald-600"
                    : task.status === "overdue"
                      ? "bg-red-50 text-red-600"
                      : "bg-blue-50 text-blue-600",
                )}
              >
                {task.status === "completed" ? (
                  <CheckCircle2 size={24} />
                ) : (
                  <ClipboardList size={24} />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  {task.title}
                </h3>
                <p className="text-sm text-slate-500 mb-2">{task.course}</p>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-xs flex items-center gap-1 font-medium",
                      task.status === "overdue"
                        ? "text-red-500"
                        : "text-slate-400",
                    )}
                  >
                    <Clock size={12} /> {task.dueDate}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full",
                      task.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : task.status === "overdue"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700",
                    )}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold hover:bg-emerald-600 hover:text-white transition-all group/btn">
              Go to Task
              <ChevronRight
                size={16}
                className="group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <Filter className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-medium">
              No assignments found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
