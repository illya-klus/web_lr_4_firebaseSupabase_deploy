import { createContext, ReactNode, useContext, useState  } from "react";

import { ProductDto } from "../../../firebase/db/products";



export type CartItem = {
  product: ProductDto;
  count: number;
};



type CartContextType = {
    products: CartItem[];
    total: number;
    addToCart: (product: ProductDto) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    removeItemFromCart: (id: string) => void;
    isInCart: (id:string) => boolean;
    getCartLen : () => number;
}


const CartContext = createContext<CartContextType | null>( null );

export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) throw new Error("useCart must be used inside CartProvider");
    return context;
}

export const CartProvider = ({children} : {children : ReactNode}) => {
    let [products, setProducts] = useState<CartItem[]>([]);

    const addToCart = (product: ProductDto) => {
        setProducts(prev => {
          const foundProduct = prev.find(item => item.product.id === product.id);
        
          if (foundProduct) {
            // якщо кількість менше stock, збільшуємо
            if (foundProduct.count < foundProduct.product.stock) {
              return prev.map(item =>
                item.product.id === product.id
                  ? { ...item, count: item.count + 1 }
                  : item
              );
            } else {
              // вже досягли максимум stock – нічого не робимо
              return prev;
            }
          }
      
          // продукту ще немає у кошику – додаємо з count = 1
          return [...prev, { product, count: 1 }];
        });
    };

    const removeFromCart = (id:string) => {
        setProducts( (prev) => 
            prev
            .map(
                item => item.product.id === id 
                ? {...item, count: item.count-1}
                : item
            ).filter(i => i.count > 0)
        );
    }

    const removeItemFromCart = (id:string) =>{
        setProducts( (prev) => 
            prev.filter(item => item.product.id !== id)
        );
    }

    const clearCart = () => {
        setProducts([]);
    }

    const isInCart = (id: string) => {
        return products.find(i => i.product.id === id) ? true : false;
    }
    const getCartLen = () => {
        return products.length;
    }

    const total = products.reduce((a, i) => a += i.count*i.product.price , 0);


    return(
        <CartContext.Provider value={ { products, total, addToCart, removeFromCart, clearCart, removeItemFromCart, isInCart, getCartLen} }>
            {children}
        </CartContext.Provider>
    );
}































