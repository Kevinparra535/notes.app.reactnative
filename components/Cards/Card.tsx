import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

import Spacings from "@/constants/Spacings";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { Icons } from "../Icons";

type Props = {
  item: string;
};

const Card = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Label</Text>

      <View style={styles.subContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item}</Text>
          <Text style={styles.subTitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nisi
            illum saepe fuga autem dolorem voluptatum...
          </Text>
        </View>
        <View style={styles.icons}>
          <Icons
            style={styles.icon}
            name="heart-outline"
            onPress={() => console.log("Pressed")}
          />
          <Icons
            style={styles.icon}
            name="trash-outline"
            onPress={() => console.log("Pressed")}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.date}>
          <Icons name="time-outline" />

          <Text style={styles.dateText}>Date</Text>
        </View>

        <View style={styles.curve}></View>

        <View style={styles.cta}>
          <Icons
            style={styles.ctaIcon}
            name="trash-outline"
            onPress={() => console.log("Pressed")}
          />
        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    marginBottom: Spacings.space,
    borderRadius: Spacings.spacex3,
    backgroundColor: "red",
  },

  label: {
    padding: Spacings.space,
    borderRadius: Spacings.spacex2,
    marginBottom: Spacings.space,
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: Colors.light.light,
  },

  subContainer: {
    paddingHorizontal: Spacings.space,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "purple",
    height: 160,
  },

  textContainer: {
    paddingVertical: Spacings.space,
    flex: 1,
    height: 160,
    backgroundColor: "green",
  },

  title: {
    marginBottom: Spacings.space,
    ...Fonts.header2,
  },

  subTitle: {
    ...Fonts.bodyText,
  },

  icons: {
    paddingVertical: Spacings.space,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "blue",
    width: 70,
    height: 160,
    borderWidth: 5,
    borderBottomColor: 'black',
    borderBottomRightRadius: Spacings.spacex2,
  },

  icon: {
    padding: Spacings.space,
    marginBottom: Spacings.space,
    borderRadius: Spacings.spacex2,
    overflow: "hidden",
    backgroundColor: Colors.light.light,
  },

  footer: {
    paddingHorizontal: Spacings.space,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    backgroundColor: "violet",
  },

  cta: {
    position: "absolute",
    right: 15,
    top: -15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: "auto",
    width: 65,
    height: 65,
    borderWidth: 5,
    borderColor: "black",
    borderRadius: Spacings.spacex4,
    overflow: "hidden",
    backgroundColor: "red",
  },

  ctaIcon: {},

  date: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    borderWidth: 5,
    borderBottomRightRadius: Spacings.spacex3,
  },

  dateText: {
    marginLeft: Spacings.space,
    ...Fonts.bodyText,
  },

  curve: {
    padding: Spacings.space,
    width: 70,
    height: "100%",
    borderWidth: 5,
    borderRadius: 2,
    overflow: "hidden",
    backgroundColor: "white",
  }
});

export default Card;
