'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

function Contact(): React.JSX.Element {
  const searchParams = useSearchParams();
  const [adoption, setAdoption] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const adoptionParam = searchParams.get('adoption');
    setAdoption(adoptionParam);

    setFormData((prevData) => ({
      ...prevData,
      asunto: 'adopcion',
      mensaje: `Estoy interesad@ en adoptar a ${adoption}. `
    }));
  }, [searchParams, adoption]);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
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
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          setIsModalOpen(true);
          setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        } else {
          alert('Error al enviar el mensaje');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.error('Error:', error);
        alert('Error al enviar el mensaje');
      });
  };

  const isFormValid = (): boolean => {
    return (
      formData.nombre.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.asunto !== '' &&
      formData.mensaje.trim() !== ''
    );
  };

  return (
    <div className='bg-gradient-to-b from-gray-50 to-white py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center text-3xl font-bold mb-12 text-gray-800'>
          {adoption !== null && adoption.trim() !== ''
            ? `Contacto para adoptar a ${adoption}`
            : 'Contacta con nosotros'}
        </h2>
        <form
          onSubmit={handleSubmit}
          className='mx-auto max-w-xl flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg animate-slide-in'
        >
          <div className='space-y-2'>
            <label
              htmlFor='nombre'
              className='text-sm font-medium text-gray-700'
            >
              Nombre
            </label>
            <Input
              id='nombre'
              name='nombre'
              type='text'
              placeholder='Tu nombre'
              required
              className='w-full'
              value={formData.nombre}
              onChange={handleChange}
              autoComplete='name'
            />
          </div>
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='tu@email.com'
              required
              value={formData.email}
              onChange={handleChange}
              className='w-full'
              autoComplete='email'
            />
          </div>
          <div className='space-y-2'>
            <label
              htmlFor='asunto-select'
              className='text-sm font-medium text-gray-700'
            >
              Asunto
            </label>
            <Select
              onValueChange={handleSelectChange}
              value={formData.asunto}
            >
              <SelectTrigger
                id='asunto-select'
                name='asunto'
              >
                <SelectValue placeholder='Selecciona un asunto' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='adopcion'>Adopción</SelectItem>
                <SelectItem value='ayuda'>Ayudar</SelectItem>
                <SelectItem value='otros'>Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <label
              htmlFor='mensaje'
              className='text-sm font-medium text-gray-700'
            >
              Mensaje
            </label>
            <Textarea
              id='mensaje'
              name='mensaje'
              placeholder='Escribe tu mensaje aquí...'
              className='w-full h-32'
              value={formData.mensaje}
              onChange={handleChange}
              autoComplete='off'
            />
          </div>
          <Button
            type='submit'
            className='w-1/2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
        </form>
        <Dialog
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mensaje enviado con éxito</DialogTitle>
              <DialogDescription>
                Gracias por contactarnos. Pronto nos pondremos en contacto
                contigo.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cerrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default Contact;
