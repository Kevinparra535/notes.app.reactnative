// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { XCircleIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

// Contextos

// Hooks

// Screens

// Componentes
import ColorsPicker from "@/ui/components/Notes/ColorPicker";

// Navigations

// Imagenes

// Estilos
import Fonts from "@/ui/styles/Fonts";
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";

// Tipado
type Props = {
  visible: boolean;
  onRequestClose: () => void;
  onColorChange: (id: string, value: string) => void;
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

const ModalColorPicker = ({
  visible,
  onColorChange,
  onRequestClose,
}: Props): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <Modal transparent={true} visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onRequestClose}>
            <XCircleIcon color={Colors.oscuro} size={22} />
          </Pressable>
        </View>
        <ColorsPicker onColorChange={onColorChange} actualColor="#ffffff" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    position: "absolute",
    bottom: 0,
    height: "30%",
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
    paddingHorizontal: Spacings.spacex2,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    height: "16%",
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
