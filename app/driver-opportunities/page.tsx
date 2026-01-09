import AboutUsBanner from '@/components/AboutUsBanner';
import FAQ from '@/components/FAQ';
import JobBenefits from '@/components/JobBenefits';
import WorkConditions from '@/components/WorkConditions';

const page = () => {
  return (
    <main>
      <AboutUsBanner />
      <JobBenefits />
      <WorkConditions />
      <FAQ />
    </main>
  );
};

export default page;
