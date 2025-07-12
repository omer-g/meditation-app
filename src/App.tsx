import "@mantine/core/styles.css";
import { Stack, Center, Transition } from "@mantine/core";
import "@/style.css"
import { DurationSelect } from "@/components/DurationSelect";
import { ActionButton } from "@/components/ActionButton";
import { ProgressBar } from "./components/ProgressBar";
import { useAppStore } from "./stores/store";
import { Preferences } from "@capacitor/preferences";
import { useEffect } from "react";

export default function App() {
  const durationHydrated = useAppStore((s) => s.durationHydrated);
  const setDuration = useAppStore((s) => s.setDuration);
  const setDurationHydrated = useAppStore((s) => s.setDurationHydrated);

  useEffect(() => {
    Preferences.get({ key: "last-duration" }).then(({ value }) => {
      if (value) {
        setDuration(Number(value));
      }
    }).finally(() => setDurationHydrated(true))
  }, [])

  return (
    <>
      <Transition mounted={durationHydrated} transition="fade" duration={500}>
        {(styles) => (
          <div style={styles}>
            <Center h={400}>
              <Stack gap="xl" align="center" style={{ width: "fit-content" }}>
                <DurationSelect />
                <ActionButton />
                <ProgressBar />
              </Stack>
            </Center>
          </div>
        )}
      </Transition>

    </>
  );

}
