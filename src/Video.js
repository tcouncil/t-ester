const Video = (props) => {
  const videos = ["https://www.youtube.com/embed/LDU_Txk06tM?si=Xux448Drn05IkiJr&amp;start=68", // Crab Rave
    "https://www.youtube.com/embed/k85mRPqvMbE?si=rMgXEoy1XBTKOM87", // Crazy Frog
    "https://www.youtube.com/embed/EIyixC9NsLI?si=eZd9b9abxzSC5Qim", // Badger
    "https://www.youtube.com/embed/5iln6fkwJOU?si=y3dlldx57kvvOcaO", // Song that doesn't end
    "https://www.youtube.com/embed/LAxchGHx13s?si=5RDFz0PSdp498p55&amp;start=2", // Spongebob
    "https://www.youtube.com/embed/96NUsT-1k2A?si=osNBuf8Jb0iXTxYK&amp;start=12", // Sweet Victory
    "https://www.youtube.com/embed/EE-xtCF3T94?si=pyu4RT8xaF9lkXni&amp;start=6", // Poke Rick Roll
    "https://www.youtube.com/embed/99LpTL8eq4o?si=heuUkBczCgc5x51G", // Song of Storms
    "https://www.youtube.com/embed/ZZ5LpwO-An4?si=6fSgK_PSLbOUOB1t", // HEYEYEYEYEYEAH
    "https://www.youtube.com/embed/X4LtiysMEU0?si=DXTChMVKOFU9OIBa&amp;start=9", // Money Don't Jiggle
    "https://www.youtube.com/embed/oWqAf4eex14?si=y2S1ggYRsSGawOXn", // Jellyfish Jam
    "https://www.youtube.com/embed/y6120QOlsfU?si=y1we_UzlgCo9tzGR&amp;start=16", // Sandstorm
    "https://www.youtube.com/embed/FtutLA63Cp8?si=g8DgpLqExEp5k2Qu", // Bad Apple
    "https://www.youtube.com/embed/1ElihbSM6ic?si=RhTrs_HfOkrMAyLS", // The Kiffness
    "https://www.youtube.com/embed/cuxZ2u8-WXg?si=PuAtXwdrw1eDE_0_" // Venject create machines
  ];

  const handleSelect = () => {
    return Math.floor(Math.random() * videos.length);
  }

  let videoIndex = props.videoId != null ? props.videoId : handleSelect();
  if (videoIndex > videos.length) {
    videoIndex = handleSelect();
  }

  return (
    <div className="d-flex justify-content-center flex-column">
      <iframe
        src={videos[videoIndex]}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; cweb-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <i className="vId" title="Use this video id to select the video you want in the URL. IE: t-ester.online/#6">video id: #{videoIndex}</i>
    </div>
  );
};

export default Video;