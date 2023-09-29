// Librerias
import React from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, FlatList } from "react-native";


// Contextos

// Hooks

// Screens

// Componentes
import { AssignCategoriesViewModel } from "../viewModel";
import ListNotesEmpty from "@/ui/components/Notes/ListNotesEmpty";
import AssignCategoriesCards from "@/ui/components/Categories/AssignCategoriesCards";



// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado

type Props = {
  viewModel: AssignCategoriesViewModel;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de renderizar las categorias creadas por el usuario
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <AssignCategoriesList />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const AssignCategoriesList: React.FC<Props> = observer(({ viewModel }) => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <FlatList
      onRefresh={() => viewModel.refresh()}
      style={styles.container}
      data={viewModel.categories.data}
      keyExtractor={(item) => item.uuid}
      ListEmptyComponent={ListNotesEmpty}
      refreshing={viewModel.categories.status === "loading"}
      renderItem={({ item }) => (
        <AssignCategoriesCards
          uuid={item.uuid}
          title={item.title}
          color={item.color}
          viewModel={viewModel}
        />
      )}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.space,
    flex: 1,
    backgroundColor: Colors.claro,
  },
});

export default AssignCategoriesList;
