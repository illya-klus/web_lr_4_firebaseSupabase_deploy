import { useState } from "react";


interface Mistakes {
  emailError: string;
  passwordError: string;
  passwordsIdentityError: string;
}
type UseValidationReturn = {
  mistakes : Mistakes;
  validateEmail : (value: string) => void;
  validatePassword : (value: string) => void;
  validatePasswordsIdentity : (pas1: string, pas2: string) => void;
}


const useValidation = () : UseValidationReturn => {
    const [mistakes, setMistakes] = useState<Mistakes>({
        emailError: "",
        passwordError: "",
        passwordsIdentityError : "",
    });

    const symbols = /[;",^%$#(){}\[\]|\\\/]/;

    const validateEmail = (value: string) => {
      let message = "";
      if (!value.includes("@")) message = "Вкажіть коректний email (потрібен символ @)";
      else if (symbols.test(value)) message = "Email містить недопустимі символи";
      else if (value.length < 3) message = "Email занадто короткий";
      setMistakes((prev) => ({ ...prev, emailError: message }));
    };

    const validatePassword = (value: string) => {
      let message = "";
      if (!symbols.test(value))
        message = "Пароль має містити хоча б один спеціальний символ";
      else if (value.length < 8)
        message = "Пароль має містити мінімум 8 символів";
      setMistakes((prev) => ({ ...prev, passwordError: message }));
    };


    const validatePasswordsIdentity = (pas1: string, pas2: string) => {
      if (pas1 !== pas2) 
        setMistakes({...mistakes, passwordsIdentityError: "Паролі не збігаються"});
      else setMistakes({...mistakes, passwordsIdentityError: ""});
    }

    return {mistakes, validateEmail, validatePassword, validatePasswordsIdentity};
}


export default useValidation;


