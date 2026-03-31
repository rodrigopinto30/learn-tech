import { cn } from "@/lib/utils";
import { Trophy, Star, Target } from "lucide-react";

export default function AchievementsPage() {
  return (
    <div className="p-8 space-y-6 text-center max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex p-4 bg-amber-50 rounded-full text-amber-500 mb-2">
          <Trophy size={48} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">Achievements</h1>
        <p className="text-slate-500">
          Your milestones and rewards for consistent learning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        {[
          {
            label: "Fast Learner",
            desc: "Complete 3 lessons in a day",
            icon: Star,
            color: "text-blue-500",
          },
          {
            label: "Perfect Score",
            desc: "Get 100% in any quiz",
            icon: Target,
            color: "text-purple-500",
          },
          {
            label: "Early Bird",
            desc: "Login 5 days in a row",
            icon: Trophy,
            color: "text-amber-500",
          },
        ].map((badge) => (
          <div
            key={badge.label}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3"
          >
            <badge.icon className={cn("mx-auto", badge.color)} size={32} />
            <h3 className="font-bold text-slate-800">{badge.label}</h3>
            <p className="text-sm text-slate-500">{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
