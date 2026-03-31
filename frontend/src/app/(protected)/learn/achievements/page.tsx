"use client";

import React from "react";
import {
  Trophy,
  Star,
  Target,
  Zap,
  Flame,
  Award,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Fast Learner",
    desc: "Complete 3 lessons in a single day",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    unlocked: true,
  },
  {
    id: 2,
    title: "Perfect Score",
    desc: "Get 100% in your first quiz",
    icon: Target,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    unlocked: true,
  },
  {
    id: 3,
    title: "Course Finisher",
    desc: "Complete your first full course",
    icon: Trophy,
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "border-blue-100",
    unlocked: false,
  },
  {
    id: 4,
    title: "Daily Streak",
    desc: "Login 7 days in a row",
    icon: Flame,
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-100",
    unlocked: true,
  },
  {
    id: 5,
    title: "Contributor",
    desc: "Submit your first assignment",
    icon: Award,
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
    unlocked: false,
  },
  {
    id: 6,
    title: "Top Student",
    desc: "Rank in the top 10% this month",
    icon: Star,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    unlocked: false,
  },
];

export default function AchievementsPage() {
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;
  const progressPercentage = (unlockedCount / ACHIEVEMENTS.length) * 100;

  return (
    <div className="p-8 space-y-10 max-w-6xl mx-auto">
      {/* Header & Global Progress */}
      <header className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="p-4 bg-amber-50 rounded-2xl text-amber-500">
          <Trophy size={48} strokeWidth={1.5} />
        </div>
        <div className="flex-1 space-y-3 w-full">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Your Achievements
              </h1>
              <p className="text-slate-500">
                You have unlocked {unlockedCount} out of {ACHIEVEMENTS.length}{" "}
                milestones.
              </p>
            </div>
            <span className="text-2xl font-bold text-emerald-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={cn(
                "relative group p-6 rounded-3xl border transition-all duration-300",
                achievement.unlocked
                  ? `${achievement.bg} ${achievement.border} hover:shadow-md cursor-default`
                  : "bg-white border-slate-100 opacity-70 grayscale-[0.5]",
              )}
            >
              {!achievement.unlocked && (
                <div className="absolute top-4 right-4 text-slate-300">
                  <Lock size={18} />
                </div>
              )}
              {achievement.unlocked && (
                <div className="absolute top-4 right-4 text-emerald-500 animate-in zoom-in duration-500">
                  <CheckCircle2 size={18} />
                </div>
              )}

              <div className="space-y-4">
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300",
                    achievement.unlocked ? "bg-white shadow-sm" : "bg-slate-50",
                  )}
                >
                  <Icon
                    className={
                      achievement.unlocked
                        ? achievement.color
                        : "text-slate-300"
                    }
                    size={28}
                  />
                </div>

                <div>
                  <h3
                    className={cn(
                      "font-bold text-lg",
                      achievement.unlocked
                        ? "text-slate-800"
                        : "text-slate-400",
                    )}
                  >
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {achievement.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
