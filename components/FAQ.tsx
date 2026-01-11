'use client';

import { useState } from 'react';

const answers = [
  'We require a minimum of 1 year of recent, verifiable CDL driving experience. However, drivers with more experience are highly valued and may qualify for additional benefits. If you have slightly less experience, we encourage you to still reach out — some positions may offer training or mentorship programs depending on availability.',
  'We offer a modern and well-maintained fleet that includes a variety of truck types to meet different hauling needs. Our equipment primarily consists of late-model Freightliner and Volvo tractors, equipped with automatic transmissions and advanced safety features. Depending on the route and cargo, we provide dry vans, reefers (refrigerated trailers), and flatbeds. All trucks are regularly serviced to ensure reliability, safety, and driver comfort on the road.',
  "We primarily operate across the continental United States, with a strong focus on Midwest, Southeast, and West Coast lanes. Our most common routes include long-haul, regional, and dedicated lanes, depending on the customer's needs and driver preferences. Whether you're looking for coast-to-coast runs or more consistent regional routes, we offer flexible options to match a variety of driving styles and home-time requirements.",
  'We offer a comprehensive benefits package designed to support our drivers and their families. This includes medical, dental, and vision insurance, as well as life and disability coverage. Eligible drivers may also receive paid time off, performance bonuses, and a 401(k) retirement plan with company match. Additional perks may include safety incentives, referral bonuses, fuel discounts, and access to rider and pet policies, depending on the position and location.',
  'Driver pay is typically calculated based on mileage (cents per mile), but may also include additional compensation such as stop pay, detention pay, layover pay, and safety or performance bonuses. Rates can vary depending on experience, route type (regional vs. OTR), and the type of freight hauled. Some positions may offer salary-based or percentage-of-load pay structures. We ensure transparency in pay and provide regular settlements so drivers can track their earnings with confidence.',
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const toggleAnswer = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      className='px-[29px] pt-[62px] pb-[46px] max-w-7xl mx-auto'
      id='faq'
    >
      <div className='lg:flex lg:gap-6 lg:items-stretch'>
        <div className='lg:flex-1'>
          <h3 className='faq-title font-poppins font-semibold text-4xl uppercase mb-4 lg:text-3xl'>
            FAQ
          </h3>
          <ul>
            <li
              className={`faq-question ${activeIndex === 0 ? 'active' : ''}`}
              onClick={() => toggleAnswer(0)}
            >
              How much experience do I need to apply?
            </li>
            <li
              className={`faq-question ${activeIndex === 1 ? 'active' : ''}`}
              onClick={() => toggleAnswer(1)}
            >
              What types of trucks do you provide?
            </li>
            <li
              className={`faq-question ${activeIndex === 2 ? 'active' : ''}`}
              onClick={() => toggleAnswer(2)}
            >
              What regions or routes do you mainly cover?
            </li>
            <li
              className={`faq-question ${activeIndex === 3 ? 'active' : ''}`}
              onClick={() => toggleAnswer(3)}
            >
              What insurance or benefits do you provide?
            </li>
            <li
              className={`faq-question ${activeIndex === 4 ? 'active' : ''}`}
              onClick={() => toggleAnswer(4)}
            >
              How is driver pay calculated?
            </li>
          </ul>
        </div>
        <div className='flex flex-col mt-5 lg:flex-1 lg:mt-0'>
          <h3 className='font-poppins font-semibold text-3xl mb-4 hidden lg:block'>
            Answers
          </h3>
          <p className='bg-[#E7E7E7] p-[22px] rounded-[9px] font-poppins text-sm leading-6 lg:text-lg lg:p-9 lg:leading-9 flex-1'>
            {answers[activeIndex]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
