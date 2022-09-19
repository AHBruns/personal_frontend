import React from "react";
import { Game } from "./game";
import { Reset } from "./reset";
import { Settings } from "./settings";
import { useWindowDim } from "./useWindowDim";

export function App() {
  const [cellSize, setCellSize] = React.useState(25);
  const [gameKey, setGameKey] = React.useState(0);

  const innerWidth = useWindowDim(window.innerWidth);
  const innerHeight = useWindowDim(window.innerHeight);
  const rows = Math.floor(innerHeight / cellSize);
  const cols = Math.floor(innerWidth / cellSize);
  const height = innerHeight;
  const width = innerWidth;

  return (
    <>
      <div
        className="flex items-center justify-center h-full relative overflow-hidden"
        style={{ height: innerHeight, width: innerWidth }}
      >
        <Game
          key={gameKey}
          getInitialValue={(_i, _j) => Math.round(Math.random()) as 0 | 1}
          width={width}
          height={height}
          rows={rows}
          cols={cols}
        />
        <Settings cellSize={cellSize} setCellSize={setCellSize} />
        <Reset onClick={() => setGameKey((prev) => prev + 1)} />
        <h1 className="font-black text-center text-8xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          Hi.&nbsp;&nbsp;I'm Alex.
        </h1>
      </div>
    </>
  );
}
