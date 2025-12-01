import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComicStrip {
  id: string;
  imageUrl: string;
  date: string;
  title?: string;
}

interface ArchiveRollerProps {
  strips: ComicStrip[];
  onStripClick: (id: string) => void;
}

const ArchiveRoller = ({ strips, onStripClick }: ArchiveRollerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = scrollContainerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-secondary border-t-2 border-primary">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block border-2 border-primary px-6 py-2 mb-4">
            <p className="text-xs tracking-[0.3em] uppercase font-medium">
              Archivo Completo
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Todas las Ediciones
          </h2>
          <p className="text-muted-foreground mt-2">
            Recorre el historial completo de tiras
          </p>
        </div>

        {/* Roller controls */}
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground shadow-newspaper"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Horizontal scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth-x scrollbar-hide px-12"
          >
            {strips.map((strip) => (
              <button
                key={strip.id}
                onClick={() => onStripClick(strip.id)}
                className="flex-shrink-0 group"
              >
                <div className="w-64 border-2 border-primary bg-card overflow-hidden shadow-newspaper hover:shadow-editorial transition-shadow">
                  <img
                    src={strip.imageUrl}
                    alt={`Tira del ${strip.date}`}
                    className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                  <div className="p-4 border-t-2 border-primary">
                    <p className="text-sm font-medium">
                      {new Date(strip.date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                    {strip.title && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {strip.title}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 border-2 border-primary bg-background hover:bg-primary hover:text-primary-foreground shadow-newspaper"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArchiveRoller;
