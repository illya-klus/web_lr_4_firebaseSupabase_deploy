import { NavLink, Outlet } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { useAuth } from "../../auth/context/useAuthContext";

const BtnsPanel = () => (
  <div className="flex flex-wrap gap-3 border-b pb-3 justify-center sm:justify-start">
    <NavLink
      to={import.meta.env.VITE_BASE_URL+"/profile/history"}
      className={({ isActive }) =>
        (isActive ? "bg-[#00d1b2] text-white " : "") + "px-4 py-2 rounded-lg transition"
      }
    >
      History
    </NavLink>

    <NavLink
      to={import.meta.env.VITE_BASE_URL+"/profile"}
      className={({ isActive }) =>
        (isActive ? "bg-[#00d1b2] text-white " : "") + "px-4 py-2 rounded-lg transition"
      }
      end
    >
      Selected
    </NavLink>
  </div>
);



const ProfilePage = () => {

  const {user} = useAuth();
  let way;
  if(user.photoUrl.includes(user.photoUrl)){
    way = user.photoUrl;
  }else{
    way = import.meta.env.VITE_BASE_URL+user.photoUrl;
  }

  return (
    <section id="profile" className="w-full py-6 sm:py-10 px-3 flex justify-center">

      <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-4 sm:p-6 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center md:items-start text-center md:text-left">
          <div className="max-w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-gray-200 flex items-center justify-center bg-gray-50">
            <img src={way} className="w-full h-full object-cover" />
          </div>
          
          <ProfileInfo/>
        </div>

        <div className="flex flex-col gap-6">
          <BtnsPanel />
          <Outlet />
        </div>
      </div>
    </section>
  );
};




export default ProfilePage;