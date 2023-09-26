// Librerias
import CategoriesCards from "@/ui/components/Categories/CategoriesCards";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { StyleSheet, FlatList } from "react-native";

// Contextos

// Hooks

// Screens

// Componentes
import ListNotesEmpty from "@/ui/components/Notes/ListNotesEmpty";
import { ResponseModel } from "@/data/models/ResponseModel";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado
import { CategoriesViewModel } from "../viewModel";

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
      data={viewModel.categories.data}
      style={styles.container}
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
