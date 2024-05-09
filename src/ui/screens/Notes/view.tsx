import React, { useContext, useMemo } from 'react';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react-lite';

import RootStoreContext from '@/ui/context/RootStoreContext';

import { NotesViewModel } from './viewModel';

import Header from './components/Header';
import Loader from '@/ui/components/Loader';

import Colors from '@/ui/styles/Colors';

import { container } from '@/config/di';
import { TYPES } from '@/config/types';

type Props = {
  route: any;
  navigation: any;
};

const Notes: React.FC<Props> = observer(({ route, navigation }) => {
  const viewModel = useMemo(() => container.get<NotesViewModel>(TYPES.NotesViewModel), []);

  const user = useContext(RootStoreContext);

  const handleSetFavorite = (uuid: string, pin: boolean) => {
    viewModel.setfavoritesNote(uuid, { pin });
  };

  const handleDeleteNote = (uuid: string) => {
    viewModel.deleteNotes(uuid);
  };

  if (viewModel.notes.status === 'loading') return <Loader />;
  if (viewModel.notes.status === 'error') return <Text>Error</Text>;

  return (
    <Header user={user}>
      {/* <NotesList
        viewModel={viewModel.notes}
        deleteNote={handleDeleteNote}
        refresh={() => viewModel.refresh()}
        setfavoritesNote={handleSetFavorite}
      /> */}

      <StatusBar translucent style='dark' backgroundColor={Colors.claro} />
    </Header>
  );
});

export default Notes;
