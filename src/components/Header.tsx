function Header(): JSX.Element {
  return (
    <header className='flex space-x-96 justify-center items-center'>
      <img
        className='w-64'
        src='./fido-logo-grande.jpeg'
        alt='logo'
      />
      <h1 className='text-5xl font-bold'>FIDO</h1>
    </header>
  );
}

export default Header;
