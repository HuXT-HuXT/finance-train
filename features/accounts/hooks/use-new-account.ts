// created at 3:01:20

import { create } from 'zustand';

type NewAccountState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// () => {} - returns method; () => ({}) - returns object !!!
export const useNewAccount = create<NewAccountState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({isOpen: false }),
}));

// next step (3:02:33) go back to \components\new-account-sheet.tsx