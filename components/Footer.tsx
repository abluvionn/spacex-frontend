import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='text-white py-6 px-5 footer font-inter'>
      <div className='px-[10px] mx-auto max-w-md'>
        <div className='p-7 rounded-4xl bg-white flex flex-col items-start gap-4 w-full'>
          <Image src='/icons/footer.png' width={47} height={33} alt='logo' />
          <span className='text-[#02033B] font-poppins font-semibold text-lg tracking-wide'>
            Sign up to our newsletter
          </span>
          <p className='text-[#02033B] font-poppins text-xs tracking-wide'>
            Receive the latest news, exclusive discounts & offers straight to
            your inbox!
          </p>
          <div className='flex items-center min-w-0 w-full'>
            <input
              name='email'
              autoComplete='email'
              type='text'
              className='flex-1 min-w-0 bg-[#EBEBEB] text-black text-sm py-[6px] ps-3 rounded-l-full placeholder:text-[#02033B80] placeholder:font-inter placeholder:text-xs'
              placeholder='Email address'
            />
            <button className='bg-accent text-sm py-[6px] px-5 rounded-r-full cursor-pointer active:bg-accent/80 transition shrink-0'>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center tracking-wide gap-5 mt-[25px]'>
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
      <div className='pt-[39px] flex flex-col lg:flex-row lg:gap-10 lg:justify-center'>
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
      <div className='flex flex-wrap justify-center gap-4 underline underline-offset-2 mt-[22px]'>
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
