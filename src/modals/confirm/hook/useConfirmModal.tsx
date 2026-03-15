import { useCallback, useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";






export const useConfirmModal = (callback: () => any ) => {
    const [message, setMessage] = useState<string | null>(null);
    
    
    const showModal = useCallback((message: string) => {
      setMessage(message);
    }, []);

    const hideModal = useCallback(() => {
      setMessage(null);
    }, []);

    const ConfirmModalComponent = () =>
    message ? (
      <ConfirmModal message={message} onCancel={hideModal} onSubmit={callback} />
    ) : null;

    return { showModal, ConfirmModalComponent };
}