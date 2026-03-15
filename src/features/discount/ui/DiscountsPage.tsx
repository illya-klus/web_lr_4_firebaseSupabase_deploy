import Timer from "./Timer";
import ProductCard from "../../products/ui/ProductItemCard";
import { useEffect, useState } from "react";
import { downloadProductsWithDiscount } from "../../products/api/productsApi";
import { ProductDto } from "../../../firebase/db/products";



const DiscountPage = () => {
    let [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        const download = async () =>{
            let discountProducts = await downloadProductsWithDiscount();
            setProducts(discountProducts);
        }
        download();
    }, []);

    const deadline = new Date(2026, 2, 10, 12);
    const now = new Date();

    const secondsUntilDeadline = Math.max(0, Math.floor((deadline.getTime() - now.getTime()) / 1000));

    return (
        <section className="w-full px-4 sm:px-10 py-10 ">
  
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6 px-2">
              Лови знижки зараз!
            </h2>
        
            <div className="max-w-3xl mx-auto mb-8 sm:mb-10 p-4 sm:p-6 bg-white rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="text-center sm:text-left">
                    <p className="text-xl font-semibold text-gray-700">Скоро закінчаться!</p>
                    <p className="text-gray-500">Не пропусти акцію на топові товари</p>
                </div>
        
                <Timer startSeconds={secondsUntilDeadline}/>
            </div>
        
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-4 max-w-222.5 mx-auto mt-10 mb-60">
                {products.map(item => <ProductCard product={item}/>)}
            </div>
        
            <div className="mt-12 text-center text-gray-400 italic">
              🕒 Поспішай, поки товари не закінчились!
            </div>
        </section>
    );
};

export default DiscountPage;