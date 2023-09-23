// Librerias
import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StarIcon,
  TrashIcon,
  SwatchIcon,
  ArrowLeftIcon,
  RectangleStackIcon,
  FolderArrowDownIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

// Contextos

// Hooks

// Screens

// Componentes
import NoteStatus from "./NoteStatus";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";
import { NotesDetailsViewModel } from "@/ui/screens/NotesDetails/viewModel";
import { CreateNotesViewModel } from "@/ui/screens/CreateNotes/viewModel";

// Tipado
type Props = {
  mode: string;
  children: JSX.Element;
  color?: string;
  deleteNotes?: () => void;
  showLastTimeEdited?: boolean;
  setModalIsVisible?: () => void;
  setfavoritesNote?: () => void;
  viewModel: NotesDetailsViewModel | CreateNotesViewModel;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente funciona como header personalizado y extiende funcionamientos del header global
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <NoteHeader />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const NoteHeader = ({
  mode,
  color,
  children,
  viewModel,
  deleteNotes,
  setfavoritesNote,
  setModalIsVisible,
  showLastTimeEdited,
}: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();

  // Funciones
  const handleBackPress = () => {
    navigation.goBack()
    // navigation.navigate({
    //   name: "Notes",
    //   merge: true,
    // });
  };

  // UseEffects

  // Renders
  return (
    <>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <View
          style={[
            styles.header,
            { backgroundColor: color ? color : viewModel.note?.color },
          ]}
        >
          <Pressable onPress={handleBackPress}>
            <ArrowLeftIcon size={24} color={Colors.oscuro} />
          </Pressable>

          <View style={{ flexDirection: "row" }}>
            <Pressable style={styles.actions} onPress={setModalIsVisible}>
              <SwatchIcon size={24} color={Colors.oscuro} />
            </Pressable>

            {mode === "edit" && (
              <Pressable style={styles.actions} onPress={() => null}>
                <FolderArrowDownIcon size={24} color={Colors.oscuro} />
              </Pressable>
            )}

            <Pressable style={styles.actions} onPress={() => null}>
              <RectangleStackIcon size={24} color={Colors.oscuro} />
            </Pressable>

            <Pressable style={styles.actions} onPress={setfavoritesNote}>
              <StarIcon
                size={24}
                color={Colors.oscuro}
                fill={
                  viewModel.note?.pin ? Colors.variants.three : "transparent"
                }
              />
            </Pressable>

            {mode === "edit" && (
              <Pressable style={styles.actions} onPress={deleteNotes}>
                <TrashIcon size={24} color={Colors.oscuro} />
              </Pressable>
            )}
          </View>
        </View>

        {children}

        <NoteStatus
          showLastTimeEdited
          color={color ? color : viewModel.note?.color}
          isSyncing={viewModel.isSyncing}
          syncError={viewModel.syncError}
          lastSynced={viewModel.lastSynced}
          lastUpdate={viewModel.note?.updatedAt}
        />
      </View>

      <StatusBar
        translucent
        style="dark"
        backgroundColor={color ? color : viewModel.note?.color}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: Spacings.space,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 50,
  },

  actions: {
    marginLeft: Spacings.space,
  },
});

export default NoteHeader;
