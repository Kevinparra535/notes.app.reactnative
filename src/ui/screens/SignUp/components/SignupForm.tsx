// Librerias
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";

// Contextos

// Hooks

// Screens

// Componentes

// Navigations

// Imagenes

// Estilos
import Colors from "@/ui/styles/Colors";
import Spacings from "@/ui/styles/Spacings";
import Fonts from "@/ui/styles/Fonts";
import Checkbox from "expo-checkbox";
import { Translate } from "@/ui/i18n";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente renderiza el formulario de registro
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <SignupForm />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const SignupForm = (): JSX.Element => {
  // Estados
  const [isChecked, setChecked] = useState(false);

  // Contextos

  // Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  // Funciones
  const onSubmit = (data: any) => console.log(data);

  // UseEffects

  // Renders
  return (
    <View style={styles.inputsContainers}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            inputMode="text"
            placeholder="Name"
            autoComplete="name"
            onChangeText={onChange}
            placeholderTextColor={
              errors.name ? Colors.alerts.error : Colors.oscuro
            }
            style={[
              styles.inputs,
              {
                borderColor: errors.name ? Colors.alerts.error : Colors.oscuro,
              },
            ]}
          />
        )}
        name="name"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            inputMode="email"
            placeholder="Email"
            autoComplete="email"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholderTextColor={
              errors.name ? Colors.alerts.error : Colors.oscuro
            }
            style={[
              styles.inputs,
              {
                borderColor: errors.name ? Colors.alerts.error : Colors.oscuro,
              },
            ]}
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry
            inputMode="text"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Password"
            autoComplete="password"
            textContentType="password"
            placeholderTextColor={
              errors.name ? Colors.alerts.error : Colors.oscuro
            }
            style={[
              styles.inputs,
              {
                borderColor: errors.name ? Colors.alerts.error : Colors.oscuro,
              },
            ]}
          />
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry
            inputMode="text"
            contextMenuHidden
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            textContentType="password"
            placeholder="Confirm Password"
            keyboardType="visible-password"
            placeholderTextColor={
              errors.name ? Colors.alerts.error : Colors.oscuro
            }
            style={[
              styles.inputs,
              {
                borderColor: errors.name ? Colors.alerts.error : Colors.oscuro,
              },
            ]}
          />
        )}
        name="repeatPassword"
      />

      <View style={styles.terms}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={Colors.oscuro}
        />
        <Translate langkey="signup.terms" style={styles.termsLabel} />
      </View>

      <Pressable
        disabled={!isChecked}
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.buttons,
          { backgroundColor: Colors.oscuro, opacity: isChecked ? 1 : 0.5 },
        ]}
      >
        <Translate
          langkey="signup.button"
          style={[styles.buttonsLabel, { color: Colors.claro }]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainers: {
    flexDirection: "column",
    width: "100%",
  },

  inputs: {
    padding: Spacings.space,
    marginBottom: Spacings.space,
    ...Fonts.callToActions,
    borderWidth: 1,
    borderRadius: Spacings.spacehalf,
  },

  terms: {
    paddingTop: Spacings.spacehalf,
    paddingBottom: Spacings.spacex2,
    alignItems: "center",
    flexDirection: "row",
  },

  termsLabel: {
    paddingLeft: Spacings.space,
    ...Fonts.bodyText,
    fontSize: 15,
  },

  buttons: {
    paddingVertical: Spacings.space,
    paddingHorizontal: Spacings.spacex2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Spacings.spacehalf,
    borderWidth: 1,
  },

  buttonsLabel: {
    ...Fonts.callToActions,
    fontSize: 14,
  },
});

export default SignupForm;
