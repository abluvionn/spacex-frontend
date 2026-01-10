import AboutUsBanner from '@/components/AboutUsBanner';
import OurFleet from '@/components/OurFleet';
import OurHistory from '@/components/OurHistory';
import OurMissionSection from '@/components/OurMissionSection';
import OurNumbers from '@/components/OurNumbers';
import OurValues from '@/components/OurValues';

const page = () => {
  return (
    <main>
      <AboutUsBanner />
      <OurHistory />
      <OurMissionSection />
      <OurValues />
      <OurFleet />
      <OurNumbers />
    </main>
  );
};

export default page;
