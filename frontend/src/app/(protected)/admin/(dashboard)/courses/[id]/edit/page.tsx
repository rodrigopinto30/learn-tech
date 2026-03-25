"use client";

import { useEffect } from "react";
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

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "0.00",
      status: "draft",
    },
  });

  useEffect(() => {
    if (!id) return;

    const loadCourse = async () => {
      try {
        console.log("Fetching course with ID:", id);
        const response = await api.get(`/admin/courses/${id}`);
        const course = response.data.data;

        form.reset({
          title: course.title,
          description: course.description,
          price: course.price.toString(),
          status: course.status,
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
    </div>
  );
}
