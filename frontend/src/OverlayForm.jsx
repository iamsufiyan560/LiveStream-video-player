import React, { useEffect, useState } from "react";
import axios from "axios";

const OverlayForm = ({
  overlays, // Make sure to destructure overlays here
  onOverlayChange,
  onVideoUrlChange,
  currentVideoUrl,
  onVideoSizeChange,
}) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [height, setHeight] = useState(150);
  const [width, setWidth] = useState(150);
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [editingOverlayId, setEditingOverlayId] = useState(null);
  const [videoUrl, setVideoUrl] = useState(currentVideoUrl);

  const fetchOverlays = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/overlays");
      onOverlayChange(response.data);
    } catch (error) {
      console.error("Error fetching overlays:", error);
    }
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  const handleSubmit = async () => {
    const newOverlay = { text, image, position, size: { width, height } };
    try {
      if (editingOverlayId) {
        await axios.put(
          `http://localhost:5000/api/overlays/${editingOverlayId}`,
          newOverlay
        );
        setEditingOverlayId(null);
      } else {
        await axios.post("http://localhost:5000/api/overlays", newOverlay);
      }
      resetForm();
      fetchOverlays();
    } catch (error) {
      console.error("Error submitting overlay:", error);
    }
  };

  const resetForm = () => {
    setText("");
    setImage("");
    setHeight(50);
    setWidth(100);
    setPosition({ x: 0, y: 0 });
  };

  const handleEdit = (overlay) => {
    setText(overlay.text);
    setImage(overlay.image);
    setHeight(overlay.size.height);
    setWidth(overlay.size.width);
    setPosition(overlay.position);
    setEditingOverlayId(overlay._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/overlays/${id}`);
      fetchOverlays();
    } catch (error) {
      console.error("Error deleting overlay:", error);
    }
  };

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value.trim());
  };

  const handleLoadVideo = () => {
    onVideoUrlChange(videoUrl);
  };

  return (
    <div className="p-4">
      {/* url changer */}
      <p className="text-base text-balance flex flex-wrap">
        <span className="mr-4">Another url u can check :</span>
        https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
      </p>
      <div className="flex md:gap-4 gap-2 flex-wrap">
        <div className="flex flex-col ">
          <label htmlFor="videourl" className="mb-1 text-lg font-bold ">
            Change the video url
          </label>
          <input
            id="videourl"
            className="border p-2 mb-4 w-[200px]"
            type="text"
            placeholder="Video URL"
            value={videoUrl}
            onChange={handleVideoUrlChange}
          />
        </div>
        <div className="flex items-end">
          <button
            className="bg-blue-500 rounded-md  h-10 text-white p-2 mb-4"
            onClick={handleLoadVideo}
          >
            Load Video
          </button>
        </div>
        <div className="flex items-end">
          <button
            className="bg-violet-500 rounded-md  h-10 text-white p-2 mb-4"
            onClick={() => {
              setVideoUrl("");
            }}
          >
            clear url input
          </button>
        </div>
      </div>
      {/* video settings */}

      <div className="flex flex-col ">
        <label htmlFor="size" className="mb-1 text-lg font-bold ">
          Video Settings
        </label>
        <div className="flex md:gap-4 gap-2 flex-wrap">
          <select
            id="size"
            className="border p-2 mb-4 w-[200px]"
            onChange={(e) => {
              onVideoSizeChange(e.target.value);
            }}
          >
            <option value="small">Small (300x200)</option>
            <option value="medium" defaultValue>
              Medium (600x400)
            </option>
            <option value="large">Large (800x600)</option>
            <option value="full">Full (1200x800)</option>
          </select>
        </div>
      </div>

      {/* create overlay */}
      <h2 className="text-lg font-bold mb-4">
        {editingOverlayId ? "Edit Overlay" : "Create Overlay"}
      </h2>
      <div className="flex md:gap-4 gap-2 flex-wrap">
        <div className="flex flex-col">
          <label htmlFor="overlayText" className="mb-1">
            Overlay Text
          </label>
          <input
            id="overlayText"
            className="border p-2 mb-4 w-[200px]"
            type="text"
            placeholder="Enter Overlay Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="imageUrl" className="mb-1">
            Image URL
          </label>
          <input
            id="imageUrl"
            className="border p-2 mb-4 w-[200px]"
            type="text"
            placeholder="Enter Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="height" className="mb-1">
            Height For Img
          </label>
          <input
            id="height"
            className="border p-2 mb-4 w-[200px]"
            type="number"
            placeholder="Enter Height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="width" className="mb-1">
            Width For Img
          </label>
          <input
            id="width"
            className="border p-2 mb-4 w-[200px]"
            type="number"
            placeholder="Enter Width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="positionX" className="mb-1">
            Position X
          </label>
          <input
            id="positionX"
            className="border p-2 mb-4 w-[200px]"
            type="number"
            placeholder="Enter Position X"
            value={position.x}
            onChange={(e) =>
              setPosition({ ...position, x: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="positionY" className="mb-1">
            Position Y
          </label>
          <input
            id="positionY"
            className="border p-2 mb-4 w-[200px]"
            type="number"
            placeholder="Enter Position Y"
            value={position.y}
            onChange={(e) =>
              setPosition({ ...position, y: parseInt(e.target.value) })
            }
          />
        </div>
      </div>
      <button
        className="bg-green-500 rounded-md text-white p-2 mb-4"
        onClick={handleSubmit}
      >
        {editingOverlayId ? "Update Overlay" : "Add Overlay"}
      </button>
      {/*  */}

      <h2 className="text-lg  font-bold mb-4">Overlays</h2>
      <ul className=" w-fit   flex flex-wrap gap-8">
        {Array.isArray(overlays) &&
          overlays.map((overlay) => (
            <li
              key={overlay._id}
              className="flex 
            rounded-lg  p-2 shadow-lg border
            gap-8 mb-2"
            >
              <div>
                {overlay.text ? (
                  <span className="text-xl">{overlay.text}</span>
                ) : (
                  <img src={overlay.image} alt="" className="w-16 h-16" />
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  className="bg-yellow-500 rounded-md text-white p-1 mr-2"
                  onClick={() => handleEdit(overlay)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 rounded-md text-white p-1"
                  onClick={() => handleDelete(overlay._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default OverlayForm;
