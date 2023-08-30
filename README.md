Certainly! Here's the English version of the improved README:

---

## Real-Time Note App
### Expo with React Native, Clean Architecture, MVVM, SOLID, Firebase, and TypeScript

![App Logo](/path/to/logo.png)

**Description:** An app where users can create, edit, and delete notes. These notes will synchronize in real-time across devices using a shared backend.

**Key Features:**

- **User Registration and Login:** Implemented using Firebase Authentication or any other authentication service of your choice.
- **Note Creation and Editing:** An intuitive interface to capture your ideas instantly.
- **Real-Time Synchronization:** Implemented with Firebase Firestore for seamless synchronization across devices.
- **Note Search:** Filter notes by keywords.
- **Dark and Light Themes:** Switch according to your preferences.


---

### Spanish Version
[Spanish documentation](/REAME.spa.md)

---

## Getting Started

### Installation
```bash
npm install
```

**Note:** This project is set up with Expo, making it compatible with both Android and iOS using the [Expo GO](https://expo.dev/client) app.

Before launching the project, modify `node_modules/expo/AppEntry.js` as follows:
```javascript
// Change
import App from '../../src/App';
// To
import App from '../../App';
```

Then, run the following command to start Expo. The `-c` flag in `package.json` ensures npm's cache is cleared with every startup:
```bash
npm run start
```

---

### Setting Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/?hl=en) and create a new project: 
   ![New Firebase project](/screenshots/1.firebase.png)

2. Assign a name to your project: 
   ![Project name](/screenshots/2.firebase.png)

3. Once set up, you should see a screen like this. If not, navigate to `settings/project settings/general`: 
   ![Project settings](/screenshots/3.firebase.png)

4. Copy these details and locate the `.env.example` file in the project. This file indicates how to structure your environment variables. Create a `.env` file and paste your Firebase project details there:
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

## Additional Resources

- [Implementing Clean Architecture in React Native (Article)]()
- [Project Presentation (Wiki)]()
- [Workflow and explanation using MVVM, Clean Architecture, SOLID, and OOP with TypeScript]()

---

## Download the App

- [Android]() 👽
- [IOS]() 🍎

---

## Design

- [Original Design]()

---

## License

This project is under an open-source license. See the `LICENSE` file for more details.

---

## Copyright

© 2023 [Kevin Parra Lopez](https://kevinparralopez.com). All rights reserved.
