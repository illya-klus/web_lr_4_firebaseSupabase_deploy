import { useEffect } from "react"

type Props = {
  message: string;
  onClose: () => void;
}

export default function ErrorModal({ message, onClose }: Props) {
  
  useEffect(()=>{
    let timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  },[]);

  return (
    <div className="fixed top-30 right-6 z-50 animate-slideIn">
      <div className="
        flex items-center gap-2
        bg-red-400 text-white
        px-5 py-3
        rounded-xl
        shadow-xl
        backdrop-blur
        font-medium
      ">
        {message}
      </div>
    </div>
  )
}


