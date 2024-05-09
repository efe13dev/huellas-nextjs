import Link from 'next/link';
function Header(): JSX.Element {
  return (
    <header className='flex flex-col items-center justify-center gap-12 lg:flex-row lg:justify-evenly'>
      <img
        className='w-64'
        src='./fido-logo-grande.jpeg'
        alt='logo'
      />
      <h1 className='text-5xl font-bold font-sans'>FIDO</h1>
      <nav>
        <ul className='flex gap-8 text-xl'>
          <li>
            <Link href='/'>Inicio</Link>
          </li>
          <li>
            <Link href='/adoptions'>Adopciones</Link>
          </li>
          <li>
            <Link href='/contact'>Contacto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
