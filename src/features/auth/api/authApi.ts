// import { saveUserToFirestore } from "../../../firebase/db/users";
import {
  loginUserFirebase,
  registerUserFirebase,
} from "../../../firebase/firebaseAuthApi";

export type AuthReturn = SuccessReturn | ErrorReturn;

export type ErrorReturn = {
  seccesfull: false;
  body: {
    error: {
      code: string | number;
      message: string;
    };
  };
};

export type SuccessReturn = {
  seccesfull: true;
  body: {
    user: any; // або firebase.User якщо юзати Firebase SDK типи
  };
};

export const registerUser = async (
  email: string,
  password: string,
): Promise<AuthReturn> => {
  try {
    const credentials = await registerUserFirebase(email, password);
    return {
      seccesfull: true,
      body: { user: credentials.user },
    };
  } catch (error: any) {
    let message = "Fail in trying to register";

    if (error.code === "auth/api-key-not-valid") {
      message = "Не вірний API ключ Firebase. Перевір конфігурацію.";
    } else if (error.code === "auth/email-already-in-use") {
      message = "Ця пошта вже використовується.";
    }

    return {
      seccesfull: false,
      body: {
        error: { code: error.code, message },
      },
    };
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<AuthReturn> => {
  try {
    const credentials = await loginUserFirebase(email, password);
    return {
      seccesfull: true,
      body: { user: credentials.user },
    };
  } catch (error: any) {
    let message = "Fail in trying to register";
    console.log(error.message);
    if (error.code === "auth/invalid-credential") {
      message = "Не вірна пошта або пароль";
    } else if (error.code === "auth/email-already-in-use") {
      message = "Ця пошта вже використовується.";
    }

    return {
      seccesfull: false,
      body: {
        error: { code: error.code, message },
      },
    };
  }
};

//1234567;
