import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

import { LoginViewModel } from './viewModel';
import LoginForm from './components/LoginForm';
import LoginHeader from './components/LoginHeader';
// import LoginFooter from './components/LoginFooter';

import Colors from '@/ui/styles/Colors';
import Spacings from '@/ui/styles/Spacings';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';

type Props = {
  navigation: any;
};

/**
 * Login screen component.
 *
 * @component
 */
const Login: React.FC<Props> = ({ navigation }: Props): JSX.Element => {
  const viewModel = useMemo(() => container.get<LoginViewModel>(TYPES.LoginViewModel), []);

  /**
   * Handles the submission of the email form.
   *
   * @param data - The form data containing the email and password.
   */
  const handleEmailSubmit = (data: Record<string, string>) => {
    viewModel.signInWithEmailAndPassword(data);
  };

  useEffect(() => {
    console.log(viewModel.isUserResponse);
  }, [viewModel.isUserResponse]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LoginHeader />

      <LoginForm
        isError={viewModel.isUserError}
        isLoading={viewModel.isUserLoading}
        handleEmailSubmit={handleEmailSubmit}
      />

      {/* <LoginFooter
          handleGoogle={handleGoogle}
          isLoading={viewModel.isLoading}
        /> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacings.spacex2,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.claro,
  },
});

export default observer(Login);
