import { inject, injectable } from 'inversify';
import { AuthStore } from './AuthStore';
import { TYPES } from '@/config/types';

@injectable()
export class RootStore {
  @inject(TYPES.AuthStore) public authStore!: AuthStore;
}
