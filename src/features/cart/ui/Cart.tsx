
import { useCart } from "../hooks/useCart";
import CartItemCard from "./cartItemCard";





const Cart = () => {
    const { products, total, clearCart } = useCart();

    return(
        <div>
            <div className="w-full mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 px-3 sm:px-0">
                <p className="text-lg font-semibold">Total: {total}$</p>
                <button className="w-full sm:w-auto px-6 py-2 bg-[#00d1b2] text-white font-semibold rounded-lg shadow hover:bg-[#00bfa5] active:scale-95 transition">
                    Замовити
                </button>
            </div>

            <div className="p-3 sm:p-5 flex flex-col gap-3">
                {products.map((i) => <CartItemCard item={i}/>)}
            </div>

            <button 
                className="mt-4 w-full sm:w-auto px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 active:scale-95 transition"
                onClick={() => clearCart()}
            >
                Очистити корзину
            </button>
        </div>
    );
}

export default Cart;