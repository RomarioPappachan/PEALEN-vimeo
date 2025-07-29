function VimeoTest() {
  return (
    <div>
      <iframe
        title="vimeo-player"
        src="https://player.vimeo.com/video/1102463483"
        width="640"
        height="360"
        frameBorder="0"
        allowFullScreen
        allow="full-screen"
      ></iframe>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/MO-w7Y4zRl0?si=4lk7pPrDeytX7bbR"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; full-screen;"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default VimeoTest;
