import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const Livestream = ({ overlays, videoUrl, videoSize }) => {
  const videoRef = useRef(null);

  const sizeOptions = {
    small: { width: 300, height: 200 },
    medium: { width: 600, height: 400 },
    large: { width: 800, height: 600 },
    full: { width: 1200, height: 800 },
  };

  useEffect(() => {
    if (Hls.isSupported() && videoUrl) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoUrl;
      videoRef.current.play();
    } else {
      console.error("HLS is not supported or URL is invalid.");
    }
  }, [videoUrl]);

  // Get the current size based on the selected video size
  const currentSize = sizeOptions[videoSize];

  return (
    <div className="flex justify-center items-center">
      <div
        className="relative flex  "
        style={{
          width: `${currentSize.width}px`,
          height: `${currentSize.height}px`,
        }}
      >
        <video
          ref={videoRef}
          controls
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
          }}
        />
        {Array.isArray(overlays) &&
          overlays.map((overlay) => {
            // Assuming overlay positions are in percentage
            const overlayX = (overlay.position.x / 100) * currentSize.width;
            const overlayY = (overlay.position.y / 100) * currentSize.height;

            return (
              <div
                key={overlay._id}
                style={{
                  position: "absolute",
                  top: `${overlayY}px`,
                  left: `${overlayX}px`,
                  width: `${overlay.size.width}px`,
                  height: `${overlay.size.height}px`,
                  pointerEvents: "none",
                }}
              >
                {overlay.image ? (
                  <img
                    src={overlay.image}
                    alt="Overlay"
                    style={{
                      width: "100%", // Fill the overlay container
                      height: "100%", // Fill the overlay container
                    }}
                  />
                ) : (
                  <p style={{ color: "red", margin: 0, fontWeight: 600 }}>
                    {overlay.text.charAt(0).toUpperCase() +
                      overlay.text.slice(1)}
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Livestream;
