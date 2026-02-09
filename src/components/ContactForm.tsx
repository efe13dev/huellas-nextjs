"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="section-decorated min-h-screen bg-gradient-to-b from-cream/40 via-background to-background">
      <div className="container relative mx-auto px-4 py-12 sm:px-6 md:py-16">
        <div className="mb-12 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Escríbenos
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Ponte en <span className="text-gradient">contacto</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            ¿Tienes alguna pregunta o quieres adoptar uno de nuestros animales? Estamos aquí para
            ayudarte.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="card-gradient-border animate-slide-in rounded-2xl bg-background/90 p-6 shadow-xl backdrop-blur-sm sm:p-8 md:p-12">
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
                  className="hover-lift h-14 w-full rounded-xl bg-gradient-to-r from-primary to-warm-orange text-lg font-semibold text-white shadow-xl shadow-primary/20 transition-all duration-300 hover:shadow-2xl hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
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
