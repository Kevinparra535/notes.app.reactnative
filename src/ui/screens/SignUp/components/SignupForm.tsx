// Librerias
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
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
import { Translate, TranslateHelper } from "@/ui/i18n";

// Tipado
type Props = {
  isError: string | null;
  isLoading: boolean;
  handleEmailSubmit: (data: Record<string, string>) => void;
};

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

const SignupForm = ({
  isError,
  isLoading,
  handleEmailSubmit,
}: Props): JSX.Element => {
  // Estados
  const [isChecked, setChecked] = useState(false);

  // Contextos

  // Hooks
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      repeatPassword: "",
    },
  });

  // Funciones

  const password = watch("password", "");

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
              value={value}
              onBlur={onBlur}
              inputMode="text"
              placeholder={TranslateHelper("input.username")}
              autoComplete="name"
              onChangeText={onChange}
              placeholderTextColor={
                errors.displayName || isError ? Colors.alerts.error : Colors.oscuro
              }
              style={[
                styles.inputs,
                {
                  borderColor:
                    errors.displayName || isError
                      ? Colors.alerts.error
                      : Colors.oscuro,
                },
              ]}
            />
          )}
          name="displayName"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="email"
              placeholder={TranslateHelper("input.email")}
              autoComplete="email"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholderTextColor={
                errors.email || isError ? Colors.alerts.error : Colors.oscuro
              }
              style={[
                styles.inputs,
                {
                  borderColor:
                    errors.email || isError
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
              placeholder={TranslateHelper("input.password")}
              autoComplete="password"
              textContentType="password"
              placeholderTextColor={
                errors.password || isError ? Colors.alerts.error : Colors.oscuro
              }
              style={[
                styles.inputs,
                {
                  borderColor:
                    errors.password || isError
                      ? Colors.alerts.error
                      : Colors.oscuro,
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
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
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
              placeholder={TranslateHelper("input.confirmpassword")}
              keyboardType="visible-password"
              placeholderTextColor={
                errors.repeatPassword || isError
                  ? Colors.alerts.error
                  : Colors.oscuro
              }
              style={[
                styles.inputs,
                {
                  borderColor:
                    errors.repeatPassword || isError
                      ? Colors.alerts.error
                      : Colors.oscuro,
                },
              ]}
            />
          )}
          name="repeatPassword"
        />

        {isError && <Text style={styles.errorMessage}>{isError}</Text>}

        {errors.repeatPassword && (
          <Text style={styles.errorMessage}>
            {errors.repeatPassword.message}
          </Text>
        )}

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
          onPress={handleSubmit(handleEmailSubmit)}
          style={[
            styles.buttons,
            { backgroundColor: Colors.oscuro, opacity: isChecked ? 1 : 0.5 },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.claro} size="small" />
          ) : (
            <Translate
              langkey="signup.button"
              style={[styles.buttonsLabel, { color: Colors.claro }]}
            />
          )}
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
    marginTop: Spacings.space,
    ...Fonts.callToActions,
    borderWidth: 1,
    borderRadius: Spacings.spacehalf,
  },

  errorMessage: {
    marginTop: 2,
    textAlign: "right",
    ...Fonts.header4,
    fontSize: 13,
    color: Colors.alerts.error,
  },

  terms: {
    paddingTop: Spacings.space,
    paddingBottom: Spacings.spacex2,
    alignItems: "center",
    flexDirection: "row",
  },

  termsLabel: {
    paddingLeft: Spacings.space,
    ...Fonts.bodyText,
    fontSize: 15,
    lineHeight: 20
  },

  buttons: {
    paddingVertical: Spacings.space,
    paddingHorizontal: Spacings.spacex2,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    borderRadius: Spacings.spacehalf,
    borderWidth: 1,
  },

  buttonsLabel: {
    ...Fonts.callToActions,
    fontSize: 14,
  },
});

export default SignupForm;
