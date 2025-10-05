// components/icons/NextJsLogo.tsx
export const NextJsLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 128 128" {...props}>
    <circle cx="64" cy="64" r="64" fill="#000" />
    <path
      fill="url(#a)"
      d="M107.5 54.25a25.25 25.25 0 0 0-48-12.5v25.25a25.25 25.25 0 0 1 48-12.75Z"
    />
    <path fill="#fff" d="M89 54.25a10.5 10.5 0 1 0-21 0v.5h21v-.5Z" />
    <defs>
      <linearGradient
        id="a"
        x1="107.5"
        x2="59.5"
        y1="54.25"
        y2="54.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
