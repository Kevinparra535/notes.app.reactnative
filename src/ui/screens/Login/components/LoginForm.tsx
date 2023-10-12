// Librerias
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
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
 * <LoginForm />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const LoginForm = ({
  handleEmailSubmit,
  isLoading,
  isError,
}: Props): JSX.Element => {
  // Estados

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
  const onSubmit = (data: Record<string, string>) => handleEmailSubmit(data);

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

        {isError && <Text style={styles.errorMessage}>{isError}</Text>}

        {(errors.password || errors.email) && (
          <Text style={styles.errorMessage}>All fields are required!.</Text>
        )}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={[styles.buttons, { backgroundColor: Colors.oscuro }]}
        >
          {isLoading === true ? (
            <ActivityIndicator size="small" color={Colors.claro} />
          ) : (
            <Translate
              langkey="login.button"
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
    textAlign: 'right',
    ...Fonts.header4,
    fontSize: 13,
    color: Colors.alerts.error,
  },

  buttons: {
    paddingVertical: Spacings.space,
    paddingHorizontal: Spacings.spacex2,
    marginTop: Spacings.space,
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

export default LoginForm;
