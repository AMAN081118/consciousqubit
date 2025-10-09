// components/PdfViewer.tsx
import React, { useRef } from "react";

// Define the component props
interface PdfViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, onClose }) => {
  // Use a ref for the outer container instead of useEffect for height (more Tailwind-friendly)
  const viewerRef = useRef<HTMLDivElement>(null);

  // Optional: You can keep the window resizing logic if the simple CSS height doesn't work
  // but for a full-screen overlay, setting height: 100vh on the parent is often cleaner.

  return (
    // Tailwind for fixed, full-screen overlay with a semi-transparent background
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-75 flex flex-col p-4"
      ref={viewerRef}
    >
      {/* Close Button at the top right */}
      <div className="flex justify-end p-2">
        <button
          onClick={onClose}
          className="bg-white text-gray-800 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg shadow-xl transition"
        >
          Cut View (X)
        </button>
      </div>

      {/* PDF Container */}
      <div className="flex-grow bg-white rounded-lg overflow-hidden">
        <embed
          id="pdfEmbed"
          src={pdfUrl} // Corrected path will come from the parent
          type="application/pdf"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
