// Librerias
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


// Contextos

// Hooks

// Screens

// Componentes
import ListNotesEmpty from "@/ui/components/Notes/ListNotesEmpty";
import CategoriesCards from "@/ui/components/Categories/CategoriesCards";
import { CategoriesViewModel } from "../viewModel";



// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado

type Props = {
  refresh: () => void;
  viewModel: CategoriesViewModel;
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
 * <CategoriesList />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const CategoriesList: React.FC<Props> = observer(({ viewModel, refresh }) => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <FlatList
      onRefresh={refresh}
      style={styles.container}
      data={viewModel.categories.data}
      keyExtractor={(item) => item.uuid}
      ListEmptyComponent={ListNotesEmpty}
      refreshing={viewModel.categories.status === "loading"}
      renderItem={({ item }) => (
        <CategoriesCards
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

export default CategoriesList;
