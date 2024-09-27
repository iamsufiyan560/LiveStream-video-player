import React, { useEffect, useState } from "react";
import Livestream from "./Livestream";
import OverlayForm from "./OverlayForm";
import axios from "axios";

const App = () => {
  const [overlays, setOverlays] = useState([]);
  const [videoUrl, setVideoUrl] = useState(
    "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  );
  const [videoSize, setVideoSize] = useState("small");

  // Fetch overlays from the server
  const fetchOverlays = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/overlays");
      setOverlays(response.data);
    } catch (error) {
      console.error("Error fetching overlays:", error);
    }
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Livestream App with Overlays
      </h1>
      <Livestream
        overlays={overlays}
        videoUrl={videoUrl}
        videoSize={videoSize}
      />
      <OverlayForm
        overlays={overlays} // <-- Add this line
        onOverlayChange={setOverlays}
        onVideoUrlChange={setVideoUrl}
        currentVideoUrl={videoUrl}
        onVideoSizeChange={setVideoSize}
      />
    </div>
  );
};

export default App;
