"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
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
import { CourseIcon, ArchiveArrowUpIcon } from "@hugeicons/core-free-icons";
import api from "@/lib/api";

const courseSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Please provide a more detailed description"),
  price: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format (e.g. 49.99)"),
  status: z.enum(["draft", "published"]),
});

type CourseFormValues = z.infer<typeof courseSchema>;

export default function CreateCoursePage() {
  const router = useRouter();

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "0.00",
      status: "draft",
    },
  });

  async function onSubmit(values: CourseFormValues) {
    try {
      console.log("Enviando datos:", values);
      const response = await api.post("/courses", values);

      if (response.data.success) {
        router.push("/admin/courses");
      }
    } catch (error: any) {
      console.error("Status:", error.response?.status);
      console.error("Data del Servidor:", error.response?.data);
      console.error("Mensaje:", error.message);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
          {/* <CourseIcon size={28} /> */}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Create New Course
          </h1>
          <p className="text-slate-500 font-medium">
            Define the core details of your new learning program.
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
                  <Input
                    placeholder="e.g. Master Laravel 12 from Scratch"
                    {...field}
                    className="h-12 border-slate-200 focus:ring-indigo-500"
                  />
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
                  Detailed Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what students will achieve..."
                    {...field}
                    className="min-h-[150px] border-slate-200 resize-none focus:ring-indigo-500"
                  />
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
                      className="h-12 border-slate-200"
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
                    Visibility Status
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-slate-200 text-slate-600">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft (Admin Only)</SelectItem>
                      <SelectItem value="published">
                        Published (Public)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end items-center gap-4 pt-6 border-t border-slate-100">
            <Button
              variant="ghost"
              type="button"
              onClick={() => router.back()}
              className="text-slate-500 hover:bg-slate-50 font-semibold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-10 rounded-xl font-bold transition-all transform active:scale-95"
            >
              Save Course
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
