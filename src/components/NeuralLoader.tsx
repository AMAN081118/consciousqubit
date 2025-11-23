"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

// Configuration for the network topology
const NETWORK_LAYERS = [3, 4, 3]; // Number of nodes per layer (Input, Hidden, Output)
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const NODE_RADIUS = 6;

export default function NeuralLoader() {
  // Generate Node Positions
  const nodes = useMemo(() => {
    const nodeList: { id: string; x: number; y: number; layer: number }[] = [];

    NETWORK_LAYERS.forEach((count, layerIndex) => {
      // Distribute layers horizontally
      const x = (CANVAS_WIDTH / (NETWORK_LAYERS.length + 1)) * (layerIndex + 1);

      for (let i = 0; i < count; i++) {
        // Distribute nodes vertically
        const y = (CANVAS_HEIGHT / (count + 1)) * (i + 1);
        nodeList.push({ id: `l${layerIndex}-n${i}`, x, y, layer: layerIndex });
      }
    });
    return nodeList;
  }, []);

  // Generate Connections (Fully connected between adjacent layers)
  const connections = useMemo(() => {
    const links: {
      id: string;
      start: (typeof nodes)[0];
      end: (typeof nodes)[0];
    }[] = [];

    nodes.forEach((node) => {
      if (node.layer < NETWORK_LAYERS.length - 1) {
        const nextLayerNodes = nodes.filter((n) => n.layer === node.layer + 1);
        nextLayerNodes.forEach((target) => {
          links.push({
            id: `${node.id}-${target.id}`,
            start: node,
            end: target,
          });
        });
      }
    });
    return links;
  }, [nodes]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      {/* Network Container */}
      <div className="relative h-[300px] w-[400px]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        >
          {/* 1. Draw Connections */}
          {connections.map((link) => (
            <g key={link.id}>
              {/* Base Line (Dim) */}
              <line
                x1={link.start.x}
                y1={link.start.y}
                x2={link.end.x}
                y2={link.end.y}
                stroke="#333"
                strokeWidth="1"
              />

              {/* Active Signal (Animated) */}
              <motion.circle
                r="3"
                fill="#00f0ff"
                // FIX 1: Remove 'offsetDistance' from initial
                initial={{ opacity: 0 }}
                animate={{
                  offsetDistance: "100%",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 2,
                  repeatDelay: Math.random() * 1,
                }}
                // FIX 2: Add 'offsetDistance' to style instead
                style={{
                  offsetDistance: "0%",
                  offsetPath: `path("M ${link.start.x} ${link.start.y} L ${link.end.x} ${link.end.y}")`,
                }}
              />
            </g>
          ))}

          {/* 2. Draw Nodes */}
          {nodes.map((node) => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={NODE_RADIUS}
              fill="#111"
              stroke="#00f0ff"
              strokeWidth="2"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                stroke: ["#00f0ff", "#fff", "#00f0ff"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node.layer * 0.5, // Stagger animation by layer
              }}
            />
          ))}
        </svg>
      </div>

      {/* 3. Branding Text */}
      <div className="mt-8 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-mono text-2xl font-bold tracking-[0.3em] text-white uppercase"
        >
          Conscious<span className="text-cyan-400">Qubit</span>
        </motion.h1>

        <motion.div
          className="mt-2 h-1 bg-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <p className="mt-2 text-xs text-gray-500 font-mono">
          INITIALIZING NEURAL PATHWAYS...
        </p>
      </div>
    </div>
  );
}
