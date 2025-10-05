// components/LogoNode.tsx
import React, { useId } from "react";

type LogoNodeProps = {
  size: number;
  startColor: string;
  endColor: string;
  children: React.ReactNode;
};

export const LogoNode = ({
  size,
  startColor,
  endColor,
  children,
}: LogoNodeProps) => {
  const gradientId = useId();

  // Calculate the size and position for the inner logo to have some padding
  const logoSize = size * 0.6; // Logo will take up 60% of the node's diameter
  const logoPosition = (size - logoSize) / 2; // This is the top/left offset for the logo

  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: startColor }} />
          <stop offset="100%" style={{ stopColor: endColor }} />
        </linearGradient>
      </defs>
      <circle r={size / 2} fill={`url(#${gradientId})`} />

      {/* This group wrapper reliably centers the logo */}
      <g transform={`translate(${logoPosition}, ${logoPosition})`}>
        {/* The inner SVG gives the logo a contained viewport */}
        <svg width={logoSize} height={logoSize}>
          {children}
        </svg>
      </g>
    </g>
  );
};
