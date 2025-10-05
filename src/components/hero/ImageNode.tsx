// components/ImageNode.tsx
import React, { useId } from "react";

type ImageNodeProps = {
  size: number;
  startColor: string;
  endColor: string;
  iconUrl: string; // The path to the image file in the /public folder
};

export const ImageNode = ({
  size,
  startColor,
  endColor,
  iconUrl,
}: ImageNodeProps) => {
  const gradientId = useId();
  const imageSize = size * 0.6; // Logo will take up 60% of the node's diameter
  const imagePosition = (size - imageSize) / 2; // Center the logo

  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: startColor }} />
          <stop offset="100%" style={{ stopColor: endColor }} />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill={`url(#${gradientId})`}
      />
      <image
        href={iconUrl}
        height={imageSize}
        width={imageSize}
        x={imagePosition}
        y={imagePosition}
      />
    </g>
  );
};
