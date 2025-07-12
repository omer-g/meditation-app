import { useEffect } from "react";
import { useAppStore } from "@/stores/store";

export function useAudioStateSync(audioRef: React.RefObject<HTMLAudioElement | null>) {
  const isPlaying = useAppStore(state => state.isPlaying);
  const setIsPlaying = useAppStore(state => state.setIsPlaying);
  const setProgress = useAppStore(state => state.setProgress);
  const setShowProgress = useAppStore(state => state.setShowProgress);

  useEffect(() => {
    const syncAudioState = () => {
      const audio = audioRef.current;
      if (!audio) { return; }

      // If Zustand says playing but audio is paused, fix the state
      if (audio.paused && isPlaying) {
        setIsPlaying(false);
        setProgress(0);
        setShowProgress(false);
      }
      // If audio is playing, nothing needs to be done
    };

    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("pause", syncAudioState);
    }


    window.addEventListener("focus", syncAudioState);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") syncAudioState();
    });

    return () => {
      if (audio) {
        audio.removeEventListener("pause", syncAudioState);
      }
      window.removeEventListener("focus", syncAudioState);
      document.removeEventListener("visibilitychange", syncAudioState);
    };
  }, [audioRef, isPlaying, setIsPlaying, setProgress, setShowProgress]);
}
