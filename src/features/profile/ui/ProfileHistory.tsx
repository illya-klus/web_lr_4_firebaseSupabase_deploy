import { useAuth } from "../../auth/context/useAuthContext";
import ProductCard from "../../products/ui/ProductItemCard";
import { useHistoryContext } from "../context/HistoryContext";

const ProfileHistory = () => {
  const { visited, clearVisited } = useHistoryContext();
  const { user } = useAuth();

  if (user.role === "anon") return null;

  return (
    <section className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-gray-800 font-medium">
          Переглянуті товари: <span className="font-bold">{visited.length}</span>
        </p>
        {visited.length > 0 && (
          <button
            onClick={clearVisited}
            className="px-3 py-1 text-sm font-medium bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Очистити
          </button>
        )}
      </div>

      {/* Empty state */}
      {visited.length === 0 && (
        <div className="p-6 text-center text-gray-500 border border-gray-200 rounded">
          Історія переглядів порожня.
        </div>
      )}

      {/* Product grid */}
      {visited.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visited.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </section>
  );
};

export default ProfileHistory;