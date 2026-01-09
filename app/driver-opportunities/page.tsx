import DriverOpportunitiesBanner from '@/components/DriverOpportunitiesBanner';
import FAQ from '@/components/FAQ';
import JobBenefits from '@/components/JobBenefits';
import WorkConditions from '@/components/WorkConditions';

const page = () => {
  return (
    <main>
      <DriverOpportunitiesBanner />
      <JobBenefits />
      <WorkConditions />
      <FAQ />
    </main>
  );
};

export default page;
