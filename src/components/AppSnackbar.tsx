import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import {
  subscribeToSnackbar,
  type SnackbarPayload,
} from "../utils/error-snackbar";

const AppSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<SnackbarPayload | null>(null);
  const [queue, setQueue] = useState<SnackbarPayload[]>([]);

  useEffect(() => {
    return subscribeToSnackbar((payload) => {
      setQueue((previous) => [...previous, payload]);
    });
  }, []);

  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setCurrent(next);
      setQueue(rest);
      setOpen(true);
    }
  }, [current, queue]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleExited = () => {
    setCurrent(null);
  };

  return (
    <Snackbar
      key={current?.id}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        transition: {
          onExited: handleExited,
        },
      }}
    >
      <Alert onClose={handleClose} severity={current?.severity || "error"} variant="filled">
        {current?.message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
