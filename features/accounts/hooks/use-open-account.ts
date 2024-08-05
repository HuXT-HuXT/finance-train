// created at 4:34:00 - copy code from use-new-account.ts and modify

import { create } from 'zustand';

type OpenAccountState = {
  id?: string,
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

// () => {} - returns method; () => ({}) - returns object !!!
export const useOpenAccount = create<OpenAccountState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({isOpen: false, id: undefined }),
}));

// next step (4:34:57) - copy and rename file features\accounts\components\new-account-sheet.tsx to edit-account-sheet.tsx