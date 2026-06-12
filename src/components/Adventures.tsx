import { motion } from "motion/react";
import { Ticket, CakeSlice, Music } from "lucide-react";
import React, { useRef } from "react";

const cards = [
  {
    id: 1,
    icon: Ticket,
    title: "Nossas Sessões de Cinema",
    description: "Cada filme fica melhor com você! De La La Land à Devoradores de Estrela.",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    id: 2,
    icon: CakeSlice,
    title: "Os Melhores Momentos",
    description: "De jantares chiques à podrões. Tudo é mais gostoso quando estou com você.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    id: 3,
    icon: Music,
    title: "Nossa Trilha Sonora",
    description: "Nossa vida tem a melhor playlist, uma mistura perfeita entre as eras da Taylor Swift e a vibe boa da Lagum.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const TiltCard = ({ card }: { card: typeof cards[0]; key?: React.Key }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-15 to 15 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div variants={itemVariants as any}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="flex flex-col items-center text-center p-8 bg-white/30 backdrop-blur-md rounded-[32px] shadow-lg border border-white/50 w-full cursor-pointer relative hover:bg-white/50 transition-colors h-full group"
      >
        {/* Tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 whitespace-nowrap hidden md:block z-50">
          Lembranças incríveis ✨
        </div>

        <div 
          style={{ transform: "translateZ(50px)" }}
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner ${card.bg} ${card.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}
        >
          <card.icon size={40} />
        </div>
        <h3 
          style={{ transform: "translateZ(30px)" }}
          className="text-2xl font-semibold text-slate-800 mb-4"
        >
          {card.title}
        </h3>
        <p 
          style={{ transform: "translateZ(20px)" }}
          className="text-slate-600 leading-relaxed font-light"
        >
          {card.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Adventures = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} className="py-24 px-6 relative z-10 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-blue-950 mb-4"
        >
          Nossas Aventuras
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-500 text-lg font-light"
        >
          Os rascunhos de uma história linda que estamos escrevendo juntos.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 perspective-[1000px]"
      >
        {cards.map((card) => (
          <TiltCard key={card.id} card={card} />
        ))}
      </motion.div>
    </section>
  );
});

Adventures.displayName = "Adventures";

export default Adventures;
