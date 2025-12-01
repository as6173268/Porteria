import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StripViewer from "@/components/StripViewer";
import ArchiveRoller from "@/components/ArchiveRoller";
import { comicStrips, getTodayStrip } from "@/data/strips";

const Index = () => {
  const navigate = useNavigate();
  const [currentStripIndex, setCurrentStripIndex] = useState(comicStrips.length - 1);
  const currentStrip = comicStrips[currentStripIndex];

  const handlePrevious = () => {
    if (currentStripIndex > 0) {
      setCurrentStripIndex(currentStripIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStripIndex < comicStrips.length - 1) {
      setCurrentStripIndex(currentStripIndex + 1);
    }
  };

  const handleStripClick = (id: string) => {
    const index = comicStrips.findIndex(strip => strip.id === id);
    if (index !== -1) {
      setCurrentStripIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Today's strip - vertical format */}
        <StripViewer
          imageUrl={currentStrip.imageUrl}
          date={currentStrip.date}
          title={currentStrip.title}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasNext={currentStripIndex < comicStrips.length - 1}
          hasPrevious={currentStripIndex > 0}
        />

        {/* Horizontal archive roller */}
        <ArchiveRoller
          strips={comicStrips}
          onStripClick={handleStripClick}
        />

        {/* Call to action */}
        <section className="py-16 px-6 text-center">
          <div className="container mx-auto max-w-2xl">
            <div className="border-2 border-primary p-12 bg-card shadow-editorial">
              <h3 className="text-3xl font-bold mb-4">
                No te pierdas ninguna edición
              </h3>
              <p className="text-muted-foreground mb-6">
                Visita el archivo completo para recorrer todas las tiras desde el principio
              </p>
              <button
                onClick={() => navigate('/archivo')}
                className="inline-block border-2 border-primary px-8 py-3 font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Ver Archivo Completo
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
