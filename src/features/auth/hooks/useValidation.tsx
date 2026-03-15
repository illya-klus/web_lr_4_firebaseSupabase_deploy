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
      if (!value.includes("@")) message = "Missing @";
      else if (symbols.test(value)) message = "Incorrect symbols used";
      else if (value.length < 3) message = "Value must be at least 3 letters";
      setMistakes((prev) => ({ ...prev, emailError: message }));
    };

    const validatePassword = (value: string) => {
      let message = "";
      if (!symbols.test(value))
        message = "Password must contain at least one special symbol";
      else if (value.length < 8)
        message = "Password must be more than 8 letters";
      setMistakes((prev) => ({ ...prev, passwordError: message }));
    };


    const validatePasswordsIdentity = (pas1: string, pas2: string) => {
      if (pas1 !== pas2) 
        setMistakes({...mistakes, passwordsIdentityError: "Different passwords"});
      else setMistakes({...mistakes, passwordsIdentityError: ""});
    }

    return {mistakes, validateEmail, validatePassword, validatePasswordsIdentity};
}


export default useValidation;


