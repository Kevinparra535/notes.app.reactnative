// Librerias
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { XCircleIcon } from "react-native-heroicons/outline";
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

// Tipado
type Props = {
  children: JSX.Element;
  visible: boolean;
  onRequestClose: () => void;
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
  children,
  visible,
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
        {children}
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
    backgroundColor: Colors.claro,
  },
  titleContainer: {
    paddingHorizontal: Spacings.spacex2,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderTopRightRadius: Spacings.space,
    borderTopLeftRadius: Spacings.space,
    height: "16%",
    backgroundColor: Colors.bg.claro,
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
