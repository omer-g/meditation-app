import { useEffect } from "react";
import { Center, Stack, Transition } from "@mantine/core";
import { Preferences } from "@capacitor/preferences";

import { useAppStore } from "./stores/store";
import { sessionNeedsReset, hasSessionEnded } from "@/utils/session";

import { ActionButton } from "@/components/ActionButton";
import { DurationSelect } from "@/components/DurationSelect";
import { ProgressBar } from "@/components/ProgressBar";

import "@/style.css";
import "@mantine/core/styles.css";

export default function App() {
  const setDuration = useAppStore(s => s.setDuration);
  const setDurationHydrated = useAppStore(s => s.setDurationHydrated);
  const durationHydrated = useAppStore(s => s.durationHydrated);

  useEffect(() => {
    const hydrate = async () => {
      const { value } = await Preferences.get({ key: "last-duration" });
      if (value) setDuration(Number(value));

      const needsReset = await sessionNeedsReset();
      const sessionWasEnded = await hasSessionEnded();

      if (needsReset || sessionWasEnded) {
        useAppStore.getState().resetSession();
      }

      setDurationHydrated(true);
    };

    hydrate();
  }, []);

  return (
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
  );
}
