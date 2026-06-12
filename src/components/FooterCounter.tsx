import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

// --- START DATE VARIABLE ---
// Change this to the exact date you started dating!
// Format: "YYYY-MM-DDTHH:mm:ss" (Example: "2020-06-12T00:00:00")
const START_DATE = "2020-02-14T00:00:00"; 

const FooterCounter = () => {
  const [timeTogether, setTimeTogether] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const startDate = new Date(START_DATE).getTime();

    const updateCounter = () => {
      const now = new Date().getTime();
      const difference = now - startDate;

      const seconds = Math.floor((difference / 1000) % 60);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 365);
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

      setTimeTogether({ years, days, hours, minutes, seconds });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-16 px-6 relative z-10 w-full mx-auto p-6 max-w-5xl">
      <div className="backdrop-blur-xl bg-slate-900/80 border border-white/10 rounded-[40px] p-12 text-white shadow-xl flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-16 h-16 rounded-full bg-pink-500 mx-auto mb-6 flex items-center justify-center animate-pulse">
             <Heart size={32} className="text-white fill-white" />
          </div>
          <p className="text-2xl md:text-3xl font-bold font-handwriting text-slate-100 italic">
            Para sempre meu amor.
          </p>
          <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-bold">
            Estamos juntos há
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4 font-serif">
          <TimeBlock value={timeTogether.years} label="Anos" />
          <TimeBlock value={timeTogether.days} label="Dias" />
          <TimeBlock value={timeTogether.hours} label="Horas" />
          <TimeBlock value={timeTogether.minutes} label="Minutos" />
          <TimeBlock value={timeTogether.seconds} label="Segundos" />
        </div>
      </div>
    </footer>
  );
};

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-2xl md:text-4xl font-bold text-white mb-1">
      {value.toString().padStart(2, '0')}
    </div>
    <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
  </div>
);

export default FooterCounter;
