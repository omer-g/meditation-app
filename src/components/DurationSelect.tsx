import { Button } from "@mantine/core";
import { Preferences } from "@capacitor/preferences";
import { useAppStore } from "@/stores/store";
import { useEffect } from "react";



export const DurationSelect = () => {
  const durations = useAppStore((s) => s.durations);
  const duration = useAppStore((s) => s.duration);
  const setDuration = useAppStore((s) => s.setDuration);
  const isPlaying = useAppStore((s) => s.isPlaying);

  const durationHydrated = useAppStore((s) => s.durationHydrated);
  const setDurationHydrated = useAppStore((s) => s.setDurationHydrated);


  const handleDuration = (minutes: number) => {
    setDuration(minutes);
    Preferences.set({ key: "last-duration", value: minutes.toString() })
  }

  useEffect(() => {
    Preferences.get({ key: "last-duration" }).then(({ value }) => {
      if (value) {
        setDuration(Number(value));
      }
    }).finally(() => setDurationHydrated(true))
  }, [])



  return <div className="duration" style={{
    visibility: isPlaying || !durationHydrated ? "hidden" : "visible",
    opacity: isPlaying ? 0 : 1,
  }}>
    {durations.map((minutes) => (
      <Button
        key={minutes}
        variant={duration === minutes ? "filled" : "light"}
        onClick={() => handleDuration(minutes)}
        aria-label={`${minutes} minutes`}
      >
        {minutes}
      </Button>
    ))}
  </div>;
}