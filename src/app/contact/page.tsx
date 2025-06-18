"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

function Contact(): React.JSX.Element {
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const adoptionParam = searchParams.get("adoption");


    const isValidAdoption =
      typeof adoptionParam === "string" && adoptionParam.trim() !== "";
    setFormData((prevData) => ({
      ...prevData,
      asunto: isValidAdoption ? "adopcion" : "",
      mensaje: isValidAdoption
        ? `Estoy interesad@ en adoptar a ${adoptionParam}. `
        : "",
    }));
  }, [searchParams]);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string): void => {
    setFormData({ ...formData, asunto: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          setIsModalOpen(true);
          setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
        } else {
          alert("Error al enviar el mensaje");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.error("Error:", error);
        alert("Error al enviar el mensaje");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10">
      <div className="container mx-auto px-6 py-8 md:py-12">
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient bg-gradient-to-r from-primary via-soft-blue to-warm-orange bg-clip-text text-transparent">
            Contacto
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            ¿Tienes alguna pregunta o quieres adoptar uno de nuestros animales?
            Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos
            lo antes posible.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-warm-orange mx-auto rounded-full"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl p-8 md:p-12 animate-slide-in">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label
                    htmlFor="nombre"
                    className="text-sm font-semibold text-foreground"
                  >
                    Nombre completo
                  </label>
                  <Input
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="h-12 border-border/50 focus:border-primary transition-colors duration-300"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground"
                  >
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 border-border/50 focus:border-primary transition-colors duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="asunto"
                  className="text-sm font-semibold text-foreground"
                >
                  Asunto
                </label>
                <Select
                  value={formData.asunto}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="h-12 border-border/50 focus:border-primary transition-colors duration-300">
                    <SelectValue placeholder="Selecciona un asunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adopcion">Adopción</SelectItem>
                    <SelectItem value="voluntariado">Voluntariado</SelectItem>
                    <SelectItem value="donacion">Donación</SelectItem>
                    <SelectItem value="informacion">
                      Información general
                    </SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="mensaje"
                  className="text-sm font-semibold text-foreground"
                >
                  Mensaje
                </label>
                <Textarea
                  id="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="border-border/50 focus:border-primary transition-colors duration-300 resize-none"
                  placeholder="Escribe aquí tu mensaje..."
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-primary to-soft-blue hover:from-soft-blue hover:to-primary text-white font-semibold text-lg rounded-xl transition-all duration-300 hover-lift shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando mensaje...
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Enviar mensaje
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-card border-border/50 rounded-2xl shadow-2xl">
            <DialogHeader className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                ¡Mensaje enviado!
              </DialogTitle>
              <DialogDescription className="text-muted-foreground leading-relaxed">
                Gracias por contactarnos. Hemos recibido tu mensaje y te
                responderemos lo antes posible. Mientras tanto, puedes seguir
                explorando nuestros animales disponibles para adopción.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-300"
              >
                Entendido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Contact;
