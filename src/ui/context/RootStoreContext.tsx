// Librerias
import { createContext } from "react";
import rootStore, { RootStore } from "../store/RootStore";

// Otros

type Props = {
  children: any;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este contexto unifica los stores de MOBx y los deja disponible a nivel global, util para el maneja de rutas
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <RootStoreContext />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const RootStoreContext = createContext<RootStore | null>(null);

export function RootStoreProvider({ children }: Props) {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
}
export default RootStoreContext;
