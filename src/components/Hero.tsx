import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  onScrollClick: () => void;
}

const Hero = ({ onScrollClick }: HeroProps) => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="glass-card p-8 md:p-12 w-full max-w-3xl mx-auto flex flex-col justify-center items-center text-center"
      >
        <span className="px-4 py-1 rounded-full bg-cyan-100 text-cyan-600 text-xs font-bold tracking-widest uppercase mb-6">Nossos 4 Anos</span>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-blue-950 mb-6 leading-tight pb-2"
        >
          Feliz 4º Dia dos Namorados, meu{" "}
          <span className="font-handwriting text-5xl md:text-7xl text-emerald-500 italic inline-block translate-y-1">Chuchuzinho!</span> 💚
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="text-lg md:text-2xl font-medium text-slate-600 mt-4"
        >
          Com todo amor, do seu <span className="text-cyan-600">Bebê</span>
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onScrollClick}
        className="absolute bottom-12 md:bottom-20 flex flex-col items-center gap-3 text-cyan-500 hover:text-cyan-600 transition-colors group"
      >
        <span className="font-medium tracking-wider text-sm uppercase">Desça para ver uma surpresa</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="p-3 bg-white/50 backdrop-blur-sm rounded-full shadow-md group-hover:bg-white/80 transition-all"
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
