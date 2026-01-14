export const metadata = {
  title: 'Admin — Login',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='min-h-dvh bg-[#f6f8fb]'>{children}</div>;
}
