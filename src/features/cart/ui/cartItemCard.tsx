import { CartItem, useCart } from "../hooks/useCart";
import trash from "/public/icons/red-trash-can-icon.png"

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
    <div className="flex items-center gap-3 p-2">

      {/* Image */}
      <div className="w-20 h-20 shrink-0 overflow-hidden rounded-md">
        <img
          src={product.image || ""}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info + Price */}
      <div className="flex flex-col grow gap-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.title}</h3>
        {product.description && (
          <p className="text-gray-500 text-xs line-clamp-2">{product.description}</p>
        )}
        <span className="text-gray-900 font-medium text-sm">
          ${discountedPrice.toFixed(2)}
        </span>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => removeFromCart(product.id)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
        >
          −
        </button>
        <span className="w-5 text-center text-sm">{count}</span>
        <button
          onClick={() => addToCart(product)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeItemFromCart(product.id)}
        className="ml-2 px-3 py-1 text-white text-xs font-medium rounded cursor-pointer"
      >
        <img className="w-10 sm:w-6" src={trash} alt="" />
      </button>
    </div>
  );
};

export default CartItemCard;