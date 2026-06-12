import { motion } from "motion/react";

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
    caption: "Nosso primeiro encontro mágico...",
    rotate: -4,
    x: 0,
    y: 10,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop",
    caption: "Aquele sorriso que me derrete todo",
    rotate: 3,
    x: 20,
    y: -20,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1518599904199-0ca897819ceb?q=80&w=600&auto=format&fit=crop",
    caption: "O dia que a gente se perdeu, mas se encontrou",
    rotate: -2,
    x: -15,
    y: 5,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1533227260815-a131afef5591?q=80&w=600&auto=format&fit=crop",
    caption: "Simplesmente você sendo perfeita",
    rotate: 5,
    x: 10,
    y: 15,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1516410529446-2c777cb7366d?q=80&w=600&auto=format&fit=crop",
    caption: "Café, rissadas e amorzinho",
    rotate: -6,
    x: -25,
    y: -10,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
    caption: "Te amo daqui até a eternidade",
    rotate: 4,
    x: 5,
    y: 0,
  },
];

const Gallery = () => {
  return (
    <section className="py-24 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Nossas Memórias
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg font-light"
          >
            Pequenos fragmentos do nosso infinito.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 md:gap-12 py-16 px-8 backdrop-blur-xl bg-white/20 border border-white/40 rounded-[40px] shadow-lg perspective-[1200px]">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 100, rotate: photo.rotate - 15 }}
              whileInView={{ opacity: 1, y: photo.y, x: photo.x, rotate: photo.rotate }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.15,
                type: "spring",
                bounce: 0.3
              }}
              whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                zIndex: 40,
                y: 0,
                x: 0,
                boxShadow: "0 25px 50px -12px rgba(236, 72, 153, 0.25)"
              }}
              className="bg-white p-4 pb-6 shadow-xl rounded hover:z-50 transition-shadow duration-300 transform-gpu relative z-10 w-64 md:w-72"
            >
              <div className="overflow-hidden aspect-square rounded-sm mb-4 bg-slate-100">
                <img 
                  src={photo.url} 
                  alt="Nossa memória" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-handwriting text-2xl text-slate-700 text-center px-2 leading-tight min-h-[3rem] flex items-center justify-center">
                {photo.caption}
              </p>
              
              {/* Tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm rotate-[-2deg] opacity-70"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
