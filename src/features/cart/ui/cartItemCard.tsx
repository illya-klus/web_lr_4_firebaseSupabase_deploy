import { CartItem, useCart } from "../hooks/useCart";


type Props = {
  item: CartItem;
};

const CartItemCard = ({ item }: Props) => {
  const { product, count } = item;
  const { addToCart, removeFromCart, removeItemFromCart } = useCart();

  const discountedPrice = product.discount
    ? (product.price * (100 - product.discount)) / 100
    : product.price;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 bg-white transition border-b border-b-gray-300">
      <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0">
        <img
          src={product.image || ""}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col grow gap-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          {product.title}
        </h3>

        <p className="text-gray-500 text-sm">
          {product.description}
        </p>

        {product.discount ? (
          <div className="flex gap-2 items-center mt-1">
            <span className="text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-[#00d1b2] font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
        ) : (
          <p className="text-[#00d1b2] font-bold mt-1">
            ${product.price.toFixed(2)}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        <button 
          className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 active:scale-95 transition"
          onClick={() => removeFromCart(product.id)}
        >
          −
        </button>

        <span className="text-lg font-semibold w-6 text-center">
          {count}
        </span>

        <button 
          className="w-9 h-9 flex items-center justify-center bg-gray-200 rounded-lg hover:bg-gray-300 active:scale-95 transition"
          onClick={() => addToCart(product)}
        >
          +
        </button>
      </div>

      <button 
        className="mt-3 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition font-medium w-full sm:w-auto"
        onClick={() => removeItemFromCart(product.id)}
      >
        Remove
      </button>

    </div>
  );
};

export default CartItemCard;