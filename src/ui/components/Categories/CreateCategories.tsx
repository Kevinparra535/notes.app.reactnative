// Librerias
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { CheckIcon, PlusIcon, XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Fonts from "@/ui/styles/Fonts";
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";
import { CategoriesViewModel } from "@/ui/screens/Categories/viewModel";
import { observer } from "mobx-react-lite";

// Tipado
type Props = {
  viewModel: CategoriesViewModel;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este boton crea categorias
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <CreateCategories />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const CreateCategories: React.FC<Props> = observer(({ viewModel }) => {
  // Estados
  const [title, setTitle] = useState<string | null>(null);
  const [colorSelected, setColorSelected] = useState("#F4D5B6");

  // Contextos

  // Hooks

  // Funciones
  const handleButton = () => {
    viewModel.setShowCatInput(true);
    viewModel.setCategoryId(null);
  };

  const handleClose = () => {
    viewModel.setShowCatInput(false);
  };

  const handleChange = (e: string) => {
    setTitle(e);
  };

  const handleSubmit = () => {
    if (title) {
      viewModel.create({ title, color: colorSelected });
      viewModel.setShowCatInput(false);
      setTitle(null);
    } else {
      viewModel.setShowCatInput(false);
    }
  };

  // UseEffects

  // Renders
  return (
    <View
      style={[
        styles.container,
        { borderWidth: viewModel.showCreateCatInput ? 1 : 0 },
      ]}
    >
      {!viewModel.showCreateCatInput ? (
        <Pressable onPress={handleButton} style={styles.button}>
          <PlusIcon size={24} color={Colors.oscuro} />
          <Text style={styles.buttonLabel}>Create new category</Text>
        </Pressable>
      ) : (
        <View style={styles.inputContainer}>
          <Pressable
            style={[styles.color, { backgroundColor: colorSelected }]}
          ></Pressable>

          <TextInput
            autoFocus
            maxLength={20}
            style={styles.input}
            onChangeText={handleChange}
            placeholder="Category title"
          />

          <Pressable style={styles.action} onPress={handleClose}>
            <XMarkIcon size={24} color={Colors.alerts.error} />
          </Pressable>

          <Pressable onPress={handleSubmit} style={styles.action}>
            <CheckIcon size={24} color={Colors.alerts.check} />
          </Pressable>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: Spacings.spacehalf,
    height: 50,
  },

  button: {
    paddingVertical: Spacings.space,
    paddingHorizontal: Spacings.spacex2,
    alignItems: "center",
    flexDirection: "row",
  },

  buttonLabel: {
    marginLeft: Spacings.spacex2,
    ...Fonts.callToActions,
  },

  inputContainer: {
    paddingHorizontal: Spacings.spacex2,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  input: {
    paddingVertical: Spacings.space,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: Spacings.space,
    ...Fonts.bodyText,
    lineHeight: 20,
  },

  color: {
    marginRight: Spacings.space,
    width: 24,
    height: 24,
    borderRadius: Spacings.spacehalf,
    backgroundColor: "black",
  },

  action: {
    marginLeft: Spacings.space,
  },
});

export default CreateCategories;
