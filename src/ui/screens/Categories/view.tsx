// Librerias
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// ViewModel
import { CategoriesViewModel } from "./viewModel";

// Componentes
import Loader from "@/ui/components/Loader";
import Header from "@/ui/components/Header";
import CategoriesList from "./components/CategoriesList";
import ModalColorPicker from "@/ui/components/ModalColorPicker";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import CreateCategories from "@/ui/components/Categories/CreateCategories";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Esta pantalla muestra una lista de categorias, desde aqui se pueden ir a otras pantallas para crearlas, verlas a detalles y eliminar
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <Categories />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Categories: React.FC = observer(() => {
  // Estados
  const [viewModel] = useState(() => new CategoriesViewModel());

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Categories" viewModel={viewModel} />
      <CreateCategories viewModel={viewModel} />

      {viewModel.categories.status === "loading" && <Loader />}

      {viewModel.categories.status === "success" && (
        <>
          <CategoriesList
            viewModel={viewModel}
            refresh={() => viewModel.refresh()}
          />

          <ModalColorPicker viewModel={viewModel} />
        </>
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

export default Categories;
