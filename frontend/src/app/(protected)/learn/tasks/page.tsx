"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useToastStore } from "@/store/useToastStore";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  ChevronRight,
  Loader2,
  X,
  Send,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToast = useToastStore((state) => state.addToast);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [link, setLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAssignments = async () => {
    try {
      const response = await api.get("/assignments");
      setAssignments(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!link) return;

    setIsSubmitting(true);
    try {
      await api.post(`/assignments/${selectedTask.id}/submit`, {
        content_link: link,
      });
      addToast("Assignment submitted successfully!", "success");
      setIsModalOpen(false);
      setLink("");
      fetchAssignments();
      addToast("Failed to submit task", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="p-8 flex justify-center">
        <Loader2 className="animate-spin text-emerald-500" />
      </div>
    );

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">My Assignments</h1>
        <p className="text-slate-500">View and submit your course tasks.</p>
      </header>

      <div className="grid gap-4">
        {assignments.map((item: any) => {
          const isSubmitted = item.submissions?.length > 0;
          const isOverdue =
            new Date(item.due_date) < new Date() && !isSubmitted;

          return (
            <div
              key={item.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all"
            >
              <div className="flex gap-5 items-start">
                <div
                  className={cn(
                    "p-3 rounded-2xl",
                    isSubmitted
                      ? "bg-emerald-50 text-emerald-600"
                      : isOverdue
                        ? "bg-red-50 text-red-500"
                        : "bg-slate-50 text-slate-400",
                  )}
                >
                  {isSubmitted ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <ClipboardList size={24} />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500">{item.course?.title}</p>
                  <span
                    className={cn(
                      "text-xs font-medium flex items-center gap-1 mt-2",
                      isOverdue ? "text-red-500" : "text-slate-400",
                    )}
                  >
                    <Clock size={12} /> Due:{" "}
                    {new Date(item.due_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTask(item);
                  setIsModalOpen(true);
                }}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all",
                  isSubmitted
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-50 text-slate-600 hover:bg-emerald-600 hover:text-white",
                )}
              >
                {isSubmitted ? "View Submission" : "Submit Task"}
                <ChevronRight size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Submit Assignment
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {selectedTask?.title}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitTask} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                    Project Link (GitHub, Drive, etc.)
                  </label>
                  <div className="relative">
                    <LinkIcon
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      required
                      type="url"
                      placeholder="https://github.com/your-repo"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-slate-700"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex gap-3">
                  <AlertCircle
                    className="text-emerald-600 shrink-0"
                    size={20}
                  />
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Make sure the link is public or shared correctly so the
                    instructor can review your work.
                  </p>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Send size={18} /> Send Submission
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
