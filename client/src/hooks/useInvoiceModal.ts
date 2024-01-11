// useDropModal.ts
import { create } from "zustand";

import { APPROVALHISTORYRESPONSE, ViewRequestedResponse } from "@/types/types";

type InvoiceModalStore = {
  isOpen: boolean;
  trans: ViewRequestedResponse | undefined;
  history: APPROVALHISTORYRESPONSE | undefined;
  openModal: (
    trans: ViewRequestedResponse,
    history: APPROVALHISTORYRESPONSE
  ) => void;
  closeModal: () => void;
};

const useInvoiceModal = create<InvoiceModalStore>((set) => ({
  isOpen: false,
  trans: undefined,
  history: undefined,
  openModal: (trans: ViewRequestedResponse, history: APPROVALHISTORYRESPONSE) =>
    set({ isOpen: true, trans, history }),
  closeModal: () =>
    set({ isOpen: false, trans: undefined, history: undefined }),
}));

export default useInvoiceModal;
