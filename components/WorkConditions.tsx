const items = [
  {
    title: 'HOS Regulation',
    description:
      'We strictly follow FMCSA guidelines to ensure driver safety and compliance. ',
  },
  {
    title: 'Comprehensive Safety Training',
    description:
      'Regular training sessions to keep drivers updated on best safety practices',
  },
  {
    title: 'Mental Health Support',
    description:
      'Access to counseling services and stress management resources',
  },
  {
    title: 'Communication Channels',
    description:
      'Open lines of communication between drivers and management for feedback and support',
  },
  {
    title: 'Preventative Vehicle Maintenance',
    description:
      'Regular inspections and maintenance to ensure vehicle safety and reliability',
  },
  {
    title: 'Use of Advanced Technology',
    description:
      'Equipped with GPS and safety monitoring systems to enhance driver security and efficiency',
  },
];

const WorkConditions = () => {
  return (
    <section
      className='work-conditions pt-[42px] pb-[69px] lg:pt-[70px] lg:pb-[100px] px-5'
      id='work-conditions'
    >
      <h2
        className='text-2xl font-bold uppercase text-center lg:text-4xl'
        style={{ fontVariantCaps: 'all-small-caps' }}
      >
        work conditions
      </h2>
      <div className='grid justify-items-center grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-9 font-poppins mt-10 lg:mt-[55px] lg:max-w-5xl mx-auto'>
        {items.map((item) => (
          <div
            key={item.title}
            className='w-full p-4 lg:p-9 border border-[#9A9A9A] rounded bg-white max-w-md'
          >
            <h3 className='text-base lg:text-xl font-semibold mb-2 tracking-wide'>
              {item.title}
            </h3>
            <p className='text-xs lg:text-base text-dark-gray'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkConditions;
