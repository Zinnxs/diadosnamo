import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";

const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // We wait for the first user interaction to start playing unmuted
  useEffect(() => {
    const handleInteraction = () => {
      setPlaying(true);
      setMuted(false);
      
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playing) setPlaying(true);
    setMuted(!muted);
  };

  const RPlayer = ReactPlayer as any;

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        className="w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-md bg-white/40 border border-white/60 shadow-lg text-cyan-600 hover:bg-white/60 transition-colors"
      >
        {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </motion.button>
      
      <div className="absolute top-0 left-0 opacity-0 pointer-events-none w-10 h-10 overflow-hidden -z-10">
        <RPlayer
          url="https://youtu.be/Xwo0kBlvkWc"
          playing={playing}
          muted={muted}
          loop={true}
          width="40px"
          height="40px"
          volume={0.5} // a pleasant background volume
          config={{
            youtube: {
              playerVars: {
                playsinline: 1,
                controls: 0,
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
