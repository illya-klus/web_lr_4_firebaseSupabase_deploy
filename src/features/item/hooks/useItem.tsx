import { useParams } from "react-router-dom";
import { useProducts } from "../../products/hooks/useProducts";


export const useItem = () => {
    const {getProduct} = useProducts();
    let {id} = useParams();
    let product = getProduct(""+id);

    if(product){
        return product;
    }else{
        throw new Error("Some mistakes at loading products (products == null)");
    }
}