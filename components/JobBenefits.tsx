const items = [
  {
    title: 'Health Insurance',
    description:
      'Medical, dental, and vision coverage for drivers and their families',
  },
  {
    title: 'Flexible Schedules',
    description:
      'Enjoy a healthy work-life balance with vacation days and home time flexibility',
  },
  {
    title: 'Modern Fleet',
    description:
      'Drive safely and comfortably with access to the latest vehicles and technology',
  },
  {
    title: 'Performance Bonuses',
    description:
      'Rewarding hard work with regular incentives for safe and efficient driving',
  },
  {
    title: 'Paid Training',
    description:
      'We invest in your growth with full support for licenses and skill upgrades',
  },
  {
    title: 'Supportive Dispatch Team',
    description:
      'Our team is always just a call away—clear communication, no surprises',
  },
];

const JobBenefits = () => {
  return (
    <section className='job-benefits pt-[42px] pb-[69px] lg:pt-[70px] lg:pb-[100px] px-5'>
      <h2
        className='text-2xl font-bold uppercase text-center lg:text-4xl'
        style={{ fontVariantCaps: 'all-small-caps' }}
      >
        Job Benefits
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

export default JobBenefits;
