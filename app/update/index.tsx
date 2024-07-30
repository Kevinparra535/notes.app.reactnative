import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  View,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Icons } from "@/components/Icons";

import { useColorScheme } from "@/hooks/useColorScheme.web";

import Spacings from "@/constants/Spacings";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";

import type { IColorProps } from "@/expo-env";

const colorScheme = useColorScheme();

const UpdateNoteScreen = (): JSX.Element => {
  const [watchingTitle] = useState(new Animated.Value(Fonts.header1.fontSize));
  const [title, setTitle] = useState("Note Title");
  const [height, setHeight] = useState(200);
  const navigation = useNavigation();

  const handleTitleChange = (text: string) => {
    Animated.spring(watchingTitle, {
      toValue:
        text.length >= 100 ? Fonts.header2.fontSize : Fonts.header1.fontSize,
      useNativeDriver: false,
    }).start();
    setTitle(text);
  };

  const handleSizeChange = (e: any) => {
    setHeight(e.nativeEvent.contentSize.height);
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={100}
        viewIsInsideTabBar
        extraScrollHeight={100}
        style={styles.scrollContainer}
      >
        <View>
          <TextInput
            editable
            multiline
            inputMode="text"
            placeholder="Titulo"
            scrollEnabled={false}
            keyboardType="default"
            textBreakStrategy="simple"
            lineBreakStrategyIOS="standard"
            maxLength={150}
            onChangeText={handleTitleChange}
            style={[styles.inputTitle]}
          >
            <Animated.Text style={[styles.title, { fontSize: watchingTitle }]}>
              {title}
            </Animated.Text>
          </TextInput>
        </View>

        <View style={styles.categoryContainer}>
          <Icons name="add-circle" size={30} />
          <Text style={styles.categoryTitle}>Add Category</Text>
        </View>

        <TextInput
          editable
          multiline
          inputMode="text"
          placeholder="Escribe algo..."
          scrollEnabled={false}
          keyboardType="default"
          textBreakStrategy="simple"
          lineBreakStrategyIOS="standard"
          onContentSizeChange={handleSizeChange}
          style={[styles.inputContent, { height: Math.max(35, height) }]}
        >
          <Text style={styles.body}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat,
            delectus nobis sapiente omnis qui magnam. Suscipit nobis accusamus,
            dolore commodi cumque neque tempore ratione, adipisci explicabo,
            labore nulla ut quam?
          </Text>
        </TextInput>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.spacex2,
    flex: 1,
    flexGrow: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: (Colors as IColorProps)?.[colorScheme || "light"].bg.ligth,
  },

  scrollContainer: {
    flex: 1,
    flexGrow: 1,
  },

  inputTitle: {
    paddingTop: Spacings.space,
    minHeight: 50,
    ...Fonts.header1,
    overflow: "hidden",
    textAlignVertical: "bottom",
  },

  categoryContainer: {
    paddingVertical: Spacings.space,
    marginVertical: Spacings.space,
    alignItems: "center",
    flexDirection: "row",
  },

  categoryTitle: {
    marginLeft: Spacings.space,
    minHeight: 50,
    ...Fonts.header3,
    textAlignVertical: "center",
  },

  title: {
    ...Fonts.header1,
  },

  inputContent: {
    width: "100%",
    minHeight: 35,
    textAlignVertical: "top", // Asegura que el texto comience desde la parte superior
    ...Fonts.bodyText,
  },

  body: {
    ...Fonts.bodyText,
  },
});

export default UpdateNoteScreen;
