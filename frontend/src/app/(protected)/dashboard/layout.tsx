import Sidebar from "@/components/navigation/Sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar type="student" />
      <main className="flex-1 bg-white overflow-y-auto">{children}</main>
    </div>
  );
}
