import { Users, Mail, BookOpen } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="h-32 bg-emerald-600" />
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-md flex items-center justify-center p-1">
              <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                <Users size={40} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Student Name
              </h2>
              <p className="text-slate-500">Full Stack Developer Student</p>
            </div>

            <div className="grid gap-4 border-t pt-6">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail size={18} /> <span>student@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <BookOpen size={18} /> <span>12 Courses Enrolled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
