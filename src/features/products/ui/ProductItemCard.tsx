import { useNavigate } from "react-router";
import { useHistoryContext } from "../../profile/context/HistoryContext";
import { useCart } from "../../cart/hooks/useCart";
import { ProductDto } from "../../../firebase/db/products";
import { useEffect, useState } from "react";
import { getImageByFolder } from "../../../supabase/imagesUpload";

type ProductCardProps = {
  product: ProductDto;
  onAddToCart?: (product: ProductDto) => void;
};

const ProductDiscount = ({ discount }: { discount: number | null }) => {
  return discount && (
    <div className="absolute top-2 left-2">
      <span className="px-2 py-1 text-[10px] font-bold text-white bg-red-500 rounded-full">
        -{discount}%
      </span>
    </div>
  );
};

const ProductImage = ({ id, image }: { id: string; image: string }) => {
  const navigate = useNavigate();
  const { addToVisited } = useHistoryContext();
  const [imageSrc, setImageSrc] = useState(image);

  useEffect(() => {
    let mounted = true;
    if (image) {
      setImageSrc(image);
      return;
    }
    getImageByFolder(id)
      .then((url) => {
        if (mounted && url) setImageSrc(url);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [id, image]);

  return (
    <div className="w-full flex justify-center items-center">
      <img
        onClick={() => {
          addToVisited(id);
          navigate(import.meta.env.VITE_BASE_URL + "/items/" + id);
        }}
        src={imageSrc || import.meta.env.VITE_BASE_URL + "/public/images/avatar.jpg"}
        className="w-full h-52 sm:h-60 object-contain rounded"
      />
    </div>
  );
};

const CostAndBtnBuy = ({ product }: { product: ProductDto }) => {
  const { addToCart, isInCart } = useCart();
  const isInCartBool = isInCart(product.id);

  const discountedPrice = product.discount
    ? (product.price * (100 - product.discount)) / 100
    : product.price;

  const handleBuy = () => addToCart(product);

  return (
    <div className="mt-auto flex items-center justify-between gap-2">
      {product.discount ? (
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 line-through">${product.price.toFixed(2)}</span>
          <span className="text-sm font-semibold text-green-600">${discountedPrice.toFixed(2)}</span>
        </div>
      ) : (
        <span className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</span>
      )}

      <button
        disabled={isInCartBool}
        onClick={handleBuy}
        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
          isInCartBool
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-900 text-white hover:bg-gray-700"
        }`}
      >
        {isInCartBool ? "В кошику" : "Купити"}
      </button>
    </div>
  );
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="relative flex flex-col p-4 bg-white select-none">
      <ProductDiscount discount={product.discount} />
      <ProductImage id={product.id} image={product.image || ""} />

      <div className="flex flex-col gap-1 mt-2">
        <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
      </div>

      <CostAndBtnBuy product={product} />
    </article>
  );
};

export default ProductCard;