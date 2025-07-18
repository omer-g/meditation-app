import { useAppStore } from "@/stores/store";
import { Button } from "@mantine/core";
import { useRef } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { useClickOutside } from "@/hooks/useClickOutside";

import {
  MAX_PAUSE_MS,
  markPauseNow,
  clearPauseMark,
  markSessionEnded,
} from "@/utils/session";

export const ActionButton = () => {
  const duration = useAppStore((s) => s.duration);
  const isPlaying = useAppStore((s) => s.isPlaying);
  const setIsPlaying = useAppStore((s) => s.setIsPlaying);
  const setProgress = useAppStore((s) => s.setProgress);
  const toggleShowProgress = useAppStore((s) => s.toggleShowProgress);
  const durationHydrated = useAppStore((s) => s.durationHydrated);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (minutes: number) => {
    if (audioRef.current) {
      audioRef.current.src = `/audio/timer-${minutes}-min.mp3`;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      const prevSrc = audio.src;
      audio.removeAttribute("src");
      audio.load();
      audio.src = prevSrc;
      audio.load();
    }
    useAppStore.getState().resetSession();
    useAppStore.getState().stopPauseTimer();
  };

  const handlePauseStart = () => {
    markPauseNow();
    useAppStore.getState().startPauseTimer(MAX_PAUSE_MS, () => {
      stopAudio();
    });
  };

  const handleResumeOrStart = () => {
    useAppStore.getState().stopPauseTimer();
    clearPauseMark();
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const playButtonRef = useClickOutside<HTMLButtonElement>(() => {
    toggleShowProgress();
  }, isPlaying);

  return (
    <>
      <Button
        className="big-button"
        radius="xl"
        ref={playButtonRef}
        style={{
          visibility: durationHydrated ? "visible" : "hidden",
          width: 160,
          height: 160,
          padding: 0,
          display: "flex",
          borderRadius: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
        variant="filled"
        onClick={() => {
          if (!isPlaying) {
            playAudio(duration);
          } else {
            stopAudio();
          }
        }}
        aria-label={isPlaying ? "Stop" : "Start"}
      >
        <span className={`play${isPlaying ? " hide" : ""}`}>
          <IoPlaySharp size={96} style={{ transform: "translateX(8px)" }} />
        </span>
      </Button>

      <audio
        ref={audioRef}
        onEnded={async () => {
          await markSessionEnded();
          stopAudio();
        }}
        onPause={handlePauseStart}
        onPlay={handleResumeOrStart}
        onTimeUpdate={handleTimeUpdate}
      />
    </>
  );
};
