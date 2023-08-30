
# App de Notas con Sincronización en Tiempo Real

### Expo con React Native, Clean Architecture, MVVM, SOLID, Firebase y TypeScript

![App Logo](/path/to/logo.png)

**Descripción:** Una aplicación en la que los usuarios pueden crear, editar y eliminar notas. Estas notas se sincronizarán en tiempo real entre dispositivos a través de un backend común.

**Características Principales:**

- **Registro e Inicio de Sesión:** Implementado con Firebase Authentication o cualquier otro servicio de autenticación a elección.
- **Creación y Edición de Notas:** Interfaz intuitiva para capturar tus ideas al instante.
- **Sincronización en Tiempo Real:** Implementación con Firebase Firestore para una sincronización fluida entre dispositivos.
- **Búsqueda de Notas:** Filtrado de notas por palabras clave.
- **Temas Oscuro y Claro:** Cambia según tus preferencias.


## Comenzando

### Instalación

```bash
npm install
```

**Nota:** Este proyecto está configurado con Expo, por lo que es compatible con Android e iOS usando la app de [Expo GO](https://expo.dev/client).

Antes de iniciar el proyecto, modifica `node_modules/expo/AppEntry.js` como sigue:

```javascript
// Cambia
import App from "../../src/App";
// Por
import App from "../../App";
```

Luego, ejecuta el siguiente comando para iniciar Expo. En el `package.json` se incluye un `-c` para limpiar la caché de npm en cada inicio:

```bash
npm run start
```

---

### Configuración de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/?hl=es) y crea un nuevo proyecto:
   ![Nuevo proyecto firebase](/screenshots/1.firebase.png)

2. Asigna un nombre a tu proyecto:
   ![Nombre del proyecto firebase](/screenshots/2.firebase.png)

3. Una vez configurado, deberías ver una pantalla similar a esta. Si no es así, navega a `configuración/configuración del proyecto/general`:
   ![Configuración del proyecto firebase](/screenshots/3.firebase.png)

4. Copia esos datos y busca en el proyecto el archivo `.env.example`. Este archivo muestra cómo estructurar tus variables de entorno. Crea un archivo `.env` y pega allí los datos de tu proyecto Firebase:

```env
  FIREBASE_APIKEY=
  FIREBASE_AUTHDOMAIN=
  FIREBASE_PROJECTID=
  FIREBASE_STORAGEBUCKET=
  FIREBASE_MESSAGINGSENDERID=
  FIREBASE_APPID=
  FIREBASE_MEASUREMENTID=
```

---

## Recursos Adicionales

- [Cómo implementar Clean Architecture en React Native (Artículo)]()
- [Presentación del Proyecto (Wiki)]()
- [Flujo y explicación usando MVVM, Clean Architecture, SOLID y POO con TypeScript]()

---

## Descarga la App

- [Android]() 👽
- [IOS]() 🍎

---

## Diseño

- [Diseño Original]()

---

## Licencia

Este proyecto está bajo una licencia open source. Consulta el archivo `LICENSE` para más detalles.

---

## Derechos de Autor

© 2023 [Kevin Parra Lopez](https://kevinparralopez.com). Todos los derechos reservados.
