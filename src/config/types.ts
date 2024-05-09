export const TYPES = {
  // Stores
  RootStore: Symbol.for('RootStore'),
  AuthStore: Symbol.for('AuthStore'),

  // Repositories
  SessionRepository: Symbol.for('SessionRepository'),
  NoteRepository: Symbol.for('NoteRepository'),

  // Services
  AuthService: Symbol.for('AuthService'),
  NotesService: Symbol.for('NotesService'),

  // UseCases
  SignInWithEmailUseCase: Symbol.for('SignInWithEmailUseCase'),
  CheckActiveSessionUseCase: Symbol.for('CheckActiveSessionUseCase'),
  DeleteNoteUseCase: Symbol.for('DeleteNoteUseCase'),
  GetAllNotesUseCase: Symbol.for('GetAllNotesUseCase'),
  UpdateNoteContentUseCase: Symbol.for('UpdateNoteContentUseCase'),

  // ViewModels
  PreLoginViewModel: Symbol.for('PreLoginViewModel'),
  LoginViewModel: Symbol.for('LoginViewModel'),
  NotesViewModel: Symbol.for('NotesViewModel'),

  // Managers

  // Strategies
};
