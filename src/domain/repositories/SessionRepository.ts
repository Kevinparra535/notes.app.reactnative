/**
 * Siguiendo el principio de inversión de dependencias, el repositorio se define en la capa de dominio, pero su implementación se hará en la capa de datos. Este enfoque permite que la lógica de negocio (capa de dominio) sea completamente agnóstica de la lógica de acceso a datos.
 *
 * El repositorio SessionRepository debe definir todos los métodos necesarios para interactuar con las notas desde el punto de vista del almacenamiento.
 */

import Session from "../entities/Session";

export interface SessionRepository {
  getUser(data: Record<string, string>): Promise<Session>;
  updateUser(data: Record<string, string>): Promise<any>;
  createUser(data: Record<string, string>): Promise<any>;
  deleteUser(): Promise<any>;
}
