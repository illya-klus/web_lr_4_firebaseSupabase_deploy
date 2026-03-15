import SearchBar from "./SearchInput";
import ProductsGrid from "./ProductsGrid";


const ItemsForInfoSection = [
    {
        src: "/public/icons/quality-badge-thumbs-up-icon.png",
        text: "Тільки оригінальні товари",
    },
    {
        src: "/public/icons/maps-pin-black-icon.webp",
        text: "Більше 35 магазинів по всій україні",
    },
    {
        src: "/public/icons/cashback-icon.webp",
        text: "Кешбек за кожну покупку",
    },
    {
        src: "/public/icons/delivery-truck-icon.webp",
        text: "Безкоштовна доставка від 3000 грн",
    },
];
const Brands = [
    {src: "/brands/132889.png"},
    {src: "/brands/132893.png"},
    {src: "/brands/132894.jpg"},
    {src: "/brands/132895.png"},
    {src: "/brands/132897.png"},
    {src: "/brands/132898.png"},
    {src: "/brands/132900.jpg"},
    {src: "/brands/132901.png"},
    {src: "/brands/132903.png"},
    {src: "/brands/132906.png"},
    {src: "/brands/132912.png"},
    {src: "/brands/138634.png"},
];



type InfoCardProps = { 
    src: string;
    text: string;
}
const InfoCard = ({src, text} : InfoCardProps) => {
    return (
        <li className="card flex flex-col items-center justify-center w-1/2 md:w-1/4 p-4 gap-4 sm:gap-5 text-center border-gray-300 border-b md:border-b-0 md:border-r transition-all duration-300">
            <img src={src} alt="Значок" className="w-12 h-12" />
            <p className="text-sm md:text-base">{text}</p>
        </li>
    );
}



const ProductsPage = () => {


    console.log('product page rendered');
    return (
        <section className="w-full">

            <div className="p-4 sm:p-10 bg-cover bg-center bg-[url('/public/images/logan-weaver-lgnwvr-YKSwncA1eKU-unsplash.jpg')]">
                <div className="max-w-180 m-auto grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-8">
                    {Brands.map(item => {
                        return(
                            <div key={item.src} className="bg-white border-0 rounded-xl p-2 sm:p-4 flex items-center justify-center">
                                <img src={item.src} />
                            </div>
                        );
                    })}
                </div>
            </div>

            <ul className="px-3 info flex flex-wrap max-w-250 mx-auto mt-6 sm:mt-10 rounded-lg shadow-md">
                {ItemsForInfoSection.map(item => <InfoCard key={item.src} src={item.src} text={item.text} />)}
            </ul>

            <div className=" flex flex-col gap-0 items-center w-full px-3 sm:px-0">
                <SearchBar/>
            </div>
            
            <ProductsGrid/>

        </section>
            
    );
}

export default ProductsPage;