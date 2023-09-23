// Librerias
import Colors from "@/ui/styles/Colors";
import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";

// Contextos

// Hooks

// Screens

// ViewModel
import { FavoritesViewModel } from "./viewModel";

// Componentes
import Header from "../../components/Header";
import Loader from "@/ui/components/Loader";
import FavoritesList from "./components/FavoritesList";

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
 * Esta pantalla mostrara en lista las notas seleccionadas como favoritas
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <Favorites />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Favorites: React.FC<Props> = observer(({ route, navigation }) => {
  // Estados
  const [viewModel] = useState(() => new FavoritesViewModel());

  // Contextos

  // Hooks

  // Funciones

  // UseEffects
  useEffect(() => {
    viewModel.refresh()
  }, [])
  

  // Renders

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favorites" />
      {viewModel.notes.status === "loading" && <Loader />}

      {viewModel.notes.status === "success" && (
        <FavoritesList
          viewModel={viewModel.notes}
          refresh={() => viewModel.refresh()}
        />
      )}

      {viewModel.notes.status === "error" && <Text>Error</Text>}

      <StatusBar translucent style="dark" backgroundColor={Colors.claro} />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.claro,
  },
});

export default Favorites;
