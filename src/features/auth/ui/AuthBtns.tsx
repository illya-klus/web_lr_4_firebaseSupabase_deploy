
import { useErrorModal } from "../../../modals/error/hooks/useErrorModal";
import { useSeccessModal } from "../../../modals/seccess/hooks/useSeccessModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";
import { loginUserWithGoogle } from "../api/authWithGoogleApi";
import googleIcon from "/public/icons/google-black-icon.png";

export const AuthBtns = () => {
  const navigate = useNavigate();

  const { setUserDataFromResponce } = useAuth();

  const { showError, ErrorModalComponent } = useErrorModal();
  const { showSeccess, SeccessModalComponent } = useSeccessModal();

  const handleGoogleLogin = async () => {
    const result = await loginUserWithGoogle();

    if (result.seccesfull) {
      console.log(result.body.user);

      setUserDataFromResponce(result);

      navigate("/");

      showSeccess("Ви успішно увійшли через Google");
    } else {
      console.log(result.body.error);

      showError(result.body.error.message);
    }
  };

  return (
    <>
      <SeccessModalComponent />
      <ErrorModalComponent />

      <div className="mt-4">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-slate-700"
        >
          <img
            src={googleIcon}
            alt="google"
            className="w-5 h-5"
          />

          Продовжити через Google
        </button>
      </div>
    </>
  );
};