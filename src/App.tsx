import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, Button, Stack, Center } from "@mantine/core";
import { Progress } from '@mantine/core';
import { theme } from "./theme";
import "./style.css"
import { useRef, useState } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { Preferences } from "@capacitor/preferences";
import { useEffect } from "react";
import { useClickOutside } from "./hooks/useClickOutside";
import { DurationSelect } from "./components/DurationSelect";



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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(false);

  const playButtonRef = useClickOutside<HTMLButtonElement>(() => {
    setShowProgress(prev => !prev);
  }, isPlaying)


  useEffect(() => {
    Preferences.get({ key: "last-duration" }).then(({ value }) => {
      if (value) {
        setDuration(Number(value));
      }
    })
  }, [])

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  return (
    <>
      <ColorSchemeScript forceColorScheme="dark" />
      <MantineProvider theme={theme} forceColorScheme="dark">
        <Center h={400}>
          <Stack gap="xl" align="center" style={{ width: "fit-content" }}>
            <DurationSelect
              duration={duration}
              setDuration={setDuration}
              isPlaying={isPlaying}
              DURATIONS={DURATIONS}
            />

            <Button
              className="big-button"
              radius={"xl"}
              ref={playButtonRef}
              style={{
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
              setShowProgress(false);
              stopAudio();
            }}
              onTimeUpdate={handleTimeUpdate} />
            <Progress size="xl" value={progress} w="70%"
              style={{ visibility: isPlaying && showProgress ? "visible" : "hidden" }}
              styles={{ root: { height: 32 } }}
            />

          </Stack>
        </Center>

      </MantineProvider>
    </>
  );
}
