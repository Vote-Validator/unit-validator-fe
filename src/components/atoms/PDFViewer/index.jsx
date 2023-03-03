import React, { useState } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library
import PDF from "../../../assets/pdf/test_file.pdf";

export const PDFViewer = ({ pdfURL }) => {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState(null);

  const convertFile = async () => {
    return new File(
      [await (await fetch("../../../assets/pdf/test_file.pdf")).blob()],
      "../../../assets/pdf/test_file.pdf"
    );
  };

  if (PDF) {
    convertFile().then((result) => {
      let reader = new FileReader();
      reader.readAsDataURL(result);
      reader.onloadend = (e) => {
        setPdfFile(e.target.result);
      };
    });
  }

  return (
    // <Worker workerUrl="https://unpkg.com/browse/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    //   <Viewer fileUrl={{ pdfURL }} plugins={[defaultLayoutPluginInstance]} />
    // </Worker>

    <Worker workerUrl="https://unpkg.com/browse/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
      <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
    </Worker>
  );
};
