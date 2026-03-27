"use client";

import { useEffect, useState } from "react";

const DIGITS: Record<string, number[][]> = {
  "%": [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 1],
    [0, 0, 0, 0],
  ],
  "0": [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  "1": [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  "2": [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  "3": [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  "4": [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  "5": [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  "6": [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  "7": [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  "8": [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  "9": [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
};

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setProgress(i);
      if (i >= 100) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Always 3 digits (001, 045, 100)
  const digits = [...String(progress).padStart(3, "0").split(""), "%"];

  return (
    <div className="h-screen w-full bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[75vh] bg-gray-200 rounded-2xl relative overflow-hidden">
        {/* Dot Matrix Numbers */}
        <div className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 flex gap-4 sm:gap-6">
          {digits.map((digit, digitIndex) => (
            <div key={digitIndex} className="grid grid-rows-7 gap-1 sm:gap-1.5">
              {DIGITS[digit].map((row, r) => (
                <div key={r} className="flex gap-1 sm:gap-1.5">
                  {row.map((cell, c) => (
                    <div
                      key={c}
                      className={`rounded-full transition-all duration-200 
                        w-2.5 h-2.5 sm:w-3 sm:h-3
                        ${cell ? "bg-black scale-100" : "bg-black/10 scale-75"}
                      `}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2">
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {[...Array(9)].map((_, i) => {
              const arrowPattern = [1, 3, 4, 5, 7];
              return (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                    arrowPattern.includes(i) ? "bg-black" : "bg-transparent"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
