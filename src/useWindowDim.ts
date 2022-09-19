import React from "react";

export function useWindowDim(value: number) {
  const [_, setNonce] = React.useState(0)

  React.useEffect(() => {
    const listener = () => setNonce(prev => prev + 1)
    window.addEventListener("resize", listener)
    return () => window.removeEventListener("resize", listener)
  }, [])

  return value
}
