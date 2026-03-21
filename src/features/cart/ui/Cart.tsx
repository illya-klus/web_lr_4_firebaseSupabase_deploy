import { useCart } from "../hooks/useCart";
import CartItemCard from "./cartItemCard";

const CartPage = () => {
  const { products, total } = useCart();

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto p-4 pt-12 sm:pt-20">

      {/* Left: Product List */}
      <div className="flex-1 flex flex-col gap-4">
        {products.length === 0 ? (
          <div className="p-6 text-center text-gray-500 border border-gray-200 rounded">
            Кошик порожній. Додайте товари з каталогу.
          </div>
        ) : (
          products.map((item) => (
            <CartItemCard key={item.product.id} item={item} />
          ))
        )}
      </div>

      {/* Right: Summary */}
      <div className="w-full lg:w-80 flex flex-col gap-4 p-4 border border-gray-200 rounded bg-gray-50">
        <h2 className="font-semibold text-lg">Підсумок</h2>

        <div className="flex justify-between">
          <span>Ціна товарів</span>
          <span>{total.toFixed(0)}$</span>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <span>Доставка</span>
          <span>від 4$</span>
        </div>

        <div className="flex justify-between font-semibold mt-2">
          <span>ЗАГАЛЬНА СУМА</span>
          <span>{(total + 4).toFixed(0)}$</span>
        </div>

        <button
          disabled={products.length === 0}
          className={`mt-4 py-2 rounded font-medium text-white ${
            products.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-900"
          }`}
        >
          Перейти до оформлення
        </button>

        {/* Info block */}
        <div className="mt-4 text-gray-500 text-sm flex flex-col gap-1">
          <span>Безпечні покупки в SportUA</span>
          <span>Безкоштовна доставка додому або у пункт видачі від 1600 UAH</span>
          <span>Безкоштовне повернення протягом 30 днів</span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;