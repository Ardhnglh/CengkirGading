import React, { useEffect, useState } from "react";
import UserLayout from "../../../../layouts/UserLayout";
import api from "../../../../services/api";

const ExerciseVideo = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await api.get("/daily-exercise");
        const filteredVideos = data.filter(
          (video) => video.tipe === "Video Tutorial"
        );
        setVideos(filteredVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleFullScreen = (videoElement) => {
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="font-dramatic-header text-2xl font-extrabold text-left text-green-800 mb-9 underline underline-offset-2 decoration-green-800">
          Video-video Drama
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="mb-8 max-w-xl">
              <h2 className="text-xl font-bold font-dramatic-body-user text-gray-800 mb-2">
                {video.judul}
              </h2>
              <video
                src={encodeURI(video.file_path[0])}
                className="w-full h-auto max-w-md rounded-lg cursor-pointer mb-4"
                controls
                onClick={(e) => handleFullScreen(e.target)}
                onError={(e) =>
                  console.error("Error loading video:", e.target.error)
                }
              />
              <p className="text-gray-700 text-base font-dramatic-body-user text-justify max-w-md">
                {video.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default ExerciseVideo;
