import Session from '../entities/Session';
import User from '../entities/User';

export interface AuthService {
  checkSession(): Promise<User>;
  loginUser(credentials: Record<string, string>): Promise<Session>;
  loginGoogle(): Promise<any>;
  registerUser(credentials: Record<string, string>): Promise<Session>;
  updateUser(credentials: Record<string, unknown>): Promise<User>;
  deleteUser(credentials: Record<string, string>): Promise<any>;
}
