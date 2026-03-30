import { useState } from 'react';
import { Toast, ToastType } from '../types'; 

export const useToastLogic = () => {
  const [items, setItems] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setItems((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type };
    
    setItems((prev) => [...prev, newToast]);
    
    setTimeout(() => removeToast(id), 3000);
  };

  return { items, addToast, removeToast };
};