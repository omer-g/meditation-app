import { Button } from "@mantine/core";
import { Preferences } from "@capacitor/preferences";

interface Props {
    duration: number;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    isPlaying: boolean;
    DURATIONS: number[];
}

export const DurationSelect = ({ duration, setDuration, isPlaying, DURATIONS }: Props) => {
    const handleDuration = (minutes: number) => {
        setDuration(minutes);
        Preferences.set({ key: "last-duration", value: minutes.toString() })
    }

    return <div className="duration" style={{
        visibility: isPlaying ? "hidden" : "visible",
        opacity: isPlaying ? 0 : 1,
    }}>
        {DURATIONS.map((minutes) => (
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