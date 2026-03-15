
import { Outlet } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';



const Layout = () => {

    return(
        <>
        <Header/>
        
        <main className='pt-24 sm:pt-30 '>
            <Outlet/>
        </main>
        
        <Footer/>
        </>
    );
}

export default Layout;