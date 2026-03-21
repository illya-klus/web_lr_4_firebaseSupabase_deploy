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
        showSeccess("Акаунт створено успішно. Ласкаво просимо!");
        
      }else{
        console.log(result.body.error); 
        showError(result.body.error.message);
      }
    }
  }



  return (
    <div className="min-h-screen px-4 pt-36 sm:pt-44 sm:flex sm:items-start sm:justify-center">
      <SeccessModalComponent/>
      <ErrorModalComponent/>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 p-6 sm:p-8 bg-white border border-slate-200 rounded-2xl shadow-lg w-full max-w-md">

        <div className="text-center mb-2">
          <p className="inline-flex px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-semibold">SportUA account</p>
          <h2 className="text-3xl font-black text-slate-900 mt-3">Створити акаунт</h2>
          <p className="text-slate-500 mt-1">Приєднуйтесь до покупців SportUA.</p>
        </div>

        <div className="flex flex-col">
          <input
            value={emailInput}
            onChange={handleEmailChange}
            type="text"
            placeholder="Email"
            className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${ mistakes.emailError ? "border-red-500 focus:ring-red-300" : "border-slate-300 focus:ring-cyan-200"}`}
          />
          {mistakes.emailError && ( <span className="text-red-500 text-sm mt-1">{mistakes.emailError}</span> )}
        </div>

        <div className="flex flex-col">
          <input
            value={firstPasswordInput}
            onChange={handleFirstPassInputChange}
            type="password"
            placeholder="Пароль"
            className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${ mistakes.passwordError ? "border-red-500 focus:ring-red-300" : "border-slate-300 focus:ring-cyan-200"}`}
          />
          {mistakes.passwordError && (<span className="text-red-500 text-sm mt-1">{mistakes.passwordError}</span>)}
        </div>

        <div className="flex flex-col">
          <input
            value={secondPasswordInput}
            onChange={handleSecondPassInputChange}
            type="password"
            placeholder="Повторіть пароль"
            className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${ mistakes.passwordsIdentityError ? "border-red-500 focus:ring-red-300" : "border-slate-300 focus:ring-cyan-200"}`}
          />
          {mistakes.passwordsIdentityError && (<span className="text-red-500 text-sm mt-1">{mistakes.passwordsIdentityError}</span>)} 
        </div>

        
        <button
          type="submit"
          disabled={hasErrors}
          className={`mt-6 px-4 py-3 text-slate-950 font-semibold rounded-xl transition ${
            hasErrors ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-cyan-400 hover:bg-cyan-300 shadow" }
          `}
        >
          Зареєструватися
        </button>

                    <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-sm text-slate-400">або</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>
            <AuthBtns />

      </form>



    </div>
  );
};

export default RegisterPage;