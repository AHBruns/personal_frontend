import React from "react";
import {
  atom,
  Provider,
  useAtomValue,
  useAtom,
  PrimitiveAtom,
  Atom,
} from "jotai";

export const Game = function Grid({
  getInitialValue: getInitialValue,
  width: width,
  height: height,
  cols: cols,
  rows: rows,
}: {
  getInitialValue: (rowIndex: number, colIndex: number) => 0 | 1;
  width: number;
  height: number;
  cols: number;
  rows: number;
}) {
  const cells = React.useMemo(
    () =>
      Array(rows)
        .fill(true)
        .map((_, i) =>
          Array(cols)
            .fill(true)
            .map((_, j) => atom(getInitialValue(i, j)))
        ),
    [getInitialValue, rows, cols]
  );
  const scores = React.useMemo(
    () =>
      cells.map((row, i) =>
        row.map((_, j) =>
          atom((get) => {
            return (
              get(cells[(i + rows - 1) % rows][(j + cols - 1) % cols]) +
              get(cells[(i + rows - 1) % rows][(j + cols) % cols]) +
              get(cells[(i + rows - 1) % rows][(j + cols + 1) % cols]) +
              get(cells[(i + rows) % rows][(j + cols - 1) % cols]) +
              get(cells[(i + rows) % rows][(j + cols + 1) % cols]) +
              get(cells[(i + rows + 1) % rows][(j + cols - 1) % cols]) +
              get(cells[(i + rows + 1) % rows][(j + cols) % cols]) +
              get(cells[(i + rows + 1) % rows][(j + cols + 1) % cols])
            );
          })
        )
      ),
    [cells, rows, cols]
  );

  const cellSize = Math.min(width / cols, height / rows);

  return (
    <Provider>
      <div
        style={{ width: cellSize * cols, height: cellSize * rows }}
        className="relative"
      >
        {Array(rows)
          .fill(true)
          .flatMap((_, i) =>
            Array(cols)
              .fill(true)
              .map((_, j) => (
                <Cell
                  key={i * cols + j}
                  valueAtom={cells[i][j]}
                  scoreAtom={scores[i][j]}
                  colIndex={j}
                  rowIndex={i}
                  blur={Math.min(i, rows - i - 1, j, cols - j - 1)}
                  size={cellSize}
                />
              ))
          )}
      </div>
    </Provider>
  );
};

const Cell = function Cell({
  valueAtom,
  scoreAtom,
  colIndex,
  rowIndex,
  blur,
  size,
}: {
  valueAtom: PrimitiveAtom<0 | 1>;
  scoreAtom: Atom<number>;
  colIndex: number;
  rowIndex: number;
  blur: number;
  size: number;
}) {
  const [value, setValue] = useAtom(valueAtom);
  const score = useAtomValue(scoreAtom);

  React.useEffect(() => {
    if (value && score === 2) setValue(1);
    else if (value && score === 3) setValue(1);
    else if (!value && score === 3) setValue(1);
    else setValue(0);
  }, [value, score]);

  return (
    <div
      onClick={() => setValue(1)}
      key={`${rowIndex},${colIndex}`}
      style={{
        top: rowIndex * size,
        left: colIndex * size,
        width: size,
        height: size,
        fontSize: size,
      }}
      className="absolute flex items-center justify-center overflow-hidden"
    >
      <div
        className={[
          "w-full h-full border border-white hover:border-green-400",

          {
            2: { 0: "bg-green-50", 1: "bg-green-200" }[value],
            1: { 0: "bg-green-50", 1: "bg-green-100" }[value],
            0: { 0: "bg-green-50", 1: "bg-green-50" }[value],
          }[blur] ?? { 0: "bg-green-50", 1: "bg-green-300" }[value],
        ].join(" ")}
      />
    </div>
  );
};
