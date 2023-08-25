// Librerias
import React, { useEffect, useState } from "react";
import { Text } from "react-native";

// Contextos

// Hooks

// ViewModels
import { NotesViewModel } from "./viewModel";

// Screens

// Componentes
import Loader from "@/ui/components/Loader";
import NotesList from "./components/NotesList";
import { observer } from "mobx-react-lite";

// Navigations

// Imagenes

// Estilos

// Tipado
type Props = {
  route: any;
  navigation: any;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta pantalla renderiza todas las notas
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <NotesScreen />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Notes: React.FC<Props> = observer(({ route, navigation }) => {
  const [viewModel] = useState(() => new NotesViewModel());
  const isNeedUpdate: boolean = route.params.isNeedUpdate;

  useEffect(() => {
    if (isNeedUpdate) {
      viewModel.refresh();
      console.log(isNeedUpdate); // Tenemos un bug aqui
    }
  }, [isNeedUpdate]);

  // Renders
  if (viewModel.notes.status === "loading") return <Loader />;
  if (viewModel.notes.status === "error") return <Text>Error</Text>;

  return (
    <NotesList
      viewModel={viewModel.notes}
      refresh={() => viewModel.refresh()}
    />
  );
});

export default Notes;
