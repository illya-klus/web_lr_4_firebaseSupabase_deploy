import { useAuth } from "../../auth/context/useAuthContext";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router";


const FloatingCartButton = () => {
  const { user } = useAuth();
  const { products } = useCart();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user.userId !== "none") {
      navigate(`/${user.userId}/cart`);
    }
  };


  return (
    <button
      onClick={handleClick}
      className="fixed bottom-50 right-4 sm:bottom-6 sm:right-6  flex items-center justify-center w-14 h-14 rounded-full bg-black text-white shadow-lg hover:bg-gray-900 transition-all"
    >
      🛒
      {products.length > 0 && (
        <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
          {products.length}
        </span>
      )}
    </button>
  );
};

export default FloatingCartButton;