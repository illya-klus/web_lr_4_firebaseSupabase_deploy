import { useState } from "react";
import { useProducts } from "../hooks/useProducts";


type SortType = "price-asc" | "price-desc" | "none";
type UIState = {
  search: string;
  sort: SortType;
};

const SearchBar = () => {
  const { filterProducts } = useProducts();

  const [ui, setUI] = useState<UIState>({ search: "", sort: "none" });
  const [openFilters, setOpenFilters] = useState(false);

  const handleSearch = (value: string) => {
    const updated = { ...ui, search: value };
    setUI(updated);
    filterProducts(updated);
  };

  const handleSortAsc = () => {
    const updated = { ...ui, sort: "price-asc" as SortType };
    setUI(updated);
    filterProducts(updated);
  };

  const handleSortDesc = () => {
    const updated = { ...ui, sort: "price-desc" as SortType};
    setUI(updated);
    filterProducts(updated);
  };

  const handleReset = () => {
    const reset: UIState = { ...ui, sort: "none" as SortType};
    setUI(reset);
    filterProducts(reset);
  };

  return (
    <div className="relative max-w-6xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mt-8 sm:mt-10 w-full px-3 sm:px-0">

      <input
        value={ui.search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Пошук товарів..."
        className="w-full pl-4 pr-4 py-3 border border-slate-300 bg-white rounded-xl 
          focus:outline-none focus:ring focus:ring-slate-700"
      />

      <div className="relative">

        <button
          onClick={() => setOpenFilters((prev) => !prev)}
          className="w-full sm:w-auto sm:min-w-40 px-4 py-3 bg-slate-900 text-white hover:bg-slate-700 transition rounded-xl font-medium"
        >
          Фільтри
        </button>

        {openFilters && (
          <div className="absolute sm:absolute top-full mt-1.5 w-full sm:min-w-48 bg-white shadow-lg border border-slate-200 flex flex-col z-50 rounded-xl overflow-hidden">

            <button
              onClick={handleSortDesc}
              className={`px-4 py-2.5 text-left hover:bg-slate-100 transition ${
                ui.sort === "price-desc" ? "bg-cyan-50 font-semibold text-cyan-700" : ""
              }`}
            >
              Спочатку дорожчі
            </button>

            <button
              onClick={handleSortAsc}
              className={`px-4 py-2.5 text-left hover:bg-slate-100 transition ${
                ui.sort === "price-asc" ? "bg-cyan-50 font-semibold text-cyan-700" : ""
              }`}
            >
              Спочатку дешевші
            </button>

            <button
              onClick={handleReset}
              className={`px-4 py-2.5 text-left hover:bg-slate-100 transition ${
                ui.sort === "none" ? "bg-cyan-50 font-semibold text-cyan-700" : ""
              }`}
            >
              Без сортування
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default SearchBar;