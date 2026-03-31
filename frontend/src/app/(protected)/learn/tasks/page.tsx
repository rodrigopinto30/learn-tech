import { ClipboardList, Clock, CheckCircle2 } from "lucide-react";

export default function AssignmentsPage() {
  return (
    <div className="p-8 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">My Assignments</h1>
        <p className="text-slate-500">
          Keep track of your pending tasks and deadlines.
        </p>
      </header>

      <div className="grid gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <ClipboardList size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">
                Final Project: UI Design
              </h3>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <Clock size={14} /> Due in 2 days
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors">
            View Task
          </button>
        </div>
      </div>
    </div>
  );
}
