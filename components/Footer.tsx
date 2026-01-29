import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer
      id='contacts'
      className='text-white py-6 px-5 footer font-inter lg:py-[96px] lg:flex lg:justify-center lg:items-start'
    >
      <div className='hidden lg:grid grid-cols-2 gap-10'>
        <div>
          <span className='font-bold text-2xl'>Follow Us</span>
          <div className='flex gap-[37px] mt-[49px]'>
            <Link href='#'>
              <Image
                src='/icons/twitter.svg'
                height={36}
                width={36}
                alt='twitter icon'
              />
            </Link>
            <Link href='#'>
              <Image
                src='/icons/facebook.svg'
                height={36}
                width={36}
                alt='facebook icon'
              />
            </Link>
            <Link href='#'>
              <Image
                src='/icons/youtube.svg'
                height={36}
                width={36}
                alt='youtube icon'
              />
            </Link>
          </div>
        </div>
        <div>
          <span className='font-bold text-2xl underline underline-offset-8'>
            Quick Links
          </span>
          <ul>
            <li className='mt-3 before:content-[""] before:inline-block before:w-4 before:h-0.5 before:bg-accent flex items-center before:me-4'>
              <Link href='/' className='text-lg font-light'>
                Home
              </Link>
            </li>
            <li className='mt-3 before:content-[""] before:inline-block before:w-4 before:h-0.5 before:bg-accent flex items-center before:me-4'>
              <Link href='/about-us' className='text-lg font-light'>
                About us
              </Link>
            </li>
            <li className='mt-3 before:content-[""] before:inline-block before:w-4 before:h-0.5 before:bg-accent flex items-center before:me-4'>
              <Link href='/driver-opportunities' className='text-lg font-light'>
                Driver Opportunities
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <span className='font-bold text-2xl'>Offices</span>
          <p className='text-base tracking-widest mt-[16px] leading-6.5'>
            United States <br /> 500 5th Avenue Suite 400, NY 10110
          </p>
          <p className='text-base tracking-widest mt-[24px] leading-6.5'>
            United Kingdom <br /> High St, Bromley BR1 1DN
          </p>
        </div>
        <div className='flex flex-col justify-end'>
          <span className='font-bold text-2xl tracking-wide'>
            For Quick Inquiries
          </span>
          <div className='text-sm tracking-wider flex items-center flex-wrap gap-2 pt-[24px] mb-[16px]'>
            <Image
              src='/icons/flag-uk.png'
              width={23}
              height={16}
              alt='uk flag'
            />
            <span>+44 7777777777</span>
          </div>
          <div className='text-sm tracking-wider flex items-center flex-wrap gap-2'>
            <Image
              src='/icons/flag-us.png'
              width={23}
              height={16}
              alt='us flag'
            />
            <span>+1 3333333330</span>
          </div>
        </div>
      </div>
      <div className='px-[10px] mx-auto lg:mx-0 max-w-md'>
        <div className='flex flex-col'>
          <div className='p-7 rounded-4xl bg-white flex flex-col items-start gap-4 w-full'>
            <Image src='/icons/footer.png' width={47} height={33} alt='logo' />
            <span className='text-[#02033B] font-poppins font-semibold text-lg tracking-wide lg:text-[22px]'>
              Sign up to our newsletter
            </span>
            <p className='text-[#02033B] font-poppins text-xs tracking-wide lg:text-base'>
              Receive the latest news, exclusive discounts & offers straight to
              your inbox!
            </p>
            <div className='flex items-center min-w-0 w-full'>
              <input
                name='email'
                autoComplete='email'
                type='text'
                className='flex-1 min-w-0 bg-[#EBEBEB] text-black text-sm py-[6px] ps-3 rounded-l-full placeholder:text-[#02033B80] placeholder:font-inter placeholder:text-xs lg:text-base lg:placeholder:text-base'
                placeholder='Email address'
              />
              <button className='bg-accent text-sm py-[6px] px-5 rounded-r-full cursor-pointer active:bg-accent/80 transition shrink-0 lg:text-base'>
                Submit
              </button>
            </div>
          </div>
          <div className='hidden lg:flex justify-end mt-[90px] gap-6'>
            <Link
              href='#'
              className='text-xs tracking-wider underline underline-offset-2'
            >
              Privacy Policy
            </Link>
            <Link
              href='#'
              className='text-xs tracking-wider underline underline-offset-2'
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:hidden flex flex-col justify-center items-center tracking-wide gap-5 mt-[25px]'>
        <span className='font-extrabold text-2xl'>Follow Us</span>
        <div className='flex gap-[37px]'>
          <Link href='#'>
            <Image
              src='/icons/twitter.svg'
              height={34}
              width={34}
              alt='twitter icon'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/icons/facebook.svg'
              height={34}
              width={34}
              alt='facebook icon'
            />
          </Link>
          <Link href='#'>
            <Image
              src='/icons/youtube.svg'
              height={34}
              width={34}
              alt='youtube icon'
            />
          </Link>
        </div>
      </div>
      <div className='lg:hidden pt-[39px] flex flex-col lg:flex-row lg:gap-10 lg:justify-center'>
        <div>
          <span className='font-bold text-lg tracking-wider'>Offices</span>
          <p className='text-sm tracking-wider mt-[14px] mb-[16px] leading-6'>
            United States <br /> 500 5th Avenue Suite 400, NY 10110
          </p>
          <p className='text-sm tracking-wider mb-[14px] leading-6'>
            United Kingdom <br /> High St, Bromley BR1 1DN
          </p>
        </div>
        <div>
          <span className='font-bold text-lg tracking-wider'>
            For Quick Inquiries
          </span>
          <div className='text-sm tracking-wider flex items-center flex-wrap gap-2 pt-[14px] mb-[16px]'>
            <Image
              src='/icons/flag-uk.png'
              width={23}
              height={16}
              alt='uk flag'
            />
            <span>+44 7777777777</span>
          </div>
          <div className='text-sm tracking-wider flex items-center flex-wrap gap-2'>
            <Image
              src='/icons/flag-us.png'
              width={23}
              height={16}
              alt='us flag'
            />
            <span>+1 3333333330</span>
          </div>
        </div>
      </div>
      <div className='lg:hidden flex flex-wrap justify-center gap-4 underline underline-offset-2 mt-[22px]'>
        <Link href='#' className='text-xs tracking-wider'>
          Privacy Policy
        </Link>
        <Link href='#' className='text-xs tracking-wider'>
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
