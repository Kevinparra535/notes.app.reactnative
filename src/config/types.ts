export const TYPES = {
  // Stores
  RootStore: Symbol.for("RootStore"),
  AuthStore: Symbol.for("AuthStore"),

  // Repositories
  SessionRepository: Symbol.for("SessionRepository"),

  // Services
  AuthService: Symbol.for("AuthService"),

  // UseCases
  SignInWithEmailUseCase: Symbol.for("SignInWithEmailUseCase"),
  CheckActiveSessionUseCase: Symbol.for("CheckActiveSessionUseCase"),

  // ViewModels

  // Managers

  // Strategies
};
