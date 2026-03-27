"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    handle: "amankumar",
    url: "https://www.linkedin.com/in/aman081118/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="5" fill="#0A66C2" />
        <path
          d="M7.4 18.2H4.6V9.6H7.4V18.2ZM6 8.4C5.1 8.4 4.4 7.7 4.4 6.8C4.4 5.9 5.1 5.2 6 5.2C6.9 5.2 7.6 5.9 7.6 6.8C7.6 7.7 6.9 8.4 6 8.4ZM19.6 18.2H16.8V14C16.8 13 16.8 11.7 15.3 11.7C13.9 11.7 13.6 12.8 13.6 13.9V18.2H10.8V9.6H13.5V10.8H13.5C13.9 10 14.9 9.4 16.1 9.4C18.8 9.4 19.4 11.2 19.4 13.6V18.2H19.6Z"
          fill="white"
        />
      </svg>
    ),
    // Bottom border on mobile, Bottom + Right border on desktop
    borderClasses: "border-b border-gray-200 dark:border-zinc-800 md:border-r",
  },
  {
    name: "GitHub",
    handle: "AMAN081118",
    url: "https://github.com/AMAN081118",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full text-black dark:text-white"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="5" fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12c0 3.31 2.15 6.12 5.13 7.12.38.07.51-.16.51-.36v-1.27c-2.08.45-2.52-1-2.52-1-.34-.86-.83-1.09-.83-1.09-.68-.46.05-.45.05-.45.75.05 1.15.77 1.15.77.67 1.15 1.76.82 2.19.63.07-.49.26-.82.47-1.01-1.66-.19-3.41-.83-3.41-3.7 0-.82.29-1.49.77-2.02-.08-.19-.33-.96.07-1.99 0 0 .63-.2 2.06.77.6-.17 1.24-.25 1.88-.25.64 0 1.28.08 1.88.25 1.43-.97 2.06-.77 2.06-.77.4 1.03.15 1.8.07 1.99.48.53.77 1.2.77 2.02 0 2.88-1.75 3.51-3.42 3.7.27.23.51.68.51 1.38v2.05c0 .2.13.44.52.36 2.98-1 5.13-3.81 5.13-7.12 0-4.14-3.36-7.5-7.5-7.5z"
          fill="white"
          className="dark:fill-black"
        />
      </svg>
    ),
    // Bottom border on mobile and desktop
    borderClasses: "border-b border-gray-200 dark:border-zinc-800",
  },
  {
    name: "Mail",
    handle: "aman081118@gmail.com",
    url: "mailto:aman081118@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="5" fill="url(#paint0_linear)" />
        <path
          d="M5 9L12 13.5L19 9V15C19 16.1046 18.1046 17 17 17H7C5.89543 17 5 16.1046 5 15V9Z"
          fill="white"
        />
        <path
          d="M19 9L12 13.5L5 9C5 7.89543 5.89543 7 7 7H17C18.1046 7 19 7.89543 19 9Z"
          fill="#E2E8F0"
          fillOpacity="0.8"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="12"
            y1="0"
            x2="12"
            y2="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#0284C7" />
          </linearGradient>
        </defs>
      </svg>
    ),
    // Bottom border ONLY on mobile, Right border on desktop
    borderClasses:
      "border-b md:border-b-0 border-gray-200 dark:border-zinc-800 md:border-r",
  },
  {
    name: "X",
    handle: "@AMAN081118",
    url: "https://x.com/AMAN081118",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full text-black dark:text-white"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="5" fill="currentColor" />
        <path
          d="M14.5455 9.17647H16.8182L11.8545 14.8235L17.6909 22H13.1273L9.54545 17.3176L5.45455 22H3.18182L8.47273 15.9529L2.90909 9.17647H7.58182L10.8364 13.4588L14.5455 9.17647ZM13.7273 20.7294H14.9818L6.87273 10.3294H5.50909L13.7273 20.7294Z"
          fill="white"
          className="dark:fill-black"
        />
      </svg>
    ),
    // No borders needed, it sits in the bottom right corner
    borderClasses: "",
  },
];

const Social = () => {
  return (
    <section id="social" className="w-full pt-10 scroll-mt-16">
      {/* Container with Top and Bottom borders to complete the grid look */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-y border-gray-200 dark:border-zinc-800">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-5 sm:p-6 group hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors ${link.borderClasses}`}
          >
            <div className="flex items-center gap-4">
              {/* Outer App-Icon Container (White/Dark Box with Shadow) */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-sm border border-gray-100  flex items-center justify-center p-1.5 sm:p-2 shrink-0 group-hover:shadow-md transition-shadow">
                {/* The SVG logo itself */}
                {link.icon}
              </div>

              {/* Text Container */}
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-semibold font-['IBM_Plex_Mono']">
                  {link.name}
                </span>
                <span className="text-sm  font-['IBM_Plex_Mono']">
                  {link.handle}
                </span>
              </div>
            </div>

            {/* Hover Arrow */}
            <ArrowUpRight
              size={20}
              className="text-gray-400 group-hover:text-gray-900  transition-colors"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Social;
