import { useState } from "react";
import { useCart } from "../../cart/hooks/useCart";
import { useItem } from "../hooks/useItem";

const sizes = ["S", "M", "L", "XL"];

const ItemPage = () => {
  const product = useItem();
  const { addToCart, isInCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart({ ...product });
  };

  const inCart = isInCart(product.id);

  return (
    <div className="mt-16 sm:mt-20 flex flex-col md:flex-row gap-8 sm:gap-10 p-4 sm:p-6 bg-white max-w-6xl mx-auto">
      
      <div className="shrink-0 w-full md:w-1/3 h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={product.image || ""}
          alt={product.title}
          className="w-full h-full object-contain transition-transform scale-105"
        />
      </div>


      <div className="flex flex-col gap-6 grow">
        
  
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 font-semibold">{product.brand}</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.title}</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>


        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-700">Select Size:</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-md font-medium transition
                  ${selectedSize === size ? "bg-teal-500 text-white border-teal-500" : "bg-white text-gray-800 hover:bg-gray-200"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>


        <div className="flex items-center gap-4 text-lg sm:text-xl flex-wrap">
          {product.discount ? (
            <>
              <p className="line-through text-gray-400">
                {product.price.toFixed(2)} {product.currency}
              </p>
              <p className="text-red-500 font-bold">
                {discountedPrice.toFixed(2)} {product.currency}
              </p>
            </>
          ) : (
            <p className="font-bold text-gray-800">
              {product.price.toFixed(2)} {product.currency}
            </p>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={inCart}
          className={`w-full sm:w-fit px-6 py-3 font-semibold rounded-lg transition
            ${inCart ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600 text-white"}`}
        >
          {inCart ? "Already in Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ItemPage;