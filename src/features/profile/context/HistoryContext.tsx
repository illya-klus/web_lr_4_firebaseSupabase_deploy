import { createContext, ReactNode, useContext, useState } from "react";
import { useProducts } from "../../products/hooks/useProducts";
import { ProductDto } from "../../../firebase/db/products";





type HistoryContext = {
    visited : ProductDto[];
    addToVisited: (id:string) => void;
    clearVisited: () => void;
}



const HistoryContext = createContext<HistoryContext | null>(null);


export const useHistoryContext = () => {
    let context = useContext(HistoryContext);
    if(!context)
        throw new Error("Use element covered by HistoryContext provider");
    return context;
}


export const HistoryContextProvider = ({children} : {children:ReactNode}) => {
    let [visited, setVisited] = useState<ProductDto[]>([]);
    const {getProduct} = useProducts();

    const addToVisited = (id: string) => {
        let newItem = getProduct(id);
        if (!newItem) return;
        setVisited(prev => [...prev, newItem]);
        console.log(visited);
    }
    const clearVisited = () => {
        setVisited([]);
    }

    return(
        <HistoryContext.Provider value={{visited, addToVisited, clearVisited}}>
            {children}
        </HistoryContext.Provider>
    );
}






























