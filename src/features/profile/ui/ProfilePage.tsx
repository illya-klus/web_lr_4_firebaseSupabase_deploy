// import { NavLink, Outlet } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { useAuth } from "../../auth/context/useAuthContext";

// const BtnsPanel = () => (
//   <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
//     <NavLink
//       to={import.meta.env.VITE_BASE_URL + "/profile/history"}
//       className={({ isActive }) =>
//         (isActive
//           ? "bg-cyan-600 text-white"
//           : "bg-gray-100 text-gray-900 hover:bg-gray-200") +
//         " px-4 py-2 rounded-lg font-medium transition cursor-pointer text-sm"
//       }
//     >
//       Історія
//     </NavLink>

//     <NavLink
//       to={import.meta.env.VITE_BASE_URL + "/profile"}
//       className={({ isActive }) =>
//         (isActive
//           ? "bg-cyan-600 text-white"
//           : "bg-gray-100 text-gray-900 hover:bg-gray-200") +
//         " px-4 py-2 rounded-lg font-medium transition cursor-pointer text-sm"
//       }
//       end
//     >
//       Кошик
//     </NavLink>
//   </div>
// );

const ProfilePage = () => {
  const { user } = useAuth();
  const way = user.photoUrl.startsWith("http")
    ? user.photoUrl
    : import.meta.env.VITE_BASE_URL + user.photoUrl;

  return (
    <section className="w-full  py-10 px-4 sm:px-6 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 p-6 items-center md:items-start text-black">
          {/* Avatar */}
          {
            user.role !== 'anon' ?
            (<div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border border-gray-300 shrink-0">
              <img src={way} alt="Avatar" className="w-full h-full object-cover" />
            </div>) : null
          }
          

          {/* Info + Buttons */}
          <div className="flex-1 flex flex-col gap-4 w-full text-gray-900">
            <ProfileInfo />
            {/* <BtnsPanel /> */}
          </div>
        </div>

        {/* Content */}
        {/* <div className=" p-6 text-gray-900">
          <Outlet />
        </div> */}
      </div>
    </section>
  );
};

export default ProfilePage;