import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "721935570225-t2nd7tmhphkcehguh2drnlh7efhjgkp3.apps.googleusercontent.com",
});

export { GoogleSignin, statusCodes };
