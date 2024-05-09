export interface UseCase<T, R> {
  run(data: T): Promise<R>;
}