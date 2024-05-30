import { create } from 'zustand';
import { combine } from 'zustand/middleware';

const intialState: ICommonState = {
  isEditMode: false,
};

export const useCommonStore = create(
  combine(intialState, (set) => ({
    setEditMode: (isEditMode: boolean) => set({ isEditMode }),
  })),
);
