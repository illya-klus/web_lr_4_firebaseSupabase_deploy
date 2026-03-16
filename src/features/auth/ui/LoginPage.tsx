import { useState, ChangeEvent, FormEvent } from "react";
import useValidation from "../hooks/useValidation";
import { useAuth } from "../context/useAuthContext";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useErrorModal } from "../../../modals/error/hooks/useErrorModal";
import { useSeccessModal } from "../../../modals/seccess/hooks/useSeccessModal";
import { AuthBtns } from "./AuthBtns";




const LoginPage = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const {mistakes, validateEmail, validatePassword} = useValidation();
  const {setUserDataFromResponce} = useAuth();
  const navigate = useNavigate();
  let {showError, ErrorModalComponent} = useErrorModal();
  let {showSeccess, SeccessModalComponent} = useSeccessModal();


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    validateEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
    validatePassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(emailInput);
    validatePassword(passwordInput);

    if (!hasErrors) {
      let result = await loginUser(emailInput, passwordInput);
      if(result.seccesfull){
        console.log(result.body.user);
        setUserDataFromResponce(result);
        
        navigate(import.meta.env.VITE_BASE_URL+'/');
        showSeccess("Welcome back to Sport Shop");
      }else{
        console.log(result.body.error); 
        showError(result.body.error.message);
      }
    }
  }

  const hasErrors = 
    !emailInput ||
    !passwordInput||
    mistakes.emailError !== "" ||
    mistakes.passwordError !== "" ||
    mistakes.passwordsIdentityError !== "";

  return (
    <div className="min-h-screen bg-gray-100 pt-50 px-4 sm:flex sm:items-center sm:justify-center sm:p-0">
      <SeccessModalComponent/>
      <ErrorModalComponent/>
      
      <form
        onSubmit={handleSubmit}
        noValidate
        className=" flex flex-col gap-4 p-6 sm:p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm "
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <div className="flex flex-col">
          <input
            value={emailInput}
            onChange={handleEmailChange}
            type="text"
            placeholder="Email"
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${ mistakes.emailError ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#00d1b2]"}`}
            required
          />
          {mistakes.emailError && ( <span className="text-red-500 text-sm mt-1">{mistakes.emailError}</span> )}
        </div>

        <div className="flex flex-col">
          <input
            value={passwordInput} 
            onChange={handlePasswordChange}
            type="password" 
            placeholder="Password"
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${ mistakes.passwordError ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-[#00d1b2]"}`}
            required
          />
          {mistakes.passwordError && (<span className="text-red-500 text-sm mt-1">{mistakes.passwordError}</span>)}
        </div>

        <button
          type="submit"
          disabled={hasErrors}
          className={`mt-6 px-4 py-2 text-white font-semibold rounded-lg transition ${
            hasErrors ? "bg-gray-400 cursor-not-allowed" : "bg-[#00d1b2] hover:bg-[#00b8a0] active:scale-95" }
          `}
        >
          Login
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

export default LoginPage;