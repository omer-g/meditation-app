import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, Button, Stack, Center } from "@mantine/core";
import { theme } from "./theme";
import "./style.css"
import { useRef, useState } from "react";
import { IoPlaySharp } from "react-icons/io5";




const DURATIONS = [5, 10, 20, 30];


export default function App() {
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
    }
  }

  const [duration, setDuration] = useState<number>(DURATIONS[0]);
  const [isPlaying, togglePlaying] = useState<boolean>(false);

  return (
    <>
      <ColorSchemeScript forceColorScheme="dark" />
      <MantineProvider theme={theme} forceColorScheme="dark">
        <Center h={400}>
          <Stack gap="xl" align="center" style={{ width: "fit-content" }}>
            <div className="duration" style={{
              visibility: isPlaying ? "hidden" : "visible",
              opacity: isPlaying ? 0 : 1,
            }}>
              {DURATIONS.map((minutes) => (
                <Button
                  key={minutes}
                  variant={duration === minutes ? "filled" : "light"}
                  onClick={() => setDuration(minutes)}>{minutes}
                </Button>
              ))}
            </div>
            <Button radius={"xl"}
              style={{
                width: 160,   // Equal width and height for a circle
                height: 160,
                padding: 0,  // Removes extra padding
                display: 'flex',
                borderRadius: '50%', // Ensures a perfect circle
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                const newPlayStatus = !isPlaying;
                togglePlaying(newPlayStatus);
                if (newPlayStatus) {
                  playAudio(duration);
                }
                if (!newPlayStatus) {
                  stopAudio();
                }
              }}
            >
              <span className={`play${isPlaying ? " hide" : ""} `}>
                <IoPlaySharp size={96} style={{ transform: 'translateX(8px)' }} />
              </span>
            </Button>
            <audio ref={audioRef} onEnded={() => {
              togglePlaying(false);
              stopAudio();
            }} />
          </Stack>
        </Center>
      </MantineProvider>
    </>
  );
}
