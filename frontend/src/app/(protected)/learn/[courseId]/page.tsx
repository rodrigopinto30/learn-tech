"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import {
  PlayCircle,
  CheckCircle2,
  ChevronRight,
  FileText,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await api.get(`/learn/courses/${courseId}`);
        console.log(response.data);
        if (response.data.success) {
          setCourse(response.data.data);
          const firstModule = response.data.data.modules?.[0];
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

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/learn">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full gap-2 text-slate-500 hover:text-emerald-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </Link>
        <Separator orientation="vertical" className="h-4" />
        <h1 className="font-bold text-slate-900 truncate">{course?.title}</h1>
      </div>

      <div className="flex flex-1 gap-8 overflow-hidden">
        <div className="flex-1 space-y-6 overflow-y-auto pr-4 custom-scrollbar">
          <div className="aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center border-8 border-white">
            <div className="text-white flex flex-col items-center gap-4">
              <PlayCircle size={64} className="text-emerald-500 opacity-80" />
              <p className="font-medium text-slate-400">
                Lesson Content: {activeLesson?.title}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {activeLesson?.title}
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
              {activeLesson?.content || "No content available for this lesson."}
            </div>
          </div>
        </div>

        <div className="w-80 bg-white rounded-[2.5rem] shadow-sm border border-slate-50 flex flex-col overflow-hidden">
          <div className="p-6 border-bottom">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <FileText size={18} className="text-emerald-500" />
              Course Content
            </h3>
          </div>

          <ScrollArea className="flex-1 px-4 pb-6">
            <div className="space-y-6">
              {course?.modules?.map((module: any, mIdx: number) => (
                <div key={module.id} className="space-y-3">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
                    M{mIdx + 1}: {module.title}
                  </h4>
                  <div className="space-y-1">
                    {module.lessons?.map((lesson: any) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left group ${
                          activeLesson?.id === lesson.id
                            ? "bg-emerald-50 text-emerald-700 font-bold"
                            : "hover:bg-slate-50 text-slate-600 font-medium"
                        }`}
                      >
                        {activeLesson?.id === lesson.id ? (
                          <PlayCircle size={18} className="text-emerald-500" />
                        ) : (
                          <CheckCircle2
                            size={18}
                            className="text-slate-200 group-hover:text-emerald-300"
                          />
                        )}
                        <span className="text-sm truncate">{lesson.title}</span>
                      </button>
                    ))}
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
