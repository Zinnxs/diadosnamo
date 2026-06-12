import { motion } from "motion/react";
import { Ticket, CakeSlice, Gamepad2 } from "lucide-react";
import React, { useRef } from "react";

const cards = [
  {
    id: 1,
    icon: Ticket,
    title: "Nossas Sessões de Cinema",
    description: "Cada filme fica melhor com você do lado.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    id: 2,
    icon: CakeSlice,
    title: "Os Melhores Momentos",
    description: "De jantares chiques à podrões. Tudo é mais gostoso quando estamos juntos.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    id: 3,
    icon: Gamepad2,
    title: "Minha Player 2",
    description: "Não importa o jogo, você sempre será a minha dupla imbatível em todas as aventuras.",
    color: "text-violet-500",
    bg: "bg-violet-50",
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
    <motion.div
      variants={itemVariants}
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
      className="flex flex-col items-center text-center p-8 bg-white/30 backdrop-blur-md rounded-[32px] shadow-lg border border-white/50 w-full cursor-pointer relative hover:bg-white/50 transition-colors"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner ${card.bg} ${card.color}`}
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
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
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
