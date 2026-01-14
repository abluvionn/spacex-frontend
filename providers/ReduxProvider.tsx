'use client';

import { store } from '@/lib/store';
import { Provider } from 'react-redux';
import { FC } from 'react';

const ReduxProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
