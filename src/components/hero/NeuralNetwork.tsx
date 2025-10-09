// components/NeuralNetwork.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { ImageNode } from "./ImageNode";

const layers = [
  { x: 50, count: 8, startY: 40, spacing: 35 },
  { x: 200, count: 10, startY: 20, spacing: 35 },
  { x: 350, count: 10, startY: 20, spacing: 35 },
  { x: 500, count: 10, startY: 20, spacing: 35 },
  { x: 650, count: 4, startY: 100, spacing: 50 },
];

const availableNodes = [
  { startColor: "#61DAFB", endColor: "#216A83", iconUrl: "/icons/react.svg" },
  {
    startColor: "#F7DF1E",
    endColor: "#B3A115",
    iconUrl: "/icons/javascript.svg",
  },
  {
    startColor: "#2496ED",
    endColor: "#0E4D78",
    iconUrl: "/icons/docker.svg",
  },
  {
    startColor: "#FFFFFF",
    endColor: "#555555",
    iconUrl: "/icons/nextjs.svg",
  },
  {
    startColor: "#4169E1",
    endColor: "#203470",
    iconUrl: "/icons/postgresql.svg",
  },
  {
    startColor: "#FFD43B",
    endColor: "#306998",
    iconUrl: "/icons/python.svg",
  },
  {
    startColor: "#3178C6",
    endColor: "#1C4570",
    iconUrl: "/icons/typescript.svg",
  },
  {
    startColor: "#8CC84B",
    endColor: "#306934",
    iconUrl: "/icons/nodejs.svg",
  },
  { startColor: "#E34F26", endColor: "#F16529", iconUrl: "/icons/html5.svg" },
  {
    startColor: "#38BDF8",
    endColor: "#06B6D4",
    iconUrl: "/icons/tailwindcss.svg",
  },
  {
    startColor: "#333333",
    endColor: "#181717",
    iconUrl: "/icons/github.svg",
  },
  {
    startColor: "#FF0000",
    endColor: "#AA0000",
    iconUrl: "/icons/opencv.svg",
  },
  {
    startColor: "#00ADD8",
    endColor: "#007D9C",
    iconUrl: "/icons/goland.svg",
  },
  {
    startColor: "#00599C",
    endColor: "#00447A",
    iconUrl: "/icons/cplusplus.svg",
  },
  {
    startColor: "#EE4C2C",
    endColor: "#C33E22",
    iconUrl: "/icons/pytorch.svg",
  },
  {
    startColor: "#FF6F00",
    endColor: "#C45500",
    iconUrl: "/icons/tensorflow.svg",
  },
  {
    startColor: "#E10098",
    endColor: "#A60070",
    iconUrl: "/icons/graphql.svg",
  },
  {
    startColor: "#4BAD2F",
    endColor: "#2D6B1D",
    iconUrl: "/icons/langgraph.svg",
  },
];

const NeuralNetwork = () => {
  const logoSize = 30;
  const nodeRadius = logoSize / 2;

  const [activePath, setActivePath] = useState<string[]>([]);

  const selectNewPath = useCallback(() => {
    const path: string[] = [];
    let currentNodeIndex = Math.floor(Math.random() * layers[0].count);

    for (let i = 0; i < layers.length - 1; i++) {
      const nextNodeIndex = Math.floor(Math.random() * layers[i + 1].count);
      path.push(`edge-${i}-${currentNodeIndex}-${nextNodeIndex}`);
      currentNodeIndex = nextNodeIndex;
    }
    setActivePath(path);
  }, []);

  useEffect(() => {
    const interval = setInterval(selectNewPath, 1000); // Select a new path every 2 seconds
    return () => clearInterval(interval);
  }, [selectNewPath]);

  const edges = [];
  const logoComponents = [];
  let nodeIndex = 0;

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    for (let j = 0; j < layer.count; j++) {
      const cx = layer.x,
        cy = layer.startY + j * layer.spacing;
      const nodeData = availableNodes[nodeIndex % availableNodes.length];
      logoComponents.push(
        <g
          key={`logo-${i}-${j}`}
          transform={`translate(${cx - nodeRadius}, ${cy - nodeRadius})`}
        >
          <ImageNode size={logoSize} {...nodeData} />
        </g>,
      );
      nodeIndex++;

      if (i < layers.length - 1) {
        const nextLayer = layers[i + 1];
        for (let k = 0; k < nextLayer.count; k++) {
          const nextCx = nextLayer.x,
            nextCy = nextLayer.startY + k * nextLayer.spacing;
          const dx = nextCx - cx,
            dy = nextCy - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const unitDx = dx / dist,
            unitDy = dy / dist;
          const startX = cx + unitDx * nodeRadius,
            startY = cy + unitDy * nodeRadius;
          const endX = nextCx - unitDx * nodeRadius,
            endY = nextCy - unitDy * nodeRadius;

          const edgeId = `edge-${i}-${j}-${k}`;
          const isActive = activePath.includes(edgeId);

          edges.push(
            <line
              key={edgeId}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={isActive ? "url(#pulse-gradient)" : "#fff"}
              strokeWidth={isActive ? 1.5 : 0.5}
              className={isActive ? "" : "edge-path"}
              strokeOpacity={isActive ? 1 : 0.3}
              style={{ transition: "all 0.5s ease-in-out" }}
            />,
          );
        }
      }
    }
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="700"
      height="400"
      fill="none"
      viewBox="0 0 750 400"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00F260" />
          <stop offset="100%" stopColor="#0575E6" />
        </linearGradient>
      </defs>
      <g id="edges">{edges}</g>
      <g id="logos">{logoComponents}</g>
    </svg>
  );
};

export default NeuralNetwork;
