import { useCallback, useState } from "react";
import ErrorModal from "../ui/ErrorModal";





export const useErrorModal = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
      // Функція для показу помилки
    const showError = useCallback((message: string) => {
      setErrorMessage(message);
    }, []);

    // Функція для закриття модалки
    const hideError = useCallback(() => {
      setErrorMessage(null);
    }, []);

    const ErrorModalComponent = () =>
    errorMessage ? (
      <ErrorModal message={errorMessage} onClose={hideError} />
    ) : null;

    return { showError, ErrorModalComponent };
}