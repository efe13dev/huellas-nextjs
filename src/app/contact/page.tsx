import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function Contact(): JSX.Element {
  return (
    <div className='bg-gradient-to-b from-gray-50 to-white  py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center text-3xl font-bold mb-12 text-gray-800'>
          Contacta con nosotros
        </h2>
        <form className='mx-auto max-w-xl flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg'>
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
              htmlFor='mensaje'
              className='text-sm font-medium text-gray-700'
            >
              Mensaje
            </label>
            <Textarea
              id='mensaje'
              placeholder='Escribe tu mensaje aquí...'
              className='w-full h-32'
            />
          </div>
          <Button className='w-1/2 mx-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out'>
            Enviar mensaje
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
