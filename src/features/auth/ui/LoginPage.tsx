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
        showSeccess("З поверненням! Вхід виконано успішно.");
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
    <div className="min-h-screen px-4 pt-32 sm:pt-40 flex justify-center">
      <SeccessModalComponent />
      <ErrorModalComponent />
      
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-md"
      >
        {/* HEADER */}
        <div className="text-center">
          <p className="text-sm text-slate-500">SportUA account</p>
          <h2 className="hero-title text-3xl font-semibold mt-3 text-slate-900">
            Вхід в акаунт
          </h2>
          <p className="text-slate-500 mt-2">
            Введіть свої дані для входу
          </p>
        </div>
      
        {/* FIELDS */}
        <div className="mt-10 flex flex-col gap-6">
      
          <div>
            <input
              value={emailInput}
              onChange={handleEmailChange}
              type="text"
              placeholder="Email"
              className={`w-full px-0 py-3 border-b focus:outline-none transition ${
                mistakes.emailError
                  ? "border-red-500"
                  : "border-slate-300 focus:border-slate-900"
              }`}
            />
            {mistakes.emailError && (
              <span className="text-red-500 text-sm mt-1 block">
                {mistakes.emailError}
              </span>
            )}
          </div>
          
          <div>
            <input
              value={passwordInput}
              onChange={handlePasswordChange}
              type="password"
              placeholder="Пароль"
              className={`w-full px-0 py-3 border-b focus:outline-none transition ${
                mistakes.passwordError
                  ? "border-red-500"
                  : "border-slate-300 focus:border-slate-900"
              }`}
            />
            {mistakes.passwordError && (
              <span className="text-red-500 text-sm mt-1 block">
                {mistakes.passwordError}
              </span>
            )}
          </div>
          
        </div>
          
        {/* BUTTON */}
        <button
          type="submit"
          disabled={hasErrors}
          className={`mt-10 w-full py-3 rounded-lg font-medium transition ${
            hasErrors
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          Увійти
        </button>
          
        {/* DIVIDER */}
        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-sm text-slate-400">або</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>
          
        {/* SOCIAL */}
        <AuthBtns />
      </form>
    </div>
  );
};

export default LoginPage;