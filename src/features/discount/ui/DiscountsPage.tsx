import Timer from "./Timer";
import ProductCard from "../../products/ui/ProductItemCard";
import { useEffect, useState } from "react";
import { downloadProductsWithDiscount } from "../../products/api/productsApi";
import { ProductDto } from "../../../firebase/db/products";



const DiscountPage = () => {
    let [products, setProducts] = useState<ProductDto[]>([]);
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const download = async () =>{
            try {
                let discountProducts = await downloadProductsWithDiscount();
                setProducts(discountProducts);
            } finally {
                setIsLoading(false);
            }
        };
        download();
    }, []);

    const deadline = new Date(2026, 2, 17, 12);
    const now = new Date();

    const secondsUntilDeadline = Math.max(0, Math.floor((deadline.getTime() - now.getTime()) / 1000));

    return (
        <section className="w-full px-4 sm:px-6 py-12 sm:py-16">
                
          {/* HERO */}
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm text-slate-500">
              Special Offers
            </p>
            
            <h2 className="hero-title text-4xl sm:text-5xl font-semibold mt-4 leading-tight text-slate-900">
              Знижки на обрані товари
            </h2>
            
            <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto">
              Обмежені пропозиції на популярні позиції. Оновлюємо регулярно.
            </p>
          </div>
            
            
          {/* TITLE */}
          <div className="max-w-4xl mx-auto mt-12 flex flex-row items-center justify-center gap-5">
            <p className="text-slate-500">
              До завершення акції
            </p>
            <Timer startSeconds={secondsUntilDeadline} />
          </div>
          
            
          {/* STATES */}
          {isLoading && (
            <div className="max-w-6xl mx-auto mt-8 text-slate-500 text-center">
              Завантаження...
            </div>
          )}
        
          {!isLoading && products.length === 0 && (
            <div className="max-w-6xl mx-auto mt-8 text-slate-500 text-center">
              Наразі немає активних акцій.
            </div>
          )}
        
          {/* PRODUCTS */}
          {!isLoading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-10">
              {products.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        
          {/* FOOTER NOTE */}
          <div className="mt-20 text-center text-sm text-slate-400">
            Обмежена кількість товарів.
          </div>
        
        </section>
    );
};

export default DiscountPage;