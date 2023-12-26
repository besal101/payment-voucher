// useDropModal.ts
import { create } from "zustand";

type InvoiceModalStore = {
  isOpen: boolean;
  invoiceNumber: number | null;
  openModal: (invoiceNumber: number) => void;
  closeModal: () => void;
};

const useInvoiceModal = create<InvoiceModalStore>((set) => ({
  isOpen: false,
  invoiceNumber: null,
  openModal: (invoiceNumber) => set({ isOpen: true, invoiceNumber }),
  closeModal: () => set({ isOpen: false, invoiceNumber: null }),
}));

export default useInvoiceModal;
