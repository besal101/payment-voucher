import { create } from "zustand";

export type cashierDataT = {
  CashierUserID: string;
  CashierUsername: string;
};

type InvoiceModalStore = {
  isOpen: boolean;
  cashier: cashierDataT;
  setCashier: (userId: string, username: string) => void;
  openModal: () => void;
  closeModal: () => void;
};

const useSignatureModal = create<InvoiceModalStore>((set) => ({
  isOpen: false,
  cashier: { CashierUserID: "", CashierUsername: "" },
  setCashier: (userId, username) =>
    set((state) => ({
      cashier: {
        ...state.cashier,
        CashierUserID: userId,
        CashierUsername: username,
      },
    })),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useSignatureModal;
