// components/ResumeActions.tsx
"use client";
import React, { useState } from "react";
import PdfViewer from "./PdfViewer";

// ⚠️ IMPORTANT: Place your Resume.pdf file directly inside the 'public' folder.
// The URL will then be the root path:
const RESUME_URL = "/Resume.pdf";

const ResumeActions: React.FC = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // 1. Function to handle opening the viewer
  const handleResumeView = () => {
    setIsViewerOpen(true);
  };

  // 2. Function to handle closing the viewer
  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  // 3. Function to handle the direct download
  const handleDownload = () => {
    // Programmatically creates a temporary <a> tag to trigger the download
    const link = document.createElement("a");
    link.href = RESUME_URL;
    link.download = "My_Resume.pdf"; // Specifies the downloaded file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Your DIV for Clicking to View */}
      <div
        onClick={handleResumeView} // Changed to open the viewer
      >
        <button className="mt-4 bg-red-500 text-white rounded-xl px-4 py-2 cursor-pointer text-lg font-normal font-['Poppins'] hover:bg-red-600 transition shadow-lg">
          Resume
        </button>
      </div>

      {/* Dedicated Download Button for clarity */}
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-500 text-white rounded-xl px-4 py-2 cursor-pointer text-lg font-normal font-['Poppins'] hover:bg-blue-600 transition shadow-lg"
      >
        Download PDF
      </button>

      {/* Conditional Rendering of the PDF Viewer */}
      {isViewerOpen && (
        <PdfViewer pdfUrl={RESUME_URL} onClose={handleCloseViewer} />
      )}
    </>
  );
};

export default ResumeActions;
