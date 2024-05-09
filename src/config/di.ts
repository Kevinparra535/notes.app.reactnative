import { Container } from 'inversify';
import { TYPES } from './types';

// Stores
import { RootStore } from '@/ui/store/RootStore';
import { AuthStore } from '@/ui/store/AuthStore';
// Repositories
import { SessionRepository } from '@/domain/repositories/SessionRepository';
import { SessionRepositoryImpl } from '@/data/repositories/SessionRepositoryImpl';

// Services
import { AuthService } from '@/data/services/AuthService';

// UseCases
import { SignInWithEmailUseCase } from '@/domain/useCases/signInWithEmailAndPassword';

// ViewModels
import { PreLoginViewModel } from '@/ui/screens/PreLogin/viewModel';
import { LoginViewModel } from '@/ui/screens/Login/viewModel';
import { CheckActiveSessionUseCase } from '@/domain/useCases/checkActiveSession';

// Managers

// Strategies

const container = new Container();

// Stores
container.bind<RootStore>(TYPES.RootStore).to(RootStore).inSingletonScope();
container.bind<AuthStore>(TYPES.AuthStore).to(AuthStore).inSingletonScope();

// Repositories
container.bind<SessionRepository>(TYPES.SessionRepository).to(SessionRepositoryImpl);

// Services
container.bind<AuthService>(TYPES.AuthService).to(AuthService);

// UseCases
container.bind<SignInWithEmailUseCase>(TYPES.SignInWithEmailUseCase).to(SignInWithEmailUseCase);
container.bind<CheckActiveSessionUseCase>(TYPES.CheckActiveSessionUseCase).to(CheckActiveSessionUseCase);

// ViewModels
container.bind<PreLoginViewModel>(TYPES.PreLoginViewModel).to(PreLoginViewModel);
container.bind<LoginViewModel>(TYPES.LoginViewModel).to(LoginViewModel);

// Managers

// Strategies

export { container };
