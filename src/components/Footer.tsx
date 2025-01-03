import React, { type JSX } from 'react';

function Footer(): JSX.Element {
  return (
    <footer className='bg-gradient-to-b from-white to-gray-200 text-gray-600 py-8 mt-20'>
      <div className='container mx-auto px-4 text-center'>
        <p> {new Date().getFullYear()} Protectora Huellas.</p>
      </div>
    </footer>
  );
}

export default Footer;
