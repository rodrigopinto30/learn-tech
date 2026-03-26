"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { Course } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { RichEditor } from "@/components/rich-editor";

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

  // Modulos
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Lecciones
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);

  // Contenido de Lección (Rich Text)
  const [editingLessonContent, setEditingLessonContent] = useState<{
    moduleId: number;
    lessonId: number;
    title: string;
    content: string;
  } | null>(null);
  const [lessonContentHtml, setLessonContentHtml] = useState("");
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);

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
    if (id) loadCourse();
  }, [id, form]);

  // ACCIONES DE CURSO
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

  // GESTIoN DE MÓDULOS
  const handleAddModule = async () => {
    if (!newModuleTitle.trim()) return;
    try {
      const response = await api.post(`/courses/${id}/modules`, {
        title: newModuleTitle,
      });
      if (courseData) {
        setCourseData({
          ...courseData,
          modules: [...courseData.modules, response.data.data],
        });
      }
      setNewModuleTitle("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating module", error);
    }
  };

  const handleUpdateModule = async (moduleId: number, newTitle: string) => {
    try {
      await api.put(`/modules/${moduleId}`, { title: newTitle });
      setCourseData((prev) =>
        prev
          ? {
              ...prev,
              modules: prev.modules.map((m) =>
                m.id === moduleId ? { ...m, title: newTitle } : m,
              ),
            }
          : null,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    try {
      await api.delete(`/modules/${moduleId}`);
      setCourseData((prev) =>
        prev
          ? {
              ...prev,
              modules: prev.modules.filter((m) => m.id !== moduleId),
            }
          : null,
      );
    } catch (error) {
      console.error(error);
    }
  };

  // GESTIÓN DE LECCIONES
  const handleAddLesson = async () => {
    if (!newLessonTitle.trim() || !activeModuleId) return;
    try {
      const response = await api.post(`/modules/${activeModuleId}/lessons`, {
        title: newLessonTitle,
      });

      if (courseData && response.data.success) {
        setCourseData({
          ...courseData,
          modules: courseData.modules.map((m) =>
            m.id === activeModuleId
              ? { ...m, lessons: [...(m.lessons || []), response.data.data] }
              : m,
          ),
        });
      }
      setNewLessonTitle("");
      setIsLessonDialogOpen(false);
      setActiveModuleId(null);
    } catch (error) {
      console.error("Error creating lesson", error);
    }
  };

  const handleUpdateLesson = async (
    moduleId: number,
    lessonId: number,
    newTitle: string,
  ) => {
    try {
      await api.put(`/lessons/${lessonId}`, { title: newTitle });
      setCourseData((prev) =>
        prev
          ? {
              ...prev,
              modules: prev.modules.map((m) =>
                m.id === moduleId
                  ? {
                      ...m,
                      lessons: m.lessons.map((l: any) =>
                        l.id === lessonId ? { ...l, title: newTitle } : l,
                      ),
                    }
                  : m,
              ),
            }
          : null,
      );
    } catch (error) {
      console.error("Error updating lesson", error);
    }
  };

  const handleDeleteLesson = async (moduleId: number, lessonId: number) => {
    try {
      await api.delete(`/lessons/${lessonId}`);
      setCourseData((prev) =>
        prev
          ? {
              ...prev,
              modules: prev.modules.map((m) =>
                m.id === moduleId
                  ? {
                      ...m,
                      lessons: m.lessons.filter((l: any) => l.id !== lessonId),
                    }
                  : m,
              ),
            }
          : null,
      );
    } catch (error) {
      console.error("Error deleting lesson", error);
    }
  };

  // GESTIoN DE CONTENIDO (RICH TEXT)
  const handleSaveLessonContent = async () => {
    if (!editingLessonContent) return;

    try {
      const response = await api.put(
        `/lessons/${editingLessonContent.lessonId}`,
        {
          content: lessonContentHtml,
        },
      );

      if (response.data.success) {
        setCourseData((prev) =>
          prev
            ? {
                ...prev,
                modules: prev.modules.map((m) =>
                  m.id === editingLessonContent.moduleId
                    ? {
                        ...m,
                        lessons: m.lessons.map((l: any) =>
                          l.id === editingLessonContent.lessonId
                            ? { ...l, content: lessonContentHtml }
                            : l,
                        ),
                      }
                    : m,
                ),
              }
            : null,
        );

        setIsContentDialogOpen(false);
        setEditingLessonContent(null);
      }
    } catch (error) {
      console.error("Error saving content", error);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg font-bold">
          Edit
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Edit Course
          </h1>
          <p className="text-slate-500 font-medium">
            Modify the details of your course and curriculum.
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
              className="bg-amber-500 hover:bg-amber-600 text-white h-12 px-10 rounded-xl font-bold transition-all shadow-md"
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
            onClick={() => setIsDialogOpen(true)}
            variant="outline"
            className="gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
          >
            Add Module
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {courseData?.modules?.map((module: any) => (
            <AccordionItem
              key={module.id}
              value={`module-${module.id}`}
              className="border rounded-2xl px-4 bg-white shadow-sm relative group"
            >
              <div className="absolute right-12 top-4 z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-indigo-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    const title = prompt("New module title:", module.title);
                    if (title) handleUpdateModule(module.id, title);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete this module?"))
                      handleDeleteModule(module.id);
                  }}
                >
                  Delete
                </Button>
              </div>

              <AccordionTrigger className="hover:no-underline py-4 pr-12">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-500 font-bold text-xs uppercase">
                    Mod {module.order}
                  </div>
                  <h3 className="font-semibold text-slate-900">
                    {module.title}
                  </h3>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-2 pb-6">
                <div className="space-y-2 ml-11 border-l-2 border-slate-100 pl-6">
                  {module.lessons?.map((lesson: any) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 bg-slate-50 border rounded-xl hover:border-indigo-200 transition-colors group/lesson"
                    >
                      <span className="text-sm font-medium text-slate-700">
                        {lesson.title}
                      </span>

                      <div className="flex items-center gap-1 opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-indigo-600 hover:bg-indigo-100"
                          onClick={() => {
                            setEditingLessonContent({
                              moduleId: module.id,
                              lessonId: lesson.id,
                              title: lesson.title,
                              content: lesson.content || "",
                            });
                            setLessonContentHtml(lesson.content || "");
                            setIsContentDialogOpen(true);
                          }}
                        >
                          Content
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-slate-400 hover:text-indigo-600"
                          onClick={() => {
                            const title = prompt(
                              "New lesson title:",
                              lesson.title,
                            );
                            if (title)
                              handleUpdateLesson(module.id, lesson.id, title);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-slate-400 hover:text-red-600"
                          onClick={() => {
                            if (confirm("Delete this lesson?"))
                              handleDeleteLesson(module.id, lesson.id);
                          }}
                        >
                          Del
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-2 text-slate-400 hover:text-indigo-600 mt-2"
                    onClick={() => {
                      setActiveModuleId(module.id);
                      setIsLessonDialogOpen(true);
                    }}
                  >
                    + Add Lesson
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Module</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Module Title</Label>
              <Input
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                placeholder="e.g. Introduction"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddModule} className="bg-indigo-600">
              Create Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Lesson</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Lesson Title</Label>
              <Input
                value={newLessonTitle}
                onChange={(e) => setNewLessonTitle(e.target.value)}
                placeholder="e.g. Setting up the environment"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsLessonDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddLesson} className="bg-indigo-600">
              Create Lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-xl">
              Editing Content:{" "}
              <span className="text-indigo-600">
                {editingLessonContent?.title}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            <RichEditor
              content={lessonContentHtml}
              onChange={setLessonContentHtml}
            />
          </div>

          <DialogFooter className="p-4 border-t bg-white sticky bottom-0">
            <Button
              variant="ghost"
              onClick={() => setIsContentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveLessonContent}
              className="bg-indigo-600 text-white"
            >
              Save Content
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
