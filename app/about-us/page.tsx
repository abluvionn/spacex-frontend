import AboutUsBanner from '@/components/AboutUsBanner';
import OurFleet from '@/components/OurFleet';
import OurHistory from '@/components/OurHistory';
import OurMissionSection from '@/components/OurMissionSection';
import OurValues from '@/components/OurValues';

const page = () => {
  return (
    <main>
      <AboutUsBanner />
      <OurHistory />
      <OurMissionSection />
      <OurValues />
      <OurFleet />
    </main>
  );
};

export default page;
