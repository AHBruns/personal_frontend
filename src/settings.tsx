import React from "react";
import { Transition } from "@headlessui/react";

export function Settings({
  cellSize,
  setCellSize,
}: {
  cellSize: number;
  setCellSize: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed left-0 bottom-0">
      <div className="absolute left-4 bottom-0 pb-4 space-y-4">
        <Transition
          show={isOpen}
          enter="transition-all duration-300"
          enterFrom="h-0 opacity-0"
          enterTo="h-24 opacity-100"
          entered="h-24"
          leave="transition-all duration-300"
          leaveFrom="h-24 opacity-100"
          leaveTo="h-0 opacity-0"
          className="overflow-hidden"
        >
          <div className="border border-black h-full bg-white rounded-md w-64 divide-y divide-black">
            <div className="px-4 py-2">
              <p className="tracking-wider leading-tight">Game Settings</p>
            </div>
            <div className="px-4 py-2">
              <p className="tracking-wider leading-tight">Cell size</p>
              <input
                className="w-full"
                type="range"
                min="10"
                max="100"
                step="1"
                value={cellSize}
                onChange={(e) =>
                  setCellSize(Math.round(Number.parseFloat(e.target.value)))
                }
              />
            </div>
          </div>
        </Transition>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-white p-1 border text-gray-300 hover:border-black hover:text-black border-gray-300 transition-all hover:rotate-180 hover:scale-105 rounded-full"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
