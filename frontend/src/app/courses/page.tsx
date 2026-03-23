import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getCourses() {
  const res = await fetch("http://nginx/api/courses", {
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    console.error("Fetch failed with status:", res.status);
    return [];
  }

  const json = await res.json();
  return json.data;
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-slate-900">
        Available Courses
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <Card key={course.id} className="flex flex-col h-full shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground mb-2">
                Modules: {course.modules?.length || 0}
              </div>
              <p className="text-2xl font-bold text-primary">${course.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="cursor-pointer w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
