import { useAppStore } from "@/stores/store";
import { Progress } from "@mantine/core";

export const ProgressBar = () => {
  const isPlaying = useAppStore((s) => s.isPlaying);
  const progress = useAppStore((s) => s.progress);
  const showProgress = useAppStore((s) => s.showProgress);

  return (
    <Progress size="xl" value={progress} w="70%"
      style={{ visibility: isPlaying && showProgress ? "visible" : "hidden" }}
      styles={{ root: { height: 32 } }}
    />
  );
}