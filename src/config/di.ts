import { Container } from 'inversify';
import { TYPES } from './types';

// Stores

// Repositories

// Services

// UseCases

// ViewModels
import { PreLoginViewModel } from '@/ui/screens/PreLogin/viewModel';

// Managers

// Strategies

const container = new Container();

// Stores

// Repositories

// Services

// UseCases

// ViewModels
container.bind<PreLoginViewModel>(TYPES.PreLoginViewModel).to(PreLoginViewModel);

// Managers

// Strategies

export { container };
