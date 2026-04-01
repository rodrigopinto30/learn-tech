"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await api.get("/achievements");
        setAchievements(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  const unlockedCount = achievements.filter((a: any) => a.unlocked).length;
  const progress =
    achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0;

  if (loading)
    return (
      <div className="p-8 flex justify-center">
        <LucideIcons.Loader2 className="animate-spin text-emerald-500" />
      </div>
    );

  return (
    <div className="p-8 space-y-10 max-w-6xl mx-auto">
      <header className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="p-4 bg-amber-50 rounded-2xl text-amber-500">
          <LucideIcons.Trophy size={48} strokeWidth={1.5} />
        </div>
        <div className="flex-1 w-full space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Your Achievements
              </h1>
              <p className="text-slate-500">
                You have unlocked {unlockedCount} of {achievements.length}{" "}
                badges.
              </p>
            </div>
            <span className="text-2xl font-bold text-emerald-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((a: any) => {
          // @ts-ignore - Acceso dinámico al icono de Lucide
          const Icon = LucideIcons[a.icon] || LucideIcons.Award;
          return (
            <div
              key={a.id}
              className={cn(
                "relative p-6 rounded-3xl border transition-all duration-300",
                a.unlocked
                  ? "bg-white border-slate-100 shadow-sm"
                  : "bg-slate-50/50 border-slate-100 opacity-60 grayscale",
              )}
            >
              <div className="space-y-4">
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center",
                    a.unlocked ? "bg-slate-50" : "bg-slate-100",
                  )}
                >
                  <Icon
                    className={a.unlocked ? a.color : "text-slate-300"}
                    size={28}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{a.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {a.description}
                  </p>
                </div>
              </div>
              {!a.unlocked && (
                <LucideIcons.Lock
                  size={16}
                  className="absolute top-4 right-4 text-slate-300"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
