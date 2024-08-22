import bgvideo from "./assets/background/bgvideo.mp4";
import { useRef, useEffect } from "react";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);
  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-900">
      <video
        ref={videoRef}
        src={bgvideo}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      />
      <div className="relative z-10 w-1/2">
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
