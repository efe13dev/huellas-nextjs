import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

function Contact(): JSX.Element {
  return (
    <main>
      <h2 className='text-center text-2xl'>Contacta</h2>
      <form className=' mx-auto max-w-xl flex flex-col gap-10 mt-10'>
        <Input
          type='text'
          placeholder='Nombre'
          required
        />
        <Input
          type='email'
          placeholder='email'
          required
        />
        <Textarea placeholder='mensaje...' />
        <Button className='w-fit'>Enviar</Button>
      </form>
    </main>
  );
}

export default Contact;
