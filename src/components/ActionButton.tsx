import { useAppStore } from "@/stores/store";
import { Button } from "@mantine/core";
import { useRef } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { useClickOutside } from "@/hooks/useClickOutside";


export const ActionButton = () => {
  const duration = useAppStore((s) => s.duration);
  const isPlaying = useAppStore((s) => s.isPlaying);
  const setIsPlaying = useAppStore((s) => s.setIsPlaying);
  const setProgress = useAppStore((s) => s.setProgress);
  const setShowProgress = useAppStore((s) => s.setShowProgress);
  const toggleShowProgress = useAppStore((s) => s.toggleShowProgress);
  const durationHydrated = useAppStore((s) => s.durationHydrated);


  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = (minutes: number) => {
    if (audioRef.current) {
      audioRef.current.src = `/audio/timer-${minutes}-min.mp3`;
      audioRef.current.play();
    }
  }

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;

      // Hide progress bar for next time
      setShowProgress(false);
    }
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const playButtonRef = useClickOutside<HTMLButtonElement>(() => {
    toggleShowProgress();
  }, isPlaying)


  return (
    <>
      <Button
        className="big-button"
        radius={"xl"}
        ref={playButtonRef}
        style={{
          visibility: durationHydrated ? "visible" : "hidden",
          width: 160,   // Equal width and height for a circle
          height: 160,
          padding: 0,  // Removes extra padding
          display: 'flex',
          borderRadius: '50%', // Ensures a perfect circle
          alignItems: 'center',
          justifyContent: 'center',
        }}
        variant="filled"
        onClick={() => {
          const newPlayStatus = !isPlaying;
          setIsPlaying(newPlayStatus);
          if (newPlayStatus) {
            playAudio(duration);
          }
          if (!newPlayStatus) {
            stopAudio();
          }
        }}
        aria-label={isPlaying ? "Stop" : "Start"}
      >
        <span className={`play${isPlaying ? " hide" : ""} `}>
          <IoPlaySharp size={96} style={{ transform: 'translateX(8px)' }} />
        </span>
      </Button>
      <audio ref={audioRef} onEnded={() => {
        setIsPlaying(false);
        stopAudio();
      }}
        onTimeUpdate={handleTimeUpdate} />
    </>
  )
}
