import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { FilterState, IJobFilter } from './interface';

const initialState: FilterState = {
  jobFilter: [],
  jobFilterApply: [],
};

export const useJobFilter = create(
  combine(initialState, (set) => ({
    setJobFilter: (newFilter: IJobFilter) =>
      set((state) => ({
        jobFilter: [...state.jobFilter, newFilter],
      })),
    removeJobFilter: (value: string, key: string) =>
      set((state) => ({
        jobFilter: state.jobFilter.filter(
          (filter) => !(filter.key === key && filter.value === value),
        ),
      })),

    clearJobFilter: () =>
      set(() => ({
        jobFilter: [],
      })),
  })),
);
