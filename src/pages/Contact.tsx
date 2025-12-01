import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In production, this would send to a backend
    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactar. Responderemos pronto.",
    });
    
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block border-2 border-primary px-6 py-2 mb-4">
              <p className="text-xs tracking-[0.3em] uppercase font-medium">
                Contacto
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Escríbenos
            </h1>
            <p className="text-lg text-muted-foreground">
              Sugerencias, comentarios o simplemente para saludar
            </p>
          </div>

          {/* Contact form */}
          <div className="border-2 border-primary p-8 md:p-12 bg-card shadow-editorial">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 uppercase tracking-wider">
                  Nombre
                </label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-2 border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 uppercase tracking-wider">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-2 border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 uppercase tracking-wider">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="border-2 border-primary focus:ring-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full border-2 border-primary py-6 text-lg font-medium hover:bg-primary hover:text-primary-foreground"
                variant="outline"
              >
                Enviar Mensaje
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t-2 border-primary text-center">
              <p className="text-sm text-muted-foreground">
                También puedes contactarnos directamente en:{" "}
                <a 
                  href="mailto:hola@paperboy.com" 
                  className="font-medium text-foreground hover:opacity-60 transition-opacity"
                >
                  hola@paperboy.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
