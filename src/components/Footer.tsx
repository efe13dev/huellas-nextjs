import React from 'react';

function Footer(): JSX.Element {
  return (
    <footer className='text-center leading-[3rem] opacity-70'>
      © {new Date().getFullYear()} Protectora Fido
    </footer>
  );
}

export default Footer;
