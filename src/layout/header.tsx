import { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../features/auth/context/useAuthContext";
import { useConfirmModal } from "../modals/confirm/hook/useConfirmModal";



const pseudoElementClasses = `relative after:content-[''] after:absolute after:left-0 after:-bottom-[5px] after:w-0 after:h-[3px] after:bg-[#00d1b2] after:transition-all after:duration-300`;
const NavBasicItems = [
    {to:"/", text:'Продукти'},
    {to:"/discounts", text:'Акції'},
    {to:"/profile", text:'Мій профіль'},
    {to:"/about", text:'Про нас'},
];
const NavAuthItems = [
    {to:"/auth/login", text:'LogIn'},
    {to:"/auth/register", text:'SingUp'}
];


type NavBtnsProps = {
    text: string;
    to: string;
}


const NavigationBtn = ({text, to} : NavBtnsProps) => {
    return (
        <NavLink 
            className={ ({isActive}) => isActive 
                ? "text-[#00d1b2] after:w-full " + pseudoElementClasses
                : pseudoElementClasses } 
            to={to}
        >{text}</NavLink>
    )
}

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const {user, setUserAsNotIdentify} = useAuth();
    const {showModal, ConfirmModalComponent} = useConfirmModal(() => setUserAsNotIdentify());
    let alertMessage = "Ви впевнені що хочете вийти з акаунту?\nВсі дані буде збережено."


    return(
        <header className="text-lg sm:text-xl fixed top-2 w-full flex flex-col items-center justify-center z-50 px-2 sm:px-0">
            <ConfirmModalComponent/>

            <div className="max-w-300 p-4 sm:p-7 w-full flex flex-wrap sm:flex-row justify-between items-center gap-4 sm:gap-0 bg-[#2b2b2be7] text-white shadow-lg rounded-xl">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="sm:hidden text-2xl"
                >
                    ☰
                </button>
                <div className="logo_conteiner text-lg sm:text-xl font-semibold ">
                    logo
                </div>
                <nav className="hidden sm:flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-7 w-full sm:w-auto">
                    {NavBasicItems.map((item)=> <NavigationBtn key={item.to} to={item.to} text={item.text}/>)}
                </nav>
                {user.authStatus === 'not_identify' ?
                    <nav className="hidden sm:flex gap-4 sm:gap-5 w-full sm:w-auto justify-center sm:justify-end">
                        {NavAuthItems.map((item)=> <NavigationBtn key={item.to} to={item.to} text={item.text}/>)}
                    </nav>
                    :
                    <button className="cursor-pointer hidden sm:block text-2xl" onClick={() => showModal(alertMessage)}>Log Out</button>
                }
            </div>

            {menuOpen && (
                <div className="sm:hidden mt-2 w-full bg-[#2b2b2be7] text-white shadow-lg rounded-xl p-4 flex flex-col gap-4">
                
                    {NavBasicItems.map((item) => (
                        <NavigationBtn key={item.to} to={item.to} text={item.text} />
                    ))}

                    <div className="border-t border-gray-600 pt-4 flex flex-col gap-4">
                        {user.authStatus === "identify" 
                            ? <button onClick={() => showModal(alertMessage)}>Log Out</button> 
                            : NavAuthItems.map((item) => (
                                <NavigationBtn key={item.to} to={item.to} text={item.text} />
                        ))}
                    </div>
                    
                </div>
            )}
    
        </header>
    );
}

export default Header;