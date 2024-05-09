import { Container } from 'inversify';
import { TYPES } from './types';

// Stores

// Repositories
import { SessionRepository } from '@/domain/repositories/SessionRepository';
import { SessionRepositoryImpl } from '@/data/repositories/SessionRepositoryImpl';

// Services

// UseCases
import { SignInWithEmailUseCase } from '@/domain/useCases/signInWithEmailAndPassword';

// ViewModels
import { PreLoginViewModel } from '@/ui/screens/PreLogin/viewModel';
import { LoginViewModel } from '@/ui/screens/Login/viewModel';
import { AuthService } from '@/data/services/AuthService';

// Managers

// Strategies

const container = new Container();

// Stores

// Repositories
container.bind<SessionRepository>(TYPES.SessionRepository).to(SessionRepositoryImpl);

// Services
container.bind<AuthService>(TYPES.AuthService).to(AuthService);


// UseCases
container.bind<SignInWithEmailUseCase>(TYPES.SignInWithEmailUseCase).to(SignInWithEmailUseCase);

// ViewModels
container.bind<PreLoginViewModel>(TYPES.PreLoginViewModel).to(PreLoginViewModel);
container.bind<LoginViewModel>(TYPES.LoginViewModel).to(LoginViewModel);

// Managers

// Strategies

export { container };
