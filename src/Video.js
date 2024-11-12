const Video = () => {
  return (
    <div className="d-flex justify-content-center">
      <iframe
        width="256"
        src="https://www.youtube.com/embed/LDU_Txk06tM?si=Xux448Drn05IkiJr&amp;start=68"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; cweb-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Video;