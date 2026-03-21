import SearchBar from "./SearchInput";
import ProductsGrid from "./ProductsGrid";
import { Link } from "react-router-dom";


const TrustItems = [
    {
        src: import.meta.env.VITE_BASE_URL+"/icons/quality-badge-thumbs-up-icon.png",
        title: "100% оригінал",
        text: "Лише офіційна продукція з гарантією.",
    },
    {
        src: import.meta.env.VITE_BASE_URL+"/icons/maps-pin-black-icon.webp",
        title: "Мережа по Україні",
        text: "35+ точок видачі та зручна доставка.",
    },
    {
        src: import.meta.env.VITE_BASE_URL+"/icons/cashback-icon.webp",
        title: "Вигідні покупки",
        text: "Акції, кешбек і бонуси для постійних клієнтів.",
    },
];
const Brands = [
    {src: import.meta.env.VITE_BASE_URL+"/brands/132889.png"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132893.png"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132894.jpg"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132895.png"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132897.png"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132898.png"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132900.jpg"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132901.png"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132903.png"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132906.png"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/132912.png"},
    {src: import.meta.env.VITE_BASE_URL+"/brands/138634.png"},
];
const Stats = [
    { value: "25 000+", label: "задоволених клієнтів" },
    { value: "4.9/5", label: "середня оцінка сервісу" },
    { value: "24h", label: "відправка популярних товарів" },
];



// type InfoCardProps = { 
//     src: string;
//     title: string;
//     text: string;
// }
// const InfoCard = ({src, title, text} : InfoCardProps) => {
//     return (
//         <li className="card bg-white border border-slate-200 rounded-2xl p-5 flex gap-4 items-start shadow-sm">
//             <img src={src} alt="Значок" className="w-10 h-10 shrink-0" />
//             <div>
//                 <h3 className="text-base font-bold text-slate-900">{title}</h3>
//                 <p className="text-sm text-slate-600 mt-1">{text}</p>
//             </div>
//         </li>
//     );
// }



const ProductsPage = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <section className="w-full">

  {/* HERO */}
  <div className="px-4 sm:px-6 py-12 sm:py-16">
    <div className="max-w-5xl mx-auto text-center">
      <p className="text-sm text-slate-500">
        SportUA Store
      </p>

      <h1 className="hero-title text-4xl sm:text-5xl font-semibold mt-4 leading-tight text-slate-900">
        Екіпірування без компромісів
      </h1>

      <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto">
        Обирай перевірене спорядження для тренувань і щоденного використання.
      </p>

      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <a
          href="#catalog"
          className="px-6 py-3 rounded-lg bg-slate-200 text-white font-medium hover:bg-slate-300 transition"
        >
          До каталогу
        </a>

        <Link
          to={baseUrl + "/discounts"}
          className="px-6 py-3 rounded-lg border border-slate-300 text-slate-900 font-medium hover:border-slate-900 transition"
        >
          Акції
        </Link>
      </div>
    </div>
  </div>

  {/* STATS */}
  <div className="max-w-5xl mx-auto px-4 sm:px-6">
    <div className="flex flex-wrap justify-center gap-8 text-center">
      {Stats.map(item => (
        <div key={item.value}>
          <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
          <p className="text-sm text-slate-500 mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  </div>

  {/* BRANDS */}
  <div className="max-w-6xl mx-auto mt-30 px-4 sm:px-6">
    <p className="text-slate-500 text-sm mb-6">
      Працюємо з офіційними брендами
    </p>

    <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
      {Brands.map(item => (
        <div key={item.src} className="flex items-center justify-center">
          <img
            src={item.src}
            className="max-h-8 opacity-70 hover:opacity-100 transition border-0 "
          />
        </div>
      ))}
    </div>
  </div>

  {/* TRUST */}
  <div className="max-w-6xl mx-auto mt-15 px-4 sm:px-6">
    <div className="grid md:grid-cols-3 gap-10">
      {TrustItems.map(item => (
        <div key={item.src}>
          <img src={item.src} className="w-8 h-8 mb-3" />
          <h3 className="text-base font-semibold text-slate-900">
            {item.title}
          </h3>
          <p className="text-slate-500 mt-2 text-sm">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* CATALOG */}
  <div
    id="catalog"
    className="max-w-6xl mx-auto mt-30 px-4 sm:px-6 scroll-mt-32"
  >
    <h2 className="hero-title text-3xl sm:text-4xl font-semibold text-slate-900">
      Каталог товарів
    </h2>

    <p className="text-slate-500 mt-4">
      Знайди потрібний товар за допомогою пошуку.
    </p>
  </div>

  {/* SEARCH */}
  <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6">
    <SearchBar />
  </div>

  {/* PRODUCTS */}
  <div className="mt-10">
    <ProductsGrid />
  </div>

</section>
            
    );
}

export default ProductsPage;