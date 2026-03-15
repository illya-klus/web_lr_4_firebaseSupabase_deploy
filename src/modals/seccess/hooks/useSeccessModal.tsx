import { useCallback, useState } from "react";
import SeccessModal from "../ui/SeccessModal";


export const useSeccessModal = () => {
    const [seccessMessage, setSeccessMessage] = useState<string | null>(null);
    
      // Функція для показу помилки
    const showSeccess = useCallback((message: string) => {
      setSeccessMessage(message);
    }, []);

    // Функція для закриття модалки
    const hideSeccess = useCallback(() => {
      setSeccessMessage(null);
    }, []);

    const SeccessModalComponent = () =>
    seccessMessage ? (
      <SeccessModal message={seccessMessage} onClose={hideSeccess} />
    ) : null;

    return { showSeccess, SeccessModalComponent };
}