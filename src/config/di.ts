import { Container } from 'inversify';
import { TYPES } from './types';

// Stores
import { RootStore } from '@/ui/store/RootStore';
import { AuthStore } from '@/ui/store/AuthStore';
// Repositories
import { SessionRepository } from '@/domain/repositories/SessionRepository';
import { NoteRepository } from '@/domain/repositories/NoteRepository';
import { NoteRepositoryImpl } from '@/data/repositories/NoteRepositoryImpl';
import { SessionRepositoryImpl } from '@/data/repositories/SessionRepositoryImpl';

// Services
import { AuthService } from '@/data/services/AuthService';

// UseCases
import { SignInWithEmailUseCase } from '@/domain/useCases/signInWithEmailAndPassword';
import { CheckActiveSessionUseCase } from '@/domain/useCases/checkActiveSession';
import { DeleteNoteUseCase } from '@/domain/useCases/deleteNote';

// ViewModels
import { PreLoginViewModel } from '@/ui/screens/PreLogin/viewModel';
import { LoginViewModel } from '@/ui/screens/Login/viewModel';
import { NotesViewModel } from '@/ui/screens/Notes/viewModel';
import { NotesService } from '@/data/services/NotesService';
import { GetAllNotesUseCase } from '@/domain/useCases/getAllNotes';
import { UpdateNoteContentUseCase } from '@/domain/useCases/updateNoteContent';

// Managers

// Strategies

const container = new Container();

// Stores
container.bind<RootStore>(TYPES.RootStore).to(RootStore).inSingletonScope();
container.bind<AuthStore>(TYPES.AuthStore).to(AuthStore).inSingletonScope();

// Repositories
container.bind<SessionRepository>(TYPES.SessionRepository).to(SessionRepositoryImpl);
container.bind<NoteRepository>(TYPES.NoteRepository).to(NoteRepositoryImpl);

// Services
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<NotesService>(TYPES.NotesService).to(NotesService);

// UseCases
container.bind<SignInWithEmailUseCase>(TYPES.SignInWithEmailUseCase).to(SignInWithEmailUseCase);
container
  .bind<CheckActiveSessionUseCase>(TYPES.CheckActiveSessionUseCase)
  .to(CheckActiveSessionUseCase);
container.bind<DeleteNoteUseCase>(TYPES.DeleteNoteUseCase).to(DeleteNoteUseCase);
container.bind<GetAllNotesUseCase>(TYPES.GetAllNotesUseCase).to(GetAllNotesUseCase);
container.bind<UpdateNoteContentUseCase>(TYPES.UpdateNoteContentUseCase).to(UpdateNoteContentUseCase);


// ViewModels
container.bind<PreLoginViewModel>(TYPES.PreLoginViewModel).to(PreLoginViewModel);
container.bind<LoginViewModel>(TYPES.LoginViewModel).to(LoginViewModel);
container.bind<NotesViewModel>(TYPES.NotesViewModel).to(NotesViewModel);

// Managers

// Strategies

export { container };
