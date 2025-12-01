import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StripViewerProps {
  imageUrl: string;
  date: string;
  title?: string;
  onPrevious: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

const StripViewer = ({
  imageUrl,
  date,
  title,
  onPrevious,
  onNext,
  hasNext,
  hasPrevious,
}: StripViewerProps) => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block border-2 border-primary px-6 py-2">
            <p className="text-xs tracking-[0.3em] uppercase font-medium">
              Edición del día
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {new Date(date).toLocaleDateString('es-ES', { 
              day: 'numeric',
              month: 'long',
              year: 'numeric' 
            })}
          </h2>
          {title && (
            <p className="text-lg text-muted-foreground italic">{title}</p>
          )}
        </div>

        {/* Comic strip */}
        <div className="relative bg-card border-2 border-primary p-4 md:p-8 shadow-editorial">
          <img
            src={imageUrl}
            alt={`Tira cómica del ${date}`}
            className="w-full h-auto"
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={!hasPrevious}
            className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Tira diaria
          </div>
          
          <Button
            variant="outline"
            onClick={onNext}
            disabled={!hasNext}
            className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-30"
          >
            Siguiente
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StripViewer;
