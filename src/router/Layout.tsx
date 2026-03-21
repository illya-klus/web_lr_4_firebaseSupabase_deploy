
import { Outlet } from 'react-router-dom';
import Header from '../layout/header';
import Footer from '../layout/footer';



const Layout = () => {

    return(
        <div className='min-h-screen flex flex-col'>
        <Header/>
        
        <main className='pt-12 sm:pt-16 flex-1'>
            <Outlet/>
        </main>
        
        <Footer/>
        </div>
    );
}

export default Layout;