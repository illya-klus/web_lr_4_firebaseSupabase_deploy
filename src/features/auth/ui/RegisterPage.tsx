import { ChangeEvent, FormEvent, useState } from "react";
import useValidation from "../hooks/useValidation";
import { registerUser } from "../api/authApi";
import { useErrorModal } from "../../../modals/error/hooks/useErrorModal";
import { useSeccessModal } from "../../../modals/seccess/hooks/useSeccessModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";
import { AuthBtns } from "./AuthBtns";



const RegisterPage = () => {
  const {setUserDataFromResponce} = useAuth();
  
  const navigate = useNavigate();
  let {showError, ErrorModalComponent} = useErrorModal();
  let {showSeccess, SeccessModalComponent} = useSeccessModal();
  
  let [emailInput, setEmailInput] = useState<string>("");
  let [firstPasswordInput, setFirstPasswordInput] = useState<string>("");
  let [secondPasswordInput, setSecondPasswordInput] = useState<string>("");

  const {mistakes, validateEmail, validatePassword, validatePasswordsIdentity} = useValidation();

  const hasErrors = 
    !emailInput ||
    !firstPasswordInput ||
    !secondPasswordInput ||
    mistakes.emailError !== "" ||
    mistakes.passwordError !== "" ||
    mistakes.passwordsIdentityError !== "";

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    validateEmail(e.target.value);
  }
  const handleFirstPassInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstPasswordInput(e.target.value);
    validatePassword(e.target.value);
  }
  const handleSecondPassInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondPasswordInput(e.target.value);
    validatePasswordsIdentity(firstPasswordInput, e.target.value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(emailInput);
    validatePassword(firstPasswordInput);
    validatePassword(secondPasswordInput);

    if (!hasErrors) {
      let result = await registerUser(emailInput, firstPasswordInput);
      if(result.seccesfull){
        console.log(result.body.user);
        setUserDataFromResponce(result);
        navigate(import.meta.env.VITE_BASE_URL+'/');
        showSeccess("Welcome to Sport Shop");
        
      }else{
        console.log(result.body.error); 
        showError(result.body.error.message);
      }
    }
  }



  return (
    <div className="min-h-screen bg-gray-100 pt-45 px-4 sm:flex sm:items-center sm:justify-center sm:p-0">
      <SeccessModalComponent/>
      <ErrorModalComponent/>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 p-6 sm:p-8 bg-white rounded-xl shadow-md w-full max-w-sm">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Register
        </h2>

        <div className="flex flex-col">
          <input
            value={emailInput}
            onChange={handleEmailChange}
            type="text"
            placeholder="Email"
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${ mistakes.emailError ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#00d1b2]"}`}
          />
          {mistakes.emailError && ( <span className="text-red-500 text-sm mt-1">{mistakes.emailError}</span> )}
        </div>

        <div className="flex flex-col">
          <input
            value={firstPasswordInput}
            onChange={handleFirstPassInputChange}
            type="password"
            placeholder="Password"
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${ mistakes.passwordError ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#00d1b2]"}`}
          />
          {mistakes.passwordError && (<span className="text-red-500 text-sm mt-1">{mistakes.passwordError}</span>)}
        </div>

        <div className="flex flex-col">
          <input
            value={secondPasswordInput}
            onChange={handleSecondPassInputChange}
            type="password"
            placeholder="Password"
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${ mistakes.passwordsIdentityError ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#00d1b2]"}`}
          />
          {mistakes.passwordsIdentityError && (<span className="text-red-500 text-sm mt-1">{mistakes.passwordsIdentityError}</span>)} 
        </div>

        
        <button
          type="submit"
          disabled={hasErrors}
          className={`mt-6 px-4 py-2 text-white font-semibold rounded-lg transition ${
            hasErrors ? "bg-gray-400 cursor-not-allowed" : "bg-[#00d1b2] hover:bg-[#00b8a0] active:scale-95" }
          `}
        >
          Register
        </button>

                    <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <AuthBtns />

      </form>



    </div>
  );
};

export default RegisterPage;