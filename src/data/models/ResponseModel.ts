type Status = 'loading' | 'success' | 'error';

export interface ResponseModel<T> {
  status: Status;
  data?: T;
  error?: string;
}
