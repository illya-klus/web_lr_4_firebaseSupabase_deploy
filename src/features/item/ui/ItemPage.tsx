import { useState } from "react";
import { useCart } from "../../cart/hooks/useCart";
import { useItem } from "../hooks/useItem";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getImageByFolder } from "../../../supabase/imagesUpload";

const sizes = ["S", "M", "L", "XL"];

const ItemPage = () => {
  const product = useItem();
  const { addToCart, isInCart } = useCart();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState(product.image || "");

  if (!product) return <p className="text-center mt-20">Product not found</p>;

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
      .catch(() => {
        // Keep placeholder if loading fails.
      });

    return () => {
      mounted = false;
    };
  }, [product.id, product.image]);

  return (
    <section className="px-3 sm:px-6 mt-10 sm:mt-14 mb-12">
      <div className="max-w-6xl mx-auto">
        <Link
          to={baseUrl + "/"}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          ← Назад до каталогу
        </Link>
      </div>

      <div className="mt-4 sm:mt-6 flex flex-col lg:flex-row gap-6 sm:gap-8 p-4 sm:p-7 bg-white border border-slate-200 rounded-3xl shadow-md max-w-6xl mx-auto">
        <div className="shrink-0 w-full lg:w-[44%] bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center min-h-72 sm:min-h-96">
          <img
            src={imageSrc || import.meta.env.VITE_BASE_URL + "/public/images/avatar.jpg"}
            alt={product.title}
            className="w-full h-full max-h-96 object-contain p-6"
          />
        </div>

        <div className="flex flex-col gap-6 grow">
          <div className="flex flex-col gap-2">
            <p className="text-cyan-700 font-semibold uppercase tracking-wide text-xs sm:text-sm">{product.brand}</p>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">{product.title}</h1>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <p className="font-semibold text-slate-700 mb-3">Оберіть розмір:</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 border rounded-lg font-semibold transition
                  ${selectedSize === size ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 sm:p-5">
            <div className="flex items-center gap-4 text-lg sm:text-2xl flex-wrap">
              {product.discount ? (
                <>
                  <p className="line-through text-slate-400 font-medium">
                    {product.price.toFixed(2)} {product.currency}
                  </p>
                  <p className="text-emerald-600 font-black">
                    {discountedPrice.toFixed(2)} {product.currency}
                  </p>
                  <span className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-xs font-bold">
                    -{product.discount}%
                  </span>
                </>
              ) : (
                <p className="font-black text-slate-900">
                  {product.price.toFixed(2)} {product.currency}
                </p>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Доставка по Україні 1-3 дні. Гарантія повернення 14 днів.
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={inCart}
            className={`w-full sm:w-fit px-6 py-3.5 font-semibold rounded-xl transition
            ${inCart ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow"}`}
          >
            {inCart ? "Вже в кошику" : "Додати в кошик"}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
            <p>• Офіційна гарантія від магазину</p>
            <p>• Безпечна оплата онлайн або при отриманні</p>
            <p>• Консультація менеджера перед покупкою</p>
            <p>• Обмін/повернення без зайвих питань</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemPage;