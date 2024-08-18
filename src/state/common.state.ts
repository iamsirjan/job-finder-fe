import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { ICommonState } from './type';

const intialState: ICommonState = {
  isEditMode: false,
  isDrawerOpen: false,
  orgID: '',
  search: '',
};

export const useCommonStore = create(
  combine(intialState, (set) => ({
    setEditMode: (isEditMode: boolean) => set({ isEditMode }),
    setDrawer: (isDrawerOpen: boolean) => set({ isDrawerOpen }),
    setOrgID: (orgID: string) => set({ orgID }),
    setSearch: (search: string) => set({ search }),
  })),
);
