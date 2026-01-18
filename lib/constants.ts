export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Driver Opportunities', path: '/driver-opportunities' },
  { name: 'Contact', path: '#contacts' },
];
export const applicationFormLink = {
  name: 'Apply Now',
  path: '/application-form',
};
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/';
