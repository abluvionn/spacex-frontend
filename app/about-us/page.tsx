import AboutUsBanner from '@/components/AboutUsBanner';
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
    </main>
  );
};

export default page;
