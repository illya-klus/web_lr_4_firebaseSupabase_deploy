import { RouterProvider } from "react-router-dom"
import { CartProvider } from "./features/cart/hooks/useCart"
import { ProductsProvider } from "./features/products/hooks/useProducts"
import { HistoryContextProvider } from "./features/profile/context/HistoryContext"
import router from "./router/router"
import { AuthProvider } from "./features/auth/context/useAuthContext"


function App() {
  return (
    <AuthProvider>
      <ProductsProvider> 
        <HistoryContextProvider>
          <CartProvider>
            <RouterProvider router={router}/>
          </CartProvider>
        </HistoryContextProvider>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App
