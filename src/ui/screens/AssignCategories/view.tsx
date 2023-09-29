// Librerias
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// ViewModel
import { AssignCategoriesViewModel } from "./viewModel";

// Componentes
import Loader from "@/ui/components/Loader";
import Header from "@/ui/components/Header";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import AssignCategoriesList from "./components/CategoriesList";

// Tipado
type Props = {
  route: any;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta pantalla se encarga de mostrar una lista seleccionable de categorias para asignar en la nota
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <AssignCategories />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const AssignCategories: React.FC<Props> = observer(({ route: { params } }) => {
  // Estados
  const [viewModel] = useState(
    () => new AssignCategoriesViewModel(params.noteId, params.tags)
  );

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Choose Categories" viewModel={viewModel} />

      {viewModel.categories.status === "loading" && <Loader />}

      {viewModel.categories.status === "success" && (
        <AssignCategoriesList viewModel={viewModel} />
      )}

      {viewModel.categories.status === "error" && <Text>Error</Text>}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.claro,
  },
});

export default AssignCategories;
