'use client';
import React, { useState } from 'react';
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

function Contact(): JSX.Element {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

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
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
          alert('Mensaje enviado con éxito');
          setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        } else {
          alert('Error al enviar el mensaje');
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error:', error);
        alert('Error al enviar el mensaje');
      });
  };

  return (
    <div className='bg-gradient-to-b from-gray-50 to-white py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center text-3xl font-bold mb-12 text-gray-800'>
          Contacta con nosotros
        </h2>
        <form
          onSubmit={handleSubmit}
          className='mx-auto max-w-xl flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg'
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
              type='text'
              placeholder='Tu nombre'
              required
              className='w-full'
              value={formData.nombre}
              onChange={handleChange}
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
              type='email'
              placeholder='tu@email.com'
              required
              className='w-full'
            />
          </div>
          <div className='space-y-2'>
            <label
              htmlFor='asunto'
              className='text-sm font-medium text-gray-700'
            >
              Asunto
            </label>
            <Select
              onValueChange={handleSelectChange}
              value={formData.asunto}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecciona un asunto' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='adopcion'>Adopción</SelectItem>
                <SelectItem value='ayuda'>Ayuda</SelectItem>
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
              placeholder='Escribe tu mensaje aquí...'
              className='w-full h-32'
              value={formData.mensaje}
              onChange={handleChange}
            />
          </div>
          <Button
            type='submit'
            className='w-1/2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'
          >
            Enviar mensaje
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
