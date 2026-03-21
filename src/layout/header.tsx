import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useAuth } from "../features/auth/context/useAuthContext";
import { useConfirmModal } from "../modals/confirm/hook/useConfirmModal";
import FloatingCartButton from "../features/cart/ui/FloatingCartButton";



const pseudoElementClasses = "rounded-lg px-3 py-2 transition-all duration-200 hover:bg-slate-100";
const NavBasicItems = [
    {to:import.meta.env.VITE_BASE_URL+"/", text:'Продукти'},
    {to:import.meta.env.VITE_BASE_URL+"/discounts", text:'Акції'},
    {to:import.meta.env.VITE_BASE_URL+"/profile", text:'Мій профіль'},
    {to:import.meta.env.VITE_BASE_URL+"/about", text:'Про нас'},
];
const NavAuthItems = [
    {to:import.meta.env.VITE_BASE_URL+"/auth/login", text:'LogIn'},
    {to:import.meta.env.VITE_BASE_URL+"/auth/register", text:'SingUp'}
];


type NavBtnsProps = {
    text: string;
    to: string;
}


const NavigationBtn = ({text, to} : NavBtnsProps) => {
    return (
        <NavLink 
            className={ ({isActive}) => isActive 
                ? "bg-cyan-50 text-cyan-700 font-semibold " + pseudoElementClasses
                : pseudoElementClasses } 
            to={to}
        end>{text}</NavLink>
    )
}

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {user, setUserAsNotIdentify} = useAuth();
    const {showModal, ConfirmModalComponent} = useConfirmModal(() => setUserAsNotIdentify());
    let alertMessage = "Ви впевнені що хочете вийти з акаунту?\nВсі дані буде збережено."
    const location = useLocation(); 
    
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);


    return(
        <header className="text-base sm:text-lg fixed top-0 w-full flex flex-col items-center justify-center z-50 px-3 pt-3">
            <ConfirmModalComponent/>

            <div className="max-w-6xl px-4 sm:px-6 py-3 sm:py-4 w-full flex flex-wrap sm:flex-row justify-between items-center gap-3 sm:gap-0 bg-white/85 text-slate-800 shadow-lg backdrop-blur-md rounded-2xl border border-slate-200">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="sm:hidden text-2xl text-slate-700"
                >
                    ☰
                </button>
                <div className="logo_conteiner text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                    Sport<span className="text-cyan-600">UA</span>
                </div>
                <nav className="hidden sm:flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
                    {NavBasicItems.map((item)=> <NavigationBtn key={item.to} to={item.to} text={item.text}/>)}
                </nav>
                {user.authStatus === 'not_identify' ?
                    <nav className="hidden sm:flex gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
                        {NavAuthItems.map((item)=> <NavigationBtn key={item.to} to={item.to} text={item.text}/>)}
                    </nav>
                    :
                    <button
                        className="cursor-pointer hidden sm:block px-4 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-700 transition-colors"
                        onClick={() => showModal(alertMessage)}
                    >
                        Log Out
                    </button>
                }
            </div>

            {menuOpen && (
                <div className="sm:hidden mt-2 w-full bg-white text-slate-800 shadow-lg rounded-2xl p-4 flex flex-col gap-3 border border-slate-200">
                
                    {NavBasicItems.map((item) => (
                        <NavigationBtn key={item.to} to={item.to} text={item.text} />
                    ))}

                    <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
                        {user.authStatus === "identify" 
                            ? (
                                <button
                                    className="px-4 py-2 rounded-lg bg-slate-900 text-white font-medium"
                                    onClick={() => showModal(alertMessage)}
                                >
                                    Log Out
                                </button>
                            )
                            : NavAuthItems.map((item) => (
                                <NavigationBtn key={item.to} to={item.to} text={item.text} />
                        ))}
                    </div>
                    
                </div>
            )}
        <FloatingCartButton />
        </header>
    );
}

export default Header;