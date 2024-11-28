import { create } from 'zustand';
import { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      // This is a mock login - replace with actual API call
      if (email === 'admin@passnote.com' && password === 'password') {
        const user = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin' as const,
        };
        set({ user, isAuthenticated: true });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));