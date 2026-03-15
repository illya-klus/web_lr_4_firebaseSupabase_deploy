import { useAuth } from "../../auth/context/useAuthContext";
import ProductCard from "../../products/ui/ProductItemCard";
import { useHistoryContext } from "../context/HistoryContext";


const ProfileHistory = () => {
    const {visited, clearVisited} = useHistoryContext();
  const {user} = useAuth();
  
  if(user.role === "anon") return;

  return (
    <section className="flex flex-col gap-6 p-4 sm:p-6 bg-white">

        <button
            onClick={() => clearVisited()}
            className="max-w-40 px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition self-center sm:self-start"
        >
          Clear history
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {visited.map(i => <ProductCard product={i}/>)}
        </div>

    </section>
  );
};

export default ProfileHistory;