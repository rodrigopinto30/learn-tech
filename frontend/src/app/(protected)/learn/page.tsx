"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PlayCircle, Clock, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/my-courses");
        console.log(response.data.data);
        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching student courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <p className="text-slate-400 font-medium animate-pulse">
          Entering your academy...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="text-emerald-500" size={20} />
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Learning Journey
          </h2>
        </div>
        <p className="text-slate-500 font-medium">
          Ready to achieve something great today?
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any) => (
            <Card
              key={course.id}
              className="group border-none shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white flex flex-col h-full"
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-transparent transition-colors z-10" />

                <Image
                  src={
                    course.thumbnail ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800"
                  }
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <Badge className="absolute top-5 left-5 z-20 bg-white/90 backdrop-blur-md text-emerald-700 hover:bg-white border-none rounded-2xl px-4 py-1 shadow-sm font-bold">
                  {course.category || "Development"}
                </Badge>
              </div>

              <CardContent className="p-8 flex-grow space-y-4">
                <h3 className="text-2xl font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors tracking-tight">
                  {course.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">
                  {course.description}
                </p>

                <div className="flex items-center gap-5 text-slate-400 text-[10px] font-black uppercase tracking-wider pt-2">
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={16} className="text-emerald-500" />
                    <span>{course.modules?.length || 0} Modules</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-emerald-500" />
                    <span>Self-paced</span>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-xs font-bold text-slate-400">
                    <span>Progress</span>
                    <span className="text-emerald-600">0%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[0%]" />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <Link href={`/learn/${course.id}`} className="w-full">
                  <Button className="w-full bg-slate-900 hover:bg-emerald-600 text-white rounded-[1.2rem] h-14 font-bold transition-all gap-2 group/btn">
                    Continue Learning
                    <PlayCircle
                      size={20}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No courses yet</h3>
          <p className="text-slate-400 max-w-xs mx-auto mt-2">
            As soon as you are enrolled in a course, it will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
