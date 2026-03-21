import { useState, useEffect } from "react";
import { useCart } from "../../cart/hooks/useCart";
import { useItem } from "../hooks/useItem";
import { Link } from "react-router-dom";
import { getImageByFolder } from "../../../supabase/imagesUpload";

const sizes = ["S", "M", "L", "XL"];

const ItemPage = () => {
  const product = useItem();
  const { addToCart, isInCart } = useCart();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState(product.image || "");

  if (!product) return <p className="text-center mt-20 text-gray-600">Product not found</p>;

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Будь ласка, оберіть розмір");
      return;
    }
    addToCart({ ...product });
  };

  const inCart = isInCart(product.id);

  useEffect(() => {
    let mounted = true;

    if (product.image) {
      setImageSrc(product.image);
      return;
    }

    getImageByFolder(product.id)
      .then((url) => {
        if (mounted && url) setImageSrc(url);
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [product.id, product.image]);

  return (
    <section className="px-3 sm:px-6 mt-10 sm:mt-14 mb-12">
      <div className="max-w-6xl mx-auto">
        <Link
          to={baseUrl + "/"}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          ← Назад до каталогу
        </Link>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col lg:flex-row gap-6 sm:gap-8 p-4 sm:p-6 bg-white max-w-6xl mx-auto">
        {/* Image */}
        <div className="shrink-0 w-full lg:w-[44%] bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center min-h-72 sm:min-h-96">
          <img
            src={imageSrc || import.meta.env.VITE_BASE_URL + "/public/images/avatar.jpg"}
            alt={product.title}
            className="w-full h-full object-contain p-4"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5 grow">
          <div className="flex flex-col gap-2">
            <p className="text-cyan-700 font-semibold uppercase tracking-wide text-xs sm:text-sm">{product.brand}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{product.title}</h1>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selector */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-slate-700">Оберіть розмір:</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg font-semibold transition
                    ${selectedSize === size ? "bg-slate-900 text-white" : "bg-white text-slate-800 border border-slate-300 hover:bg-slate-100"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {product.discount ? (
              <>
                <p className="line-through text-slate-400 font-medium">{product.price.toFixed(2)} {product.currency}</p>
                <p className="text-emerald-600 font-bold text-xl">{discountedPrice.toFixed(2)} {product.currency}</p>
                <span className="px-2 py-1 rounded-full bg-rose-500 text-white text-xs font-bold">-{product.discount}%</span>
              </>
            ) : (
              <p className="text-slate-900 font-bold text-xl">{product.price.toFixed(2)} {product.currency}</p>
            )}
          </div>
          <p className="text-xs text-slate-500">Доставка по Україні 1-3 дні. Гарантія повернення 14 днів.</p>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={inCart}
            className={`w-full sm:w-auto px-6 py-3 font-semibold rounded-lg transition
              ${inCart ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-cyan-800 hover:bg-cyan-900 text-white! shadow"}`}
          >
            {inCart ? "Вже в кошику" : "Додати в кошик"}
          </button>

          {/* Info list */}
          <ul className="flex flex-col gap-3 text-sm text-slate-600">
            <li>• Офіційна гарантія від магазину</li>
            <li>• Безпечна оплата онлайн або при отриманні</li>
            <li>• Консультація менеджера перед покупкою</li>
            <li>• Обмін/повернення без зайвих питань</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ItemPage;