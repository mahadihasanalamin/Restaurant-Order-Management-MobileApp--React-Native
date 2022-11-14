import create from "zustand";

type State = {
  timeStamp?: Date;
  ChangeSchedule: (timeStamp: Date) => void;
  CancelSchedule: () => void;
};

export const ScheduleStore = create<State>((set) => ({
  timeStamp: undefined,

  ChangeSchedule(timeStamp: Date) {
    set((state) => ({
      ...state,
      timeStamp: timeStamp,
    }));
  },
  CancelSchedule() {
    set((state) => ({
      ...state,
      timeStamp: undefined,
    }));
  },
}));
