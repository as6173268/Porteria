interface StripViewerProps {
  imageUrl: string;
  date: string;
  title?: string;
}

const StripViewer = ({
  imageUrl,
  date,
  title,
}: StripViewerProps) => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block border-2 border-primary px-6 py-2">
            <p className="text-xs tracking-[0.3em] uppercase font-medium">
              Última edición
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
      </div>
    </section>
  );
};

export default StripViewer;
