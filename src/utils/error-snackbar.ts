import type { AlertColor } from "@mui/material";
import { getApiMessage } from "./utils";

export interface SnackbarPayload {
  id: number;
  message: string;
  severity: AlertColor;
}

type SnackbarListener = (payload: SnackbarPayload) => void;

const listeners = new Set<SnackbarListener>();

const publish = (payload: SnackbarPayload) => {
  listeners.forEach((listener) => listener(payload));
};

export const notifyError = (error: unknown) => {
  publish({
    id: Date.now(),
    message: getApiMessage(error),
    severity: "error",
  });
};

export const subscribeToSnackbar = (listener: SnackbarListener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};
