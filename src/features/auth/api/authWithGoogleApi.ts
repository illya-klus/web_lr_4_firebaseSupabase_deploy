import { loginWithGoogleFirebase } from "../../../firebase/firebaseAuthApi";
import { AuthReturn } from "./authApi"; // або звідки у тебе тип

export const loginUserWithGoogle = async (): Promise<AuthReturn> => {
  try {
    const responce = await loginWithGoogleFirebase();

    return {
      seccesfull: true,
      body: {
        user: responce.user,
      },
    };
  } catch (error: any) {
    let message = "Fail in trying to login with Google";

    if (error.code === "auth/popup-closed-by-user") {
      message = "Ви закрили вікно входу через Google";
    } else if (error.code === "auth/popup-blocked") {
      message = "Браузер заблокував popup для Google входу";
    } else if (error.code === "auth/network-request-failed") {
      message = "Проблема з мережею. Спробуйте ще раз.";
    }

    return {
      seccesfull: false,
      body: {
        error: {
          code: error.code,
          message,
        },
      },
    };
  }
};
