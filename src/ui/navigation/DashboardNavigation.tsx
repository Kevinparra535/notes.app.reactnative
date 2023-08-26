// Librerias
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon,
  StarIcon,
  PlusIcon,
  UserCircleIcon,
  FolderIcon,
  RectangleStackIcon,
} from "react-native-heroicons/outline";

// Contextos

// Hooks

// Screens
import CustomTab from "../components/CustomTab";

// Componentes

// Navigations
import NotesNavigation from "./NotesNavigation";

// Imagenes

// Estilos
import Colors from "../styles/Colors";

// Tipado

/**
 * Descripción del componente.
 *
 * @remarks
 * Este componente se encarga de crear la navegacion por tabs cuando el usuario esta autenticado
 *
 * @example
 * Ejemplo de uso:
 * ```jsx
 * <DashboardNavigation />
 * ```
 *
 * @returns `JSX.Element`
 *
 * @beta
 */

const Tab = createBottomTabNavigator();

const DashboardNavigation = (): JSX.Element => {
  // Estados

  // Contextos

  // Hooks

  // Funciones

  // UseEffects

  // Renders
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: Colors.oscuro,
        tabBarActiveBackgroundColor: Colors.brand.secondary,
      }}
      tabBar={(props) => <CustomTab {...props} />}
    >
      <Tab.Screen
        name="NotesNavigation"
        component={NotesNavigation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <HomeIcon size={size} color={color} strokeWidth={1.8} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="FavoritesNavigation"
        component={FavoritesNavigation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <StarIcon color={color} strokeWidth={1.8} size={size} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="FavoritesNavigation"
        component={FavoritesNavigation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <PlusIcon color={color} strokeWidth={1.8} size={size} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="FavoritesNavigation"
        component={FavoritesNavigation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <FolderIcon color={color} strokeWidth={1.8} size={size} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="FavoritesNavigation"
        component={FavoritesNavigation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => (
            <RectangleStackIcon color={color} strokeWidth={1.8} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default DashboardNavigation;
