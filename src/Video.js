const Video = () => {
  const videos = ["https://www.youtube.com/embed/LDU_Txk06tM?si=Xux448Drn05IkiJr&amp;start=68",
    "https://www.youtube.com/embed/k85mRPqvMbE?si=rMgXEoy1XBTKOM87",
    "https://www.youtube.com/embed/EIyixC9NsLI?si=eZd9b9abxzSC5Qim",
    "https://www.youtube.com/embed/5iln6fkwJOU?si=y3dlldx57kvvOcaO",
    "https://www.youtube.com/embed/LAxchGHx13s?si=5RDFz0PSdp498p55&amp;start=2",
    "https://www.youtube.com/embed/96NUsT-1k2A?si=osNBuf8Jb0iXTxYK&amp;start=2",
    "https://www.youtube.com/embed/EE-xtCF3T94?si=pyu4RT8xaF9lkXni&amp;start=6",
    "https://www.youtube.com/embed/99LpTL8eq4o?si=heuUkBczCgc5x51G"
  ];

  const handleSelect = () => {
    return Math.floor(Math.random() * videos.length);
  }

  const videoIndex = handleSelect();

  return (
    <div className="d-flex justify-content-center">
      <iframe
        src={videos[videoIndex]}
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