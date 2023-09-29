// Librerias
import React from "react";
import { View, StyleSheet, Modal, Pressable } from "react-native";
import { observer } from "mobx-react-lite";
import { XCircleIcon } from "react-native-heroicons/outline";

// Contextos

// Hooks

// Screens

// Componentes
import { Translate } from "@/ui/i18n";
import ColorsPicker from "@/ui/components/ColorPicker";
import { CategoriesViewModel } from "../screens/Categories/viewModel";

// Navigations

// Imagenes

// Estilos
import Fonts from "@/ui/styles/Fonts";
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  viewModel: CategoriesViewModel;
};

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se comporta como un modal, aparecera en la parte inferior de la lista en base a la opcion que se haya presionado
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <ModalColorPicker />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const ModalColorPicker: React.FC<Props> = observer(({ viewModel }: Props) => {
  // Estados

  // Contextos

  // Hooks

  // Funciones
  const onRequestClose = () => {
    viewModel.setModalVisible(false);
  };

  // UseEffects

  // Renders
  return (
    <Modal
      transparent={true}
      visible={viewModel.modalIsVisible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Translate langkey="colorPicker.title" style={styles.title} />
          <Pressable onPress={onRequestClose}>
            <XCircleIcon color={Colors.oscuro} size={22} />
          </Pressable>
        </View>
        <ColorsPicker viewModel={viewModel} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    bottom: 0,
    height: "22%",
    width: "100%",
    borderTopRightRadius: Spacings.spacex2,
    borderTopLeftRadius: Spacings.spacex2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.claro,
  },
  titleContainer: {
    paddingVertical: Spacings.space,
    paddingHorizontal: Spacings.spacex2,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderTopRightRadius: Spacings.space,
    borderTopLeftRadius: Spacings.space,
    backgroundColor: Colors.claro,
  },
  title: {
    ...Fonts.bodyText,
    color: Colors.oscuro,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});

export default ModalColorPicker;
