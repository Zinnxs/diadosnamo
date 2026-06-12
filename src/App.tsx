import { useRef } from "react";
import Hero from "./components/Hero";
import Adventures from "./components/Adventures";
import MiniGame from "./components/MiniGame";
import Gallery from "./components/Gallery";
import FooterCounter from "./components/FooterCounter";
import FloatingBackground from "./components/FloatingBackground";

export default function App() {
  const adventuresRef = useRef<HTMLElement>(null);

  const scrollToAdventures = () => {
    if (adventuresRef.current) {
      adventuresRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen relative font-sans selection:bg-pink-300 selection:text-white">
      <FloatingBackground />
      
      <main className="relative">
        <Hero onScrollClick={scrollToAdventures} />
        <Adventures ref={adventuresRef} />
        <Gallery />
        <MiniGame />
      </main>

      <FooterCounter />
    </div>
  );
}
