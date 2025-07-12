import { create } from "zustand";

interface TimerState {
  durations: number[],
  duration: number,
  durationHydrated: boolean,
  isPlaying: boolean,
  progress: number,
  showProgress: boolean,

  setDuration: (duration: number) => void,
  setDurationHydrated: (b: boolean) => void,
  setIsPlaying: (isPlayingFlag: boolean) => void,
  setProgress: (progress: number) => void,
  setShowProgress: (showProgressFlag: boolean) => void,
  toggleShowProgress: () => void,

}

export const useAppStore = create<TimerState>((set) => {
  const durations = [5, 10, 20, 30];
  return {
    durations: durations,
    duration: durations[0],
    isPlaying: false,
    progress: 0,
    showProgress: false,
    setDuration: (duration) => set({ duration }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setProgress: (progress) => set({ progress }),
    setShowProgress: (showProgress) => set({ showProgress }),
    toggleShowProgress: () => set((state) => ({ showProgress: !state.showProgress })),
    durationHydrated: false,
    setDurationHydrated: (durationHydrated) => set({ durationHydrated }),
  }
});
