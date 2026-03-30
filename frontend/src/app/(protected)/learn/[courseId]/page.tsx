"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import {
  PlayCircle,
  CheckCircle2,
  FileText,
  Loader2,
  ArrowLeft,
  CircleCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await api.get(`/learn/courses/${courseId}`);
        if (response.data.success) {
          const courseData = response.data.data;
          setCourse(courseData);

          if (courseData.completed_lessons_ids) {
            setCompletedLessonIds(courseData.completed_lessons_ids);
          }

          const firstModule = courseData.modules?.[0];
          const firstLesson = firstModule?.lessons?.[0];
          if (firstLesson) setActiveLesson(firstLesson);
        }
      } catch (error) {
        console.error("Error loading course detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  const handleToggleComplete = async () => {
    if (!activeLesson || isToggling) return;

    setIsToggling(true);
    try {
      const response = await api.post(
        `/lessons/${activeLesson.id}/toggle-complete`,
      );

      if (response.data.success) {
        if (response.data.completed) {
          setCompletedLessonIds((prev) => [...prev, activeLesson.id]);
        } else {
          setCompletedLessonIds((prev) =>
            prev.filter((id) => id !== activeLesson.id),
          );
        }
      }
    } catch (error) {
      console.error("Error toggling lesson completion:", error);
    } finally {
      setIsToggling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  const isCurrentLessonCompleted = completedLessonIds.includes(
    activeLesson?.id,
  );

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/learn">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-2 text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </Link>
        <Separator orientation="vertical" className="h-4" />
        <h1 className="font-bold text-slate-900 truncate">{course?.title}</h1>
      </div>

      <div className="flex flex-1 gap-8 overflow-hidden">
        <div className="flex-1 space-y-6 overflow-y-auto pr-4 custom-scrollbar pb-10">
          <div className="aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center border-8 border-white relative group">
            <div className="text-white flex flex-col items-center gap-4 transition-transform group-hover:scale-110 duration-500">
              <PlayCircle size={64} className="text-emerald-500 opacity-80" />
              <p className="font-medium text-slate-400">
                Playing: {activeLesson?.title}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50 space-y-8">
            <div className="flex justify-between items-start gap-4">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeLesson?.title}
              </h2>

              <Button
                onClick={handleToggleComplete}
                disabled={isToggling}
                className={`rounded-2xl px-6 h-12 font-bold transition-all duration-300 gap-2 ${
                  isCurrentLessonCompleted
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-slate-200"
                }`}
              >
                {isToggling ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : isCurrentLessonCompleted ? (
                  <>
                    <CircleCheck size={20} />
                    Completed
                  </>
                ) : (
                  "Mark as finished"
                )}
              </Button>
            </div>

            <Separator className="bg-slate-100" />

            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
              {activeLesson?.content || "No content available for this lesson."}
            </div>
          </div>
        </div>

        <div className="w-80 bg-white rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-50">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <FileText size={18} className="text-emerald-500" />
              Course Content
            </h3>
          </div>

          <ScrollArea className="flex-1 px-4 pb-6">
            <div className="space-y-6 pt-6">
              {course?.modules?.map((module: any, mIdx: number) => (
                <div key={module.id} className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-3">
                    Module {mIdx + 1}
                  </h4>
                  <div className="space-y-1">
                    {module.lessons?.map((lesson: any) => {
                      const isCompleted = completedLessonIds.includes(
                        lesson.id,
                      );
                      const isActive = activeLesson?.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left group ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/50"
                              : "hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          <div className="shrink-0">
                            {isCompleted ? (
                              <CircleCheck
                                size={18}
                                className="text-emerald-500"
                              />
                            ) : isActive ? (
                              <PlayCircle
                                size={18}
                                className="text-emerald-500 animate-pulse"
                              />
                            ) : (
                              <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-200 group-hover:border-emerald-300 transition-colors" />
                            )}
                          </div>
                          <span
                            className={`text-sm truncate ${isActive ? "font-bold" : "font-medium"}`}
                          >
                            {lesson.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
