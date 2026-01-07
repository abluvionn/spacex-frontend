import AboutUs from '@/components/AboutUs';
import DriverOpportunities from '@/components/DriverOpportunities';
import Features from '@/components/Features';
import OurMission from '@/components/OurMission';

export default function Home() {
  return (
    <main className='relative'>
      <Features />
      <OurMission />
      <AboutUs />
      <DriverOpportunities />
    </main>
  );
}
