// Librerias
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";

// Contextos

// Hooks

// Screens

// Componentes
import { CategoriesViewModel } from "@/ui/screens/Categories/viewModel";
import { TranslateHelper } from "@/ui/i18n";

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Fonts from "@/ui/styles/Fonts";
import Spacings from "@/ui/styles/Spacings";
import { observer } from "mobx-react-lite";

// Tipado
type Props = {
  uuid: string;
  title: string;
  color: string;
  viewModel: CategoriesViewModel;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente renderiza las cards de las categorias
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <CategoriesCards />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const CategoriesCards: React.FC<Props> = observer(
  ({ uuid, title, color, viewModel }) => {
    // Estados
    const [newTitle, setNewTitle] = useState<string | null>(title);

    // Contextos

    // Hooks

    // Funciones
    const handleEdit = (id: string) => {
      viewModel.setCategoryId(id);
      viewModel.setShowCatInput(false);
    };

    const handleClose = () => {
      viewModel.setCategoryId(null);
      setNewTitle(title);
    };

    const handleDelete = () => {
      Alert.alert(
        TranslateHelper("alerts.categories.delete.title"),
        TranslateHelper("alerts.categories.delete.message"),
        [
          {
            style: "cancel",
            text: TranslateHelper("alerts.notes.delete.cancel"),
          },
          {
            onPress: () => viewModel.delete(uuid),
            text: TranslateHelper("alerts.categories.delete.delete"),
          },
        ]
      );
    };

    const handleSubmit = () => {
      const data = {
        title: newTitle ?? title,
        color: color,
      };

      viewModel.update(data);
      viewModel.setCategoryId(null);
      // setNewTitle(title);
    };

    const handleChange = (e: any) => {
      setNewTitle(e);
    };

    // UseEffects

    // Renders
    return (
      <View
        style={[
          styles.container,
          { borderWidth: viewModel.categoryIdToEdit === uuid ? 1 : 0 },
        ]}
      >
        {viewModel.categoryIdToEdit === uuid ? (
          <>
            <View style={styles.titleContainer}>
              <Pressable onPress={handleDelete} style={styles.action}>
                <TrashIcon size={24} color={Colors.alerts.error} />
              </Pressable>

              <View style={[styles.color, { backgroundColor: color }]}></View>

              <TextInput
                autoFocus
                value={newTitle!}
                style={styles.input}
                onChangeText={handleChange}
              />
            </View>

            <View style={styles.actionsContainer}>
              <Pressable onPress={handleClose} style={styles.action}>
                <XMarkIcon size={24} color={Colors.alerts.error} />
              </Pressable>

              <Pressable onPress={handleSubmit}>
                <CheckIcon size={24} color={Colors.alerts.check} />
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View style={styles.titleContainer}>
              <View style={[styles.color, { backgroundColor: color }]}></View>
              <Text style={styles.title}>{title}</Text>
            </View>

            <View style={styles.actionsContainer}>
              <Pressable onPress={() => handleEdit(uuid)} style={styles.action}>
                <PencilSquareIcon size={24} color={Colors.oscuro} />
              </Pressable>
            </View>
          </>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    padding: Spacings.space,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    height: 50,
    shadowColor: Colors.oscuro,
    borderRadius: Spacings.spacehalf,
  },

  titleContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },

  color: {
    marginRight: Spacings.spacex2,
    width: 24,
    height: 24,
    borderRadius: Spacings.spacehalf,
    backgroundColor: "black",
  },

  title: {
    flex: 1,
    ...Fonts.bodyText,
  },

  input: {
    flex: 1,
    ...Fonts.bodyText,
    lineHeight: 20,
  },

  actionsContainer: {
    flexDirection: "row",
  },

  action: {
    marginRight: Spacings.space,
  },
});

export default CategoriesCards;
