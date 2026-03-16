
import { useErrorModal } from "../../../modals/error/hooks/useErrorModal";
import { useSeccessModal } from "../../../modals/seccess/hooks/useSeccessModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuthContext";
import { loginUserWithGoogle } from "../api/authWithGoogleApi";

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

      navigate(import.meta.env.VITE_BASE_URL+"/");

      showSeccess("Successfully logged in with Google");
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
          className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 active:scale-95 transition"
        >
          <img
            src="/icons/google.svg"
            alt="google"
            className="w-5 h-5"
          />

          Sign up with Google
        </button>
      </div>
    </>
  );
};