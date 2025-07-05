import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, Stack, Center } from "@mantine/core";
import { theme } from "./theme";
import "@/style.css"
import { DurationSelect } from "@/components/DurationSelect";
import { ActionButton } from "@/components/ActionButton";
import { ProgressBar } from "./components/ProgressBar";

export default function App() {
  return (
    <>
      <ColorSchemeScript forceColorScheme="dark" />
      <MantineProvider theme={theme} forceColorScheme="dark">
        <Center h={400}>
          <Stack gap="xl" align="center" style={{ width: "fit-content" }}>
            <DurationSelect />
            <ActionButton />
            <ProgressBar />
          </Stack>
        </Center>
      </MantineProvider>
    </>
  );
}
