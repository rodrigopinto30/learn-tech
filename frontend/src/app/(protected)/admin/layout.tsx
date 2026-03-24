import Sidebar from "@/components/navigation/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar type="admin" />
      <main className="flex-1 bg-slate-50 overflow-y-auto">{children}</main>
    </div>
  );
}
