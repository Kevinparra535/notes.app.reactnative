import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { config } from "./config";

GoogleSignin.configure({
  webClientId: config.FIREBASE_GOOGLE_WEB_CLIENT,
});

export { GoogleSignin, statusCodes };
