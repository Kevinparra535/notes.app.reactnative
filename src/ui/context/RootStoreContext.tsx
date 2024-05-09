// Librerias
import { createContext, useMemo } from 'react';

import { RootStore } from '../store/RootStore';

import { TYPES } from '@/config/types';
import { container } from '@/config/di';

// Otros

type Props = {
  children: any;
};

const RootStoreContext = createContext<RootStore | null>(null);

export function RootStoreProvider({ children }: Props) {
  const rootStore = useMemo(() => container.get<RootStore>(TYPES.RootStore), []);
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
}
export default RootStoreContext;
