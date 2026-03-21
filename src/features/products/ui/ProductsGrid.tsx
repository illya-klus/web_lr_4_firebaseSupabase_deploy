
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductItemCard";



const ProductsGrid = () => {
    const { filteredProducts } = useProducts();

    const productCards = filteredProducts.map( item => <ProductCard key={item.id + item.title} product={item}/>); 

    return(
        <div className="px-3 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto mt-8 sm:mt-10 mb-28">
            {productCards}
        </div>
    );
}

export default ProductsGrid;
