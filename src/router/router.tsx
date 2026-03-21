import { createBrowserRouter} from 'react-router'



import NotFound from './NotFoundPage';
import Layout from './Layout';
import ProductsPage from '../features/products/ui/ProductsPage';
import AboutUs from '../features/about/ui/AboutUsPage';
import DiscountPage from '../features/discount/ui/DiscountsPage';
import ItemPage from '../features/item/ui/ItemPage';
import ProfilePage from '../features/profile/ui/ProfilePage';
import Cart from '../features/cart/ui/Cart';
import AuthLayout from './AuthLayout';

import LoginPage from '../features/auth/ui/LoginPage';
import RegisterPage from '../features/auth/ui/RegisterPage';





const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [ 
      { index: true, element: <ProductsPage/> }, 
      { path:'about', element: <AboutUs/> }, 
      { path:'discounts', element: <DiscountPage/> },
      { path:'items/:id', element: <ItemPage/> },
      { path:'profile', element: <ProfilePage/> },
      { path:':uid/cart', element: <Cart/>},
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout/>,
    children:[
      { path: 'register', element: <RegisterPage/> },
      { path: 'login', element: <LoginPage/> }
    ],
  },
  {
    path:'*',
    element: <NotFound/>
  }
]);


export default router;