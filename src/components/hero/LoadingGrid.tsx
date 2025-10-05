// components/LoadingGrid.tsx

const LoadingGrid = () => {
  const gridSize = 9;
  const spacing = 24;
  const radius = 6;
  const startOffset = 12; // Adjusted for padding
  const center = (gridSize - 1) / 2;

  const bubbles = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      // Calculate distance from the center for the ripple effect
      const distance = Math.sqrt(
        Math.pow(row - center, 2) + Math.pow(col - center, 2),
      );
      // Create a staggered animation delay based on the distance
      const delay = distance * 0.05;

      bubbles.push(
        <circle
          key={`${row}-${col}`}
          className="loading-bubble"
          cx={startOffset + col * spacing}
          cy={startOffset + row * spacing}
          r={radius}
          fill="url(#loading-gradient)"
          style={{ animationDelay: `${delay}s` }}
        />,
      );
    }
  }

  return (
    <div className="bg-white p-4 rounded-3xl w-60 h-60">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 220 220" // Adjusted viewBox
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Define the gradient only once for efficiency */}
          <linearGradient id="loading-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#D9D9D9" />
            <stop offset="1" stopColor="#1CEC49" />
          </linearGradient>
        </defs>
        {bubbles}
      </svg>
    </div>
  );
};

export default LoadingGrid;
