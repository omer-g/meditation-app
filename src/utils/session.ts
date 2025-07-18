import { Preferences } from "@capacitor/preferences";

export const PAUSE_KEY = "pause-started-at";
export const SESSION_ENDED_KEY = "session-ended-at";
export const MAX_PAUSE_MS = 32000;

export async function markPauseNow() {
  await Preferences.set({ key: PAUSE_KEY, value: Date.now().toString() });
}

export async function clearPauseMark() {
  await Preferences.remove({ key: PAUSE_KEY });
}

export async function getPauseTimestamp(): Promise<number | null> {
  const { value } = await Preferences.get({ key: PAUSE_KEY });
  return value ? parseInt(value) : null;
}

export async function sessionNeedsReset(): Promise<boolean> {
  const pauseStarted = await getPauseTimestamp();
  if (!pauseStarted) return false;
  const elapsed = Date.now() - pauseStarted;
  return elapsed > MAX_PAUSE_MS;
}

// New functions for handling session end marker
export async function markSessionEnded() {
  await Preferences.set({ key: SESSION_ENDED_KEY, value: Date.now().toString() });
}

export async function clearSessionEndedMark() {
  await Preferences.remove({ key: SESSION_ENDED_KEY });
}

export async function hasSessionEnded(): Promise<boolean> {
  const { value } = await Preferences.get({ key: SESSION_ENDED_KEY });
  return Boolean(value);
}
