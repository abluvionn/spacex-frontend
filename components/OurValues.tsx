const items = [
  {
    title: 'Safety First',
    description:
      'We prioritize the well-being of our drivers, staff, and the communities we serve by adhering to stringent safety protocols and continuous training.',
  },
  {
    title: 'Teamwork',
    description:
      'Collaboration and mutual respect among our employees foster a supportive work environment and drive collective success.',
  },
  {
    title: 'Integrity',
    description:
      'Honesty and transparency guide our operations, ensuring trustworthiness in every interaction with clients, partners, and team members.',
  },
  {
    title: 'Accountability',
    description:
      'We take responsibility for our actions and decisions, striving for excellence and learning from our experiences to improve continuously.',
  },
  {
    title: 'Customer Commitment',
    description:
      'We are dedicated to exceeding customer expectations through reliable service, timely deliveries, and responsive communication.',
  },
  {
    title: 'Innovation',
    description:
      'Embracing technological advancements and innovative practices allows us to enhance efficiency and stay ahead in the dynamic logistics industry.',
  },
];

const OurValues = () => {
  return (
    <section className='py-8 px-[30px] lg:py-15 our-values'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-primary font-poppins font-bold text-2xl lg:text-4xl uppercase mb-7 lg:mb-12 lg:text-center'>
          Our Values
        </h2>
        <ul className='grid grid-cols-1 gap-[30px] lg:grid-cols-2 justify-items-center lg:gap-[60px]'>
          {items.map((item) => (
            <li
              key={item.title}
              className='bg-white border border-[#9A9A9A] p-6 rounded-xl hover:bg-[#1A2B56] hover:text-white transition max-w-[420px] lg:p-9'
            >
              <span className='text-lg font-poppins font-semibold tracking-wide mb-3 block lg:text-2xl lg:mb-5'>
                {item.title}
              </span>
              <p className='text-sm font-poppins text-justify leading-5'>
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurValues;
