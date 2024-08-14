import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { IRegistrationState } from './type';

const initialState: IRegistrationState = {
  step: 1,
};

export const useRegistrationStore = create(
  combine(initialState, (set) => ({
    increaseStep: () => set((state) => ({ step: state.step + 1 })),
    decreaseStep: () => set((state) => ({ step: state.step - 1 })),
    setStep: (step: number) => set({ step }),
  })),
);
