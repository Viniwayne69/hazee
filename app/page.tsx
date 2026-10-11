import { ChatProvider } from "@/components/chat/ChatProvider";
import { FilmGrain } from "@/components/layout/FilmGrain";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageLoader } from "@/components/layout/PageLoader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Contato } from "@/components/sections/Contato";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Marquee } from "@/components/sections/Marquee";
import { Numeros } from "@/components/sections/Numeros";
import { Parceiros } from "@/components/sections/Parceiros";
import { ParticleText } from "@/components/sections/ParticleText";
import { Portfolio } from "@/components/sections/Portfolio";
import { RoboSpline } from "@/components/sections/RoboSpline";
import { Servicos } from "@/components/sections/Servicos";
import { Sobre } from "@/components/sections/Sobre";
import { Valores } from "@/components/sections/Valores";

export default function HomePage() {
  return (
    <ChatProvider>
      <ScrollProgress />
      <WhatsAppFloat />
      <PageLoader />
      <FilmGrain />

      <Navbar />

      <main>
        <Hero>
          <Parceiros />
        </Hero>
        <RoboSpline />
        <ParticleText />
        <Marquee />
        <Servicos />
        <Portfolio />
        <Sobre />
        <Numeros />
        <Manifesto />
        <Valores />
        <Contato />
      </main>

      <Footer />
    </ChatProvider>
  );
}
