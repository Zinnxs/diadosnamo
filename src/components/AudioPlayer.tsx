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
      if (!playing) {
        setPlaying(true);
        setMuted(false);
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [playing]);

  const toggleMute = () => {
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
      
      <div className="hidden">
        <RPlayer
          url="src/lib/Until I Found You - Stephen Sanchez - Cover (Violin) - ItsAMoney (youtube).mp3"
          playing={playing}
          muted={muted}
          loop={true}
          width="0"
          height="0"
          volume={0.5} // a pleasant background volume
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
