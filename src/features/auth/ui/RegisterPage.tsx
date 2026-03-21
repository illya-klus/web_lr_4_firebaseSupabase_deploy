import { ChangeEvent, FormEvent, useState } from "react";
import useValidation from "../hooks/useValidation";
import { registerUser } from "../api/authApi";
import { useErrorModal } from "../../../modals/error/hooks/useErrorModal";
import { useSeccessModal } from "../../../modals/seccess/hooks/useSeccessModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";
import { AuthBtns } from "./AuthBtns";

const RegisterPage = () => {
  const { setUserDataFromResponce } = useAuth();
  const navigate = useNavigate();
  const { showError, ErrorModalComponent } = useErrorModal();
  const { showSeccess, SeccessModalComponent } = useSeccessModal();

  const [emailInput, setEmailInput] = useState("");
  const [firstPasswordInput, setFirstPasswordInput] = useState("");
  const [secondPasswordInput, setSecondPasswordInput] = useState("");

  const { mistakes, validateEmail, validatePassword, validatePasswordsIdentity } = useValidation();

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
  };

  const handleFirstPassInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstPasswordInput(e.target.value);
    validatePassword(e.target.value);
    validatePasswordsIdentity(e.target.value, secondPasswordInput);
  };

  const handleSecondPassInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondPasswordInput(e.target.value);
    validatePasswordsIdentity(firstPasswordInput, e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateEmail(emailInput);
    validatePassword(firstPasswordInput);
    validatePassword(secondPasswordInput);

    if (!hasErrors) {
      const result = await registerUser(emailInput, firstPasswordInput);
      if (result.seccesfull) {
        setUserDataFromResponce(result);
        navigate(import.meta.env.VITE_BASE_URL + "/");
        showSeccess("Акаунт створено успішно. Ласкаво просимо!");
      } else {
        showError(result.body.error.message);
      }
    }
  };

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
          <h2 className="text-3xl font-semibold mt-3 text-slate-900">Створити акаунт</h2>
          <p className="text-slate-500 mt-2">Приєднуйтесь до покупців SportUA.</p>
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
                mistakes.emailError ? "border-red-500" : "border-slate-300 focus:border-slate-900"
              }`}
            />
            {mistakes.emailError && (
              <span className="text-red-500 text-sm mt-1 block">{mistakes.emailError}</span>
            )}
          </div>

          <div>
            <input
              value={firstPasswordInput}
              onChange={handleFirstPassInputChange}
              type="password"
              placeholder="Пароль"
              className={`w-full px-0 py-3 border-b focus:outline-none transition ${
                mistakes.passwordError ? "border-red-500" : "border-slate-300 focus:border-slate-900"
              }`}
            />
            {mistakes.passwordError && (
              <span className="text-red-500 text-sm mt-1 block">{mistakes.passwordError}</span>
            )}
          </div>

          <div>
            <input
              value={secondPasswordInput}
              onChange={handleSecondPassInputChange}
              type="password"
              placeholder="Повторіть пароль"
              className={`w-full px-0 py-3 border-b focus:outline-none transition ${
                mistakes.passwordsIdentityError ? "border-red-500" : "border-slate-300 focus:border-slate-900"
              }`}
            />
            {mistakes.passwordsIdentityError && (
              <span className="text-red-500 text-sm mt-1 block">{mistakes.passwordsIdentityError}</span>
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
          Зареєструватися
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

export default RegisterPage;