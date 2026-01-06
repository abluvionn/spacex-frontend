import AboutUs from '@/components/AboutUs';
import CallToAction from '@/components/CallToAction';
import DriverOpportunities from '@/components/DriverOpportunities';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import OurMission from '@/components/OurMission';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className='relative'>
        <Features />
        <OurMission />
        <AboutUs />
        <DriverOpportunities />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
