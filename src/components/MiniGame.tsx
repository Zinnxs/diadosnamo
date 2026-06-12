import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

const MiniGame = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    if (accepted || !containerRef.current || !noButtonRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const btn = noButtonRef.current.getBoundingClientRect();

    // Calculate safe boundaries
    const maxX = container.width - btn.width - 20;
    const maxY = container.height - btn.height - 20;

    // Generate random constraints within container
    let randomX = Math.random() * maxX - maxX / 2;
    let randomY = Math.random() * maxY - maxY / 2;

    // Make sure it jumps far enough from current position
    const jumpDistance = 100;
    if (Math.abs(randomX - noPosition.x) < jumpDistance) randomX += Math.sign(randomX - noPosition.x || 1) * jumpDistance;
    if (Math.abs(randomY - noPosition.y) < jumpDistance) randomY += Math.sign(randomY - noPosition.y || 1) * jumpDistance;

    // Clamp within bounds
    randomX = Math.max(-maxX / 2, Math.min(maxX / 2, randomX));
    randomY = Math.max(-maxY / 2, Math.min(maxY / 2, randomY));

    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setAccepted(true);
    
    // Confetti shower!
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#06b6d4', '#10b981', '#3b82f6', '#a7f3d0']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#06b6d4', '#10b981', '#3b82f6', '#a7f3d0']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="py-24 px-6 relative z-10 font-sans">
      <div 
        ref={containerRef}
        className="max-w-2xl mx-auto backdrop-blur-xl bg-cyan-50/50 border border-white/60 rounded-[40px] shadow-lg p-8 md:p-16 text-center relative overflow-hidden min-h-[400px] flex flex-col justify-center"
      >
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-blue-950 mb-12 leading-tight">
                Você aceita continuar sendo minha parceira de aventuras pra sempre?
              </h2>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-12 rounded-full shadow-lg shadow-cyan-200 text-xl transition-transform z-20"
                >
                  Sim!
                </motion.button>

                <motion.button
                  ref={noButtonRef}
                  animate={{ x: noPosition.x, y: noPosition.y }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover} // For mobile taps
                  className="bg-white text-slate-400 font-bold border border-slate-100 py-4 px-12 rounded-full shadow text-xl z-20 absolute md:relative"
                  style={{
                    left: "auto",
                  }}
                >
                  Não
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5, duration: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <Heart className="text-teal-500 animate-pulse" size={48} fill="currentColor" />
              </div>
              <h2 className="text-4xl font-bold text-cyan-600 mb-4 font-handwriting text-5xl">
                Sabia que você ia escolher a alternativa certa!
              </h2>
              <p className="text-2xl text-slate-600 font-light mt-4">
                Te amo infinitamente, Chuchuzinho! 💙
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MiniGame;
