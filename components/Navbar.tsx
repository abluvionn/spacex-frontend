'use client';

import { applicationFormLink, navLinks } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className='p-0 py-5 flex-col lg:flex-row gap-7 sticky top-0 border lg:px-30 flex items-center justify-between bg-white lg:py-8 shadow-md z-10'>
      <div className='relative w-full lg:w-fit flex justify-center items-center'>
        <Link href='/'>
          <Image
            src='/images/logo.jpg'
            alt='SpaceX Logo'
            width={137}
            height={52}
            className='w-[85px] h-[32px] lg:w-[137px] lg:h-[52px]'
          />
        </Link>
        <button
          className='h-6 w-6 absolute top-[50%] translate-y-[-50%] right-6 flex items-center justify-center lg:hidden cursor-pointer px-[3px]'
          onClick={toggleMenu}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <>
              <div className='absolute top-1/2 left-1/2 w-full h-0.5 bg-black rounded transform -translate-x-1/2 -translate-y-1/2 rotate-45'></div>
              <div className='absolute top-1/2 left-1/2 w-full h-0.5 bg-black rounded transform -translate-x-1/2 -translate-y-1/2 -rotate-45'></div>
            </>
          ) : (
            <div className='flex flex-col justify-center gap-1 w-full'>
              <div className='w-full h-0.5 bg-black rounded'></div>
              <div className='w-full h-0.5 bg-black rounded'></div>
              <div className='w-full h-0.5 bg-black rounded'></div>
            </div>
          )}
        </button>
      </div>
      <ul
        className={`${
          open ? 'flex' : 'hidden lg:flex'
        } flex-col lg:flex-row gap-5 items-center lg:gap-5 xl:gap-10 list-none`}
      >
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link href={link.path} className='nav-link'>
              {link.name}
            </Link>
          </li>
        ))}
        <Link href={applicationFormLink.path} className='btn-base px-7 py-3'>
          {applicationFormLink.name}
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
