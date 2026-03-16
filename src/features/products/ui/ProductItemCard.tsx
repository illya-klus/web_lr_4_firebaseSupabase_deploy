import { useNavigate } from "react-router";
import { useHistoryContext } from "../../profile/context/HistoryContext";
import { useCart } from "../../cart/hooks/useCart";
import { ProductDto } from "../../../firebase/db/products";



type ProductCardProps = {
  product: ProductDto;
  onAddToCart?: (product: ProductDto) => void;
};


const ProductDiscount = ({discount} : {discount: number | null}) => {
  return discount && 
  (
    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
      <span className="px-3 py-1 text-xs font-semibold text-white bg-linear-to-tr from-teal-400 to-teal-500 rounded-full">
        -{discount}%
      </span>
    </div>
  )
}
const ProductImage = ({id, image} : {id : string, image: string}) => {
  const navigate = useNavigate();
  const {addToVisited} = useHistoryContext()

  return(
    <div className="flex justify-center items-center w-full">
      <img
        onClick={() =>{
          addToVisited(id);
          navigate(import.meta.env.VITE_BASE_URL+'/items/' + id);
        } }
        src={image}
        className="h-44 sm:h-55 w-full object-contain hover:p-1 transition"
      />
    </div>
  );
}
const  CostAndBtnBuy = ({product} : {product : ProductDto}) => {

  const { addToCart, isInCart } = useCart();

  let isInCartBool = isInCart(product.id);

  const discountedPrice = product.discount
    ? (product.price * (100 - product.discount)) / 100
    : product.price;

  const handleBuy = () => {
    addToCart(product);
  }

  return(
      <div className="mt-auto flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
        {product.discount ? (
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm font-bold text-green-600">
              ${discountedPrice.toFixed(2)}
            </span>
          </div>
        ) : (
          <span className="text-sm font-bold text-gray-800">${product.price.toFixed(2)}</span>
        )}

        <button
          disabled={isInCartBool}
          onClick={handleBuy}
          className={"px-3 py-2 text-xs font-semibold bg-teal-500 text-white rounded-lg transition-colors cursor-pointer hover:bg-teal-600 disabled:bg-gray-500 whitespace-nowrap"}
        >
          {isInCartBool ? "В кошику" : "Купити"}
        </button>
      </div>
  );
}



const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="relative flex flex-col gap-3 p-3 sm:p-4 max-w-full sm:max-w-60 select-none border-0 transition">
      
      <ProductDiscount discount={product.discount}/>
      <ProductImage id={product.id} image={product.image||""}/>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm sm:text-sm font-bold">{product.title}</h3>
        <p className="text-xs text-gray-600 leading-snug line-clamp-2">{product.description}</p>
      </div>

      <CostAndBtnBuy product={product}/>

    </div>
  );
};

export default ProductCard;