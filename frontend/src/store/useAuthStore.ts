import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  updateUser: (data: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });
        Cookies.set('user_role', user.role, { expires: 7 }); 
        
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        Cookies.remove('token');
        Cookies.remove('user_role');
        set({ user: null, token: null, isAuthenticated: false });
        window.location.href = '/login'; 
      },
      updateUser: (data) => {
        set((state) => {
          if (!state.user) return state;
          const updatedUser = { ...state.user, ...data };
          
         return { user: updatedUser };
        });
      },
    }),
    { 
      name: 'learn-tech-auth',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);