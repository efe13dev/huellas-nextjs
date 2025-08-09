"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

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

    const isValidAdoption = typeof adoptionParam === "string" && adoptionParam.trim() !== "";

    setFormData((prevData) => ({
      ...prevData,
      asunto: isValidAdoption ? "adopcion" : "",
      mensaje: isValidAdoption ? `Estoy interesad@ en adoptar a ${adoptionParam}. ` : "",
    }));
  }, [searchParams]);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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

        console.error("Error:", error);
        alert("Error al enviar el mensaje");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10">
      <div className="container mx-auto px-6 py-8 md:py-12">
        <div className="mb-16 space-y-6 text-center">
          <h1 className="text-gradient bg-gradient-to-r from-primary via-soft-blue to-warm-orange bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
            Contacto
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
            ¿Tienes alguna pregunta o quieres adoptar uno de nuestros animales? Estamos aquí para
            ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
          </p>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-warm-orange"></div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="animate-slide-in rounded-2xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-sm md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <label htmlFor="nombre" className="text-sm font-semibold text-foreground">
                    Nombre completo
                  </label>
                  <Input
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="h-12 border-border/50 transition-colors duration-300 focus:border-primary"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 border-border/50 transition-colors duration-300 focus:border-primary"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="asunto" className="text-sm font-semibold text-foreground">
                  Asunto
                </label>
                <Select value={formData.asunto} onValueChange={handleSelectChange}>
                  <SelectTrigger className="h-12 border-border/50 transition-colors duration-300 focus:border-primary">
                    <SelectValue placeholder="Selecciona un asunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adopcion">Adopción</SelectItem>
                    <SelectItem value="voluntariado">Voluntariado</SelectItem>
                    <SelectItem value="donacion">Donación</SelectItem>
                    <SelectItem value="informacion">Información general</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label htmlFor="mensaje" className="text-sm font-semibold text-foreground">
                  Mensaje
                </label>
                <Textarea
                  id="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="resize-none border-border/50 transition-colors duration-300 focus:border-primary"
                  placeholder="Escribe aquí tu mensaje..."
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="hover-lift h-14 w-full rounded-xl bg-gradient-to-r from-primary to-soft-blue text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:from-soft-blue hover:to-primary hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-3">
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
                        className="h-5 w-5"
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
          <DialogContent className="rounded-2xl border-border/50 bg-card shadow-2xl">
            <DialogHeader className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
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
              <DialogDescription className="leading-relaxed text-muted-foreground">
                Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes
                posible. Mientras tanto, puedes seguir explorando nuestros animales disponibles para
                adopción.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                }}
                className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90"
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
