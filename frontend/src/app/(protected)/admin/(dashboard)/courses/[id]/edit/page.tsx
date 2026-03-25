"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { PencilEdit01Icon } from "@hugeicons/react";
import api from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Course } from "@/types";

const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description is too short"),
  price: z.string().min(1, "Price is required"),
  status: z.enum(["draft", "published"]),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [courseData, setCourseData] = useState<Course | null>(null);

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "0.00",
      status: "draft",
    },
  });

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const response = await api.get(`/admin/courses/${id}`);
        const data = response.data.data;

        setCourseData(data);

        form.reset({
          title: data.title,
          description: data.description,
          price: data.price.toString(),
          status: data.status,
        });
      } catch (error) {
        console.error("Error loading course", error);
      }
    };
    loadCourse();
  }, [id, form]);

  async function onSubmit(values: CourseFormValues) {
    try {
      const response = await api.put(`/courses/${id}`, values);
      if (response.data.success) {
        router.push("/admin/courses");
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg">
          {/* <PencilEdit01Icon size={28} /> */}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Edit Course
          </h1>
          <p className="text-slate-500 font-medium">
            Modify the details of your course.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-semibold">
                  Course Title
                </FormLabel>
                <FormControl>
                  <Input {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-semibold">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="min-h-[150px] resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">
                    Price (USD)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-semibold">
                    Status
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-slate-50">
            <Button
              variant="ghost"
              type="button"
              onClick={() => router.back()}
              className="font-semibold text-slate-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white h-12 px-10 rounded-xl font-bold transition-all transform active:scale-95 shadow-md shadow-amber-100"
            >
              Update Course
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-12 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Course Curriculum
            </h2>
            <p className="text-slate-500 text-sm">
              Organize your modules and lessons.
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
          >
            {/* <PlusSignIcon size={18} /> */}
            Add Module
          </Button>
        </div>

        {/* Si el curso tiene módulos, los mostramos */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {courseData?.modules?.map((module: any) => (
            <AccordionItem
              key={module.id}
              value={`module-${module.id}`}
              className="border rounded-2xl px-4 bg-slate-50/50"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-white border rounded-lg shadow-sm">
                    {/* <BookOpen01Icon size={20} className="text-indigo-500" /> */}
                    Book
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Module {module.order}
                    </span>
                    <h3 className="font-semibold text-slate-900 leading-none mt-1">
                      {module.title}
                    </h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                <div className="space-y-2 ml-11 border-l-2 border-slate-200 pl-6">
                  {module.lessons.map((lesson: any) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 bg-white border rounded-xl hover:border-indigo-300 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        {/* <PlayListIcon size={18} className="text-slate-400 group-hover:text-indigo-500" /> */}
                        Play list
                        <span className="text-sm font-medium text-slate-700">
                          {lesson.title}
                        </span>
                      </div>
                      {lesson.is_preview && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase">
                          Preview
                        </span>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-slate-500 hover:text-indigo-600 mt-2"
                  >
                    {/* <PlusSignIcon size={16} /> */}
                    Add Lesson
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
