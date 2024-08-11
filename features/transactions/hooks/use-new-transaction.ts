// created at 6:23:31 - folder features/accounts was copied and renamed to transactions.

import { create } from 'zustand';

type NewTransactionState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

// () => {} - returns method; () => ({}) - returns object !!!
export const useNewTransaction = create<NewTransactionState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({isOpen: false }),
}));