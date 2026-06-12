import { motion } from "motion/react";
import { Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";

const FloatingBackground = () => {
  const [elements, setElements] = useState<{ id: number; type: "heart" | "star"; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random elements on mount
    const newElements = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.5 ? "heart" as const : "star" as const,
      x: Math.random() * 100, // random vw
      y: Math.random() * 100, // random vh
      size: Math.random() * 16 + 8, // 8px to 24px
      delay: Math.random() * 5,
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute text-pink-300 opacity-30"
          initial={{ x: `${el.x}vw`, y: `${el.y}vh`, scale: 0 }}
          animate={{
            y: [`${el.y}vh`, `${el.y - 20}vh`, `${el.y}vh`],
            x: [`${el.x}vw`, `${el.x + 10}vw`, `${el.x - 5}vw`, `${el.x}vw`],
            scale: [1, 1.2, 1],
            rotate: [0, 90, -90, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear",
          }}
          style={{ width: el.size, height: el.size }}
        >
          {el.type === "heart" ? (
            <Heart size={el.size} fill="currentColor" />
          ) : (
            <Star size={el.size} fill="currentColor" />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBackground;
