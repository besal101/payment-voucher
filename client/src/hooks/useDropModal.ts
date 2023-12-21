// useDropModal.ts

import { create } from "zustand";

type DropModalStore = {
  isOpen: boolean;
  payload: { [key: string]: string[] };
  currentKey: string | null; // Add a currentKey to track the currently opened modal
  onOpen: (key: string) => void;
  onClose: () => void;
  onFilesUploaded: (files: string[]) => void; // Add a function to handle file uploads
};

const useDropModal = create<DropModalStore>((set) => ({
  isOpen: false,
  payload: {},
  currentKey: null,
  onOpen: (key: string) => set({ isOpen: true, currentKey: key }),
  onClose: () => set({ isOpen: false, currentKey: null }),
  onFilesUploaded: (files) =>
    set((state) => {
      const currentKey = state.currentKey;
      if (currentKey) {
        const updatedPayload = { ...state.payload };
        updatedPayload[currentKey] = files;
        return { payload: updatedPayload };
      }
      return state;
    }),
}));

export default useDropModal;
