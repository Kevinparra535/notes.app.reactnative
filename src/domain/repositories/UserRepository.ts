/**
 * Siguiendo el principio de inversión de dependencias, el repositorio se define en la capa de dominio, pero su implementación se hará en la capa de datos. Este enfoque permite que la lógica de negocio (capa de dominio) sea completamente agnóstica de la lógica de acceso a datos.
 *
 * El repositorio SessionRepository debe definir todos los métodos necesarios para interactuar con las notas desde el punto de vista del almacenamiento.
 */

import User from "../entities/User";

export interface UserRepository {
  getUser(data: Record<string, string>): Promise<User>;
  updateUser(data: Record<string, unknown>): Promise<User>;
  deleteUser(data: Record<string, string>): Promise<any>;
}
