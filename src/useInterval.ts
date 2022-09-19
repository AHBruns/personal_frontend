import React from "react";

export function useInterval(timeout: number | null, callback: () => void) {
  React.useEffect(() => {
    if (timeout !== null) {
      const id = setInterval(callback, timeout)

      return () => clearInterval(id)
    }
  }, [timeout, callback])
}
