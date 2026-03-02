'use client';

import { useLazyGetAllApplicationsQuery } from '@/lib/api';
import { CSVLink } from 'react-csv';

const DownloadCSVButton = () => {
  const [trigger, { data: applications, isFetching, error }] =
    useLazyGetAllApplicationsQuery();

  const handleClick = async () => {
    try {
      await trigger().unwrap();
    } catch (err) {
      console.error('Failed to fetch applications for download', err);
    }
  };

  if (error) return <div>Error loading applications</div>;

  return (
    <CSVLink
      data={applications || `Error, Failed to load applications, Try again`}
      asyncOnClick={true}
      onClick={handleClick}
      filename={`${new Date().toISOString().split('T')[0]}-applications.csv`}
      target='_blank'
      className={`text-sm bg-blue-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-blue-700 ${isFetching ? 'cursor-not-allowed opacity-50 pointer-events-none' : ''}`}
    >
      {isFetching ? 'Preparing CSV...' : 'Download CSV'}
    </CSVLink>
  );
};

export default DownloadCSVButton;
