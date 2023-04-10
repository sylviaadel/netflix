import React from "react";
import ReactPlayer from "react-player";

export default function YoutubeEmbed({ videoLink }) {
  return (
    <div className="video-responsive">
      <ReactPlayer url={videoLink} />
    </div>
  );
}
