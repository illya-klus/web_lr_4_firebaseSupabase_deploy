
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductItemCard";



const ProductsGrid = () => {
    const { filteredProducts } = useProducts();

    const productCards = filteredProducts.map( item => <ProductCard key={item.id + item.title} product={item}/>); 

    return(
        <div className="px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-4 max-w-222.5 mx-auto mt-10 mb-60">
            {productCards}
        </div>
    );
}

export default ProductsGrid;
