import React from 'react';
import { Button } from './ui/button';

function HelpUs(): JSX.Element {
  return (
    <section className='flex flex-col gap-12 lg:m-40 m-8 rounded-lg bg-gradient-to-t from-transparent to-slate-500 h-[50vh] p-6 text-xl justify-center items-center'>
      <p className='text-pretty'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora minima
        debitis dolorum, architecto quaerat eos quibusdam quos inventore,
        numquam iure eum, dolor tenetur et. Pariatur sed minima nobis, rem
        quibusdam blanditiis numquam tenetur. Ut maxime officia numquam
        officiis, corrupti dolores!
      </p>
      <p className='text-pretty'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sapiente
        consequatur magnam animi ipsum illum tempore! Qui at in aperiam dolore
        illo aliquam perspiciatis dolorum facilis velit esse quos, omnis
        voluptatibus consequuntur quae. Modi vitae quisquam in fuga. Esse nam
        rem aspernatur aliquam dolorem vel repellat eveniet ullam reprehenderit
        nemo hic, reiciendis suscipit expedita quam dicta sapiente dignissimos
        voluptates quod!
      </p>
      <Button className='w-fit'>Donar</Button>
    </section>
  );
}

export default HelpUs;
