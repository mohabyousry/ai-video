import React, { useState } from "react";

const App = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState("");
  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Send file to backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const response = await fetch("http://localhost:8000/whisper", {
        method: "POST",
        body: formData,
      });

      const Rdata = await response.json();
      setData(Rdata.text);
      console.log(Rdata.text);

      if (response.ok) {
        alert("Upload successful!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="center">
      <h1>Video Transcriber</h1>
      <div className="d">
        <div className="box">
          <p>Upload your video here</p>

          {/* Hidden real input, triggered by a button or styled label */}
          <input type="file" accept="video/*" onChange={handleFileChange} />

          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload to Server"}
          </button>
        </div>

        <div className="box">
          <strong>View your subtitles here</strong>
          <p style={{ whiteSpace: "pre-wrap" }}>{data}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
