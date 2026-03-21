import { useEffect } from "react";

type Props = {
  message: string;
  onClose: () => void;
};

export default function SuccessModal({ message, onClose }: Props) {
  
  useEffect(()=>{
    let timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  },[]);

  return (
    <div className="fixed top-30 right-6 z-50">
      <div className="
        max-w-sm w-full
        bg-emerald-500 text-white
        flex items-center justify-between gap-3
        px-5 py-3
        rounded-xl shadow-xl border border-emerald-300/40
        font-semibold
      ">
        <span>Успіх:</span> {message}
      </div>
    </div>
  )
}


