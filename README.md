# Notes App

¡Claro! Siguiendo la estructura que hemos definido, y teniendo en cuenta los principios SOLID, aquí está una descripción de la funcionalidad de cada carpeta, subcarpeta y qué deberían contener:

### **src**

#### **config**

- **Objetivo:** Contiene configuraciones de diferentes servicios o herramientas.
- **Archivos como `firebaseConfig.ts`:** Deberían contener configuraciones específicas para servicios, como Firebase en este caso.

#### **data**

- **Objetivo:** Gestionar todo lo relacionado con los datos (obtención, transformación, almacenamiento).

##### **models**

- **Objetivo:** Definir estructuras de datos o DTOs (Data Transfer Objects).
- **Archivos como `userModel.ts`:** Deberían contener la definición de cómo se estructura un modelo de datos (por ejemplo, cómo llega un usuario desde una API).

##### **network**

- **Objetivo:** Gestión de llamadas a la red o a APIs.
- **Archivos como `api.ts`:** Deberían contener las funciones que hacen llamadas directas a una API.

##### **repositories**

- **Objetivo:** Implementaciones concretas de los repositorios definidos en `domain/repositories`.
- **Archivos como `userDataRepository.ts`:** Deberían interactuar con fuentes de datos, ya sea una API, base de datos local, etc. Implementan interfaces definidas en el dominio.

#### **domain**

- **Objetivo:** Representa la lógica y reglas de negocio puras.

##### **entities**

- **Objetivo:** Modelar y encapsular la lógica de negocio.
- **Archivos como `User.ts`:** Deberían contener la lógica de negocio relacionada con una entidad, en este caso, un usuario.

##### **usecases**

- **Objetivo:** Representar operaciones o acciones específicas del negocio.
- **Archivos como `loginUser.ts`:** Deberían contener la lógica para un caso de uso específico, en este caso, iniciar sesión.

##### **services**

- **Objetivo:** Servicios de dominio que encapsulan lógica específica.
- **Archivos como `authService.ts`:** Deberían contener lógica de negocio relacionada con autenticación.

##### **repositories**

- **Objetivo:** Interfaces que definen las operaciones que pueden realizar los repositorios.
- **Archivos como `userRepositoryInterface.ts`:** Deberían contener la definición de métodos que luego las implementaciones concretas en `data/repositories` deben cumplir.

#### **ui**

- **Objetivo:** Todo lo relacionado con la interfaz de usuario y su lógica.

##### **assets**

- **Objetivo:** Almacena recursos estáticos.
- **Subcarpetas como `/images` o `/fonts`:** Contienen imágenes y fuentes respectivamente.

##### **components**

- **Objetivo:** Componentes reutilizables de React Native.
- **Archivos como `Button.tsx`:** Deberían ser componentes sin estado y reutilizables.

##### **context**

- **Objetivo:** Proveer contextos de React para gestionar estados globales.
- **Archivos como `userContext.ts`:** Deberían establecer y proporcionar el contexto para datos del usuario.

##### **hooks**

- **Objetivo:** Funciones reutilizables que encapsulan la lógica relacionada con el estado o efectos secundarios.
- **Archivos como `useUser.ts`:** Deberían contener lógica y estado relacionados con el usuario, utilizando React Hooks.

##### **navigation**

- **Objetivo:** Definir y gestionar la navegación entre pantallas.
- **Archivos como `MainNavigator.tsx`:** Deberían establecer la estructura de navegación de la aplicación.

##### **screens**

- **Objetivo:** Representar pantallas completas dentro de la aplicación.
- **Archivos como `HomeScreen.tsx`:** Deberían contener la estructura y lógica específica de esa pantalla.

##### **services**

- **Objetivo:** Servicios relacionados con la capa de UI.
- **Archivos como `uiAuthService.ts`:** Pueden contener lógica específica para interactuar con servicios de autenticación desde la perspectiva de la UI.

##### **store**

- **Objetivo:** Gestionar el estado global de la aplicación, puede ser usando Redux, MobX, etc.
- **Archivos como `userStore.ts`:** Deberían contener la lógica y estructura para almacenar y manipular el estado del usuario.

##### **styles**

- **Objetivo:** Definir estilos y temas.
- **Archivos como `globalStyles.ts` o `themes.ts`:** Deberían contener estilos globales y definiciones de temas.

##### **utils**

- **Objetivo:** Funciones y herramientas utilitarias específicas de la capa de UI.
- **Archivos como `formatFunctions.ts`:** Podrían contener funciones para formatear datos específicamente para la UI.

### **tests**

- **Objetivo:** Contener todas las pruebas unitarias y de integración.
- **Subcarpetas como `/data`, `/domain` y `/ui`:** Deberían tener pruebas específicas para cada una de esas capas.

Para cumplir con SOLID:

- **Single Responsibility Principle (SRP)**: Cada archivo se enfoca en una única responsabilidad. Por ejemplo, `loginUser.ts` en `usecases` solamente se encarga de la lógica de iniciar sesión, mientras que `userModel.ts` en `models` solo define la estructura de un usuario.

- **Open/Closed Principle (OCP):** La estructura está diseñada de manera que puedas extender ciertas funcionalidades sin tener que modificarlas. Por ejemplo, puedes añadir nuevos métodos a `authService.ts` o agregar nuevos repositorios sin tener que cambiar la lógica existente.

- **Liskov Substitution Principle (LSP):** Las implementaciones concretas de las interfaces (por ejemplo, en `data/repositories`) deberían poder ser intercambiadas con sus interfaces sin afectar el comportamiento del programa. Así, cualquier clase que implemente `userRepositoryInterface.ts` debe hacerlo de manera que cualquier parte del código que use esa interfaz siga funcionando correctamente.

- **Interface Segregation Principle (ISP):** Las interfaces están separadas por su uso y no obligan a las implementaciones a depender de métodos que no utilizan. Esto es evidente en cómo se han segmentado las responsabilidades entre las diferentes interfaces en la carpeta `repositories`.

- **Dependency Inversion Principle (DIP):** Las capas de alto nivel, como el dominio, no dependen de las capas de bajo nivel, como datos. En lugar de eso, ambas dependen de abstracciones. Las interfaces en `domain/repositories` sirven como estas abstracciones, permitiendo que la lógica de negocio en el dominio no tenga que preocuparse sobre cómo exactamente se obtienen o almacenan los datos, mientras que las implementaciones concretas en `data/repositories` proveen ese detalle.

Al seguir esta estructura y los principios SOLID, garantizas un código más limpio, mantenible y escalable. Es más fácil agregar, modificar o quitar características sin tener que reescribir grandes porciones del código o sin introducir errores inadvertidos. Es especialmente útil en proyectos grandes o cuando trabajas en equipos, ya que reduce la complejidad y mejora la claridad del código.

## Estructura de directorios:

```
/app
|-- /src
|   |-- /config
|   |   |-- firebaseConfig.ts
|   |   |-- otherConfig.ts
|   |
|   |-- /data
|   |   |-- /models
|   |   |   |-- userModel.ts
|   |   |   |-- ...
|   |   |-- /network
|   |   |   |-- api.ts
|   |   |   |-- ...
|   |   |-- /repositories
|   |       |-- userDataRepository.ts
|   |       |-- ...
|   |
|   |-- /domain
|   |   |-- /entities
|   |   |   |-- User.ts
|   |   |   |-- ...
|   |   |-- /usecases
|   |   |   |-- loginUser.ts
|   |   |   |-- ...
|   |   |-- /services
|   |   |   |-- authService.ts
|   |   |   |-- ...
|   |   |-- /repositories
|   |       |-- userRepositoryInterface.ts
|   |       |-- ...
|   |
|   |-- /ui
|   |   |-- /assets
|   |   |   |-- /images
|   |   |   |   |-- logo.png
|   |   |   |   |-- ...
|   |   |   |-- /fonts
|   |   |       |-- customFont.ttf
|   |   |-- /components
|   |   |   |-- Button.tsx
|   |   |   |-- ...
|   |   |-- /context
|   |   |   |-- userContext.ts
|   |   |   |-- ...
|   |   |-- /hooks
|   |   |   |-- useUser.ts
|   |   |   |-- ...
|   |   |-- /navigation
|   |   |   |-- MainNavigator.tsx
|   |   |   |-- ...
|   |   |-- /screens
|   |   |   |-- HomeScreen.tsx
|   |   |   |-- ...
|   |   |-- /services
|   |   |   |-- uiAuthService.ts
|   |   |   |-- ...
|   |   |-- /store
|   |   |   |-- userStore.ts
|   |   |   |-- ...
|   |   |-- /styles
|   |   |   |-- globalStyles.ts
|   |   |   |-- themes.ts
|   |   |-- /utils
|   |       |-- formatFunctions.ts
|   |       |-- ...
|
|-- /tests
|   |-- /data
|   |   |-- userModel.test.ts
|   |   |-- ...
|   |-- /domain
|   |   |-- loginUser.test.ts
|   |   |-- ...
|   |-- /ui
|       |-- Button.test.tsx
|       |-- ...
|
|-- App.tsx
|-- package.json

```
