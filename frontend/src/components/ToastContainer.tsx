"use client";

import React, { useEffect, useState } from "react";
import { useToastStore } from "../store/useToastStore";
import { CheckCircle, AlertCircle, Info, TriangleAlert, X } from "lucide-react";

const ICON_MAP: any = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <TriangleAlert className="w-5 h-5 text-yellow-500" />,
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast: any) => (
        <div
          key={toast.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg border border-gray-100 animate-in fade-in slide-in-from-right-4"
        >
          <div className="flex items-center gap-3">
            {ICON_MAP[toast.type]}
            <p className="text-sm font-medium text-gray-800">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
