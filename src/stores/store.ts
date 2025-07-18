import { create } from "zustand";
import { clearPauseMark, clearSessionEndedMark } from "@/utils/session";

interface TimerState {
  durations: number[],
  duration: number,
  durationHydrated: boolean,
  isPlaying: boolean,
  progress: number,
  showProgress: boolean,

  setDuration: (duration: number) => void,
  setDurationHydrated: (b: boolean) => void,
  setIsPlaying: (b: boolean) => void,
  setProgress: (n: number) => void,
  setShowProgress: (b: boolean) => void,
  toggleShowProgress: () => void,

  startPauseTimer: (durationMs: number, onElapsed: () => void) => void,
  stopPauseTimer: () => void,

  resetSession: () => void,
}

let pauseTimeout: ReturnType<typeof setTimeout> | null = null;

export const useAppStore = create<TimerState>((set, get) => {
  const durations = [5, 10, 20, 30];

  return {
    durations,
    duration: durations[0],
    durationHydrated: false,
    isPlaying: false,
    progress: 0,
    showProgress: false,

    setDuration: (duration) => set({ duration }),
    setDurationHydrated: (b) => set({ durationHydrated: b }),
    setIsPlaying: (b) => set({ isPlaying: b }),
    setProgress: (n) => set({ progress: n }),
    setShowProgress: (b) => set({ showProgress: b }),
    toggleShowProgress: () => set((s) => ({ showProgress: !s.showProgress })),

    startPauseTimer: (durationMs, onElapsed) => {
      get().stopPauseTimer();
      pauseTimeout = setTimeout(() => {
        pauseTimeout = null;
        onElapsed();
      }, durationMs);
    },
    stopPauseTimer: () => {
      if (pauseTimeout !== null) {
        clearTimeout(pauseTimeout);
        pauseTimeout = null;
      }
    },

    resetSession: () => {
      set({
        isPlaying: false,
        progress: 0,
        showProgress: false,
      });
      clearPauseMark();
      clearSessionEndedMark();
    },
  };
});
