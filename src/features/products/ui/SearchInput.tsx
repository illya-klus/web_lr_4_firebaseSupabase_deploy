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
    <div className="relative max-w-250 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mt-8 sm:mt-10 w-full px-3 sm:px-0">

      <input
        value={ui.search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-xl 
          focus:outline-none focus:ring-2 focus:ring-[#00d1b2]"
      />

      <div className="relative">

        <button
          onClick={() => setOpenFilters((prev) => !prev)}
          className="w-full sm:w-auto sm:min-w-40 px-3 py-2 bg-gray-200 hover:bg-gray-300 transition rounded-md"
        >
          Filters
        </button>

        {openFilters && (
          <div className="absolute sm:absolute top-full mt-1 w-full sm:min-w-40 bg-white shadow-lg flex flex-col z-50 rounded-md overflow-hidden">

            <button
              onClick={handleSortDesc}
              className={`px-4 py-2 text-left hover:bg-teal-600 hover:text-white transition ${
                ui.sort === "price-desc" ? "bg-teal-600 font-semibold text-white" : ""
              }`}
            >
              Biggest price
            </button>

            <button
              onClick={handleSortAsc}
              className={`px-4 py-2 text-left hover:bg-teal-600 hover:text-white transition ${
                ui.sort === "price-asc" ? "bg-teal-600 font-semibold text-white" : ""
              }`}
            >
              Smallest price
            </button>

            <button
              onClick={handleReset}
              className={`px-4 py-2 text-left hover:bg-teal-600 hover:text-white transition ${
                ui.sort === "none" ? "bg-teal-600 font-semibold text-white" : ""
              }`}
            >
              None
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default SearchBar;