// Librerias
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Pressable, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Translate, TranslateHelper } from "@/ui/i18n";
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
 * <LoginForm />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const LoginForm = (): JSX.Element => {
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
      email: "",
      password: "",
    },
  });

  // Funciones
  const onSubmit = (data: any) => console.log(data);

  // UseEffects

  // Renders
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inputsContainers}>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="email"
              placeholder={TranslateHelper('input.email')}
              autoComplete="email"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholderTextColor={
                errors.email ? Colors.alerts.error : Colors.oscuro
              }
              style={[
                styles.inputs,
                {
                  borderColor: errors.email
                    ? Colors.alerts.error
                    : Colors.oscuro,
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
              placeholder={TranslateHelper('input.password')}
              autoComplete="password"
              textContentType="password"
              placeholderTextColor={
                errors.password ? Colors.alerts.error : Colors.oscuro
              }
              style={[
                styles.inputs,
                {
                  borderColor: errors.password
                    ? Colors.alerts.error
                    : Colors.oscuro,
                },
              ]}
            />
          )}
          name="password"
        />

        <Pressable
          disabled={!isChecked}
          onPress={handleSubmit(onSubmit)}
          style={[
            styles.buttons,
            { backgroundColor: Colors.oscuro, opacity: isChecked ? 1 : 0.5 },
          ]}
        >
          <Translate
            langkey="login.button"
            style={[styles.buttonsLabel, { color: Colors.claro }]}
          />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
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

export default LoginForm;
