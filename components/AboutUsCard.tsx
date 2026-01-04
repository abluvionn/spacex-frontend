import Image from 'next/image';
import Link from 'next/link';

type AboutUsCardProps = {
  title?: string;
  description?: string;
  href?: string;
  img: string;
};

const AboutUsCard = ({
  title = 'About Spacex',
  description = 'We deliver safe, reliable, and efficient transportation solutions across the United States. Join us to drive your future forward.',
  href = '#',
  img = '/images/feature-1.jpg',
}: AboutUsCardProps) => {
  return (
    <article className='bg-white rounded-[10px] max-w-md font-poppins flex flex-col justify-between flex-1'>
      <div className='flex flex-col items-start gap-4 pt-8 px-4 lg:px-5 pb-10'>
        <div className='flex-1'>
          <h3 className='font-semibold text-base lg:text-xl'>{title}</h3>
          <p className='text-sm text-dark-gray mt-3 lg:text-base lg:max-w-xs'>
            {description}
          </p>
          <div className='mt-5'>
            <Link
              href={href}
              className='text-xs uppercase tracking-[.25em] font-semibold hover:underline underline-offset-3 flex items-center gap-1'
            >
              <span>Learn More</span>
              <Image
                src='/icons/arrow-right.svg'
                height={10}
                width={12}
                alt='arrow right icon'
              />
            </Link>
          </div>
        </div>
      </div>
      <div className='relative w-full h-[70px] lg:h-[111px]'>
        <div className='absolute w-full h-full bg-[#284283]/40 z-20 rounded-b-[10px]'></div>
        <Image
          src={img}
          alt='feature image'
          fill
          className='rounded-b-[10px] z-10 object-cover'
        />
      </div>
    </article>
  );
};

export default AboutUsCard;
