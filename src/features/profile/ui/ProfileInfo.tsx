import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../auth/context/useAuthContext";
import { useCart } from "../../cart/hooks/useCart";
import { Link } from "react-router-dom";

type InputField = "name" | "email" | "phone";

const ProfileInfo = () => {
  const { user, setUserData } = useAuth();
  const { getCartLen } = useCart();

  const [editing, setEditing] = useState<InputField | null>(null);
  const [name, setName] = useState(user.userName);
  const [email, setEmail] = useState(user.userEmail);
  const [phone, setPhone] = useState(user.userPhoneNumber);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if (editing) {
          setUserData(email, name, phone);
          setEditing(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editing, email, name, phone]);

  if (user.role === "anon") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8 px-6 text-center max-w-md mx-auto">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Ви ще не увійшли
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Увійдіть або створіть акаунт, щоб замовляти товари, переглядати історію та редагувати свій профіль.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link
            to={import.meta.env.VITE_BASE_URL + "/auth/login"}
            className="text-white! px-4 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-500 transition text-sm sm:text-base"
          >
            Увійти
          </Link>
          <Link
            to={import.meta.env.VITE_BASE_URL + "/auth/register"}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-900 font-medium hover:bg-gray-200 transition text-sm sm:text-base"
          >
            Реєстрація
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 flex-1 text-gray-900">
      <div className="flex flex-col gap-3 flex-1">
        <h2 className="text-2xl sm:text-3xl font-bold">
          {editing === "name" ? (
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none border-b border-gray-300 focus:border-cyan-600 w-full max-w-sm transition"
              autoFocus
            />
          ) : (
            <span
              onClick={() => setEditing("name")}
              className="cursor-pointer hover:underline hover:text-cyan-900 transition"
            >
              {user.userName}
            </span>
          )}
        </h2>

        <p className="text-sm sm:text-base">
          <span className="font-semibold text-cyan-900">Email: </span>
          {editing === "email" ? (
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border-b border-gray-300 focus:border-cyan-600 w-full max-w-sm transition"
              autoFocus
            />
          ) : (
            <span
              onClick={() => setEditing("email")}
              className="cursor-pointer hover:underline hover:text-cyan-900 transition"
            >
              {user.userEmail}
            </span>
          )}
        </p>

        <p className="text-sm sm:text-base">
          <span className="font-semibold text-cyan-900">Телефон: </span>
          {editing === "phone" ? (
            <input
              ref={inputRef}
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="outline-none border-b border-gray-300 focus:border-cyan-600 w-full max-w-sm transition"
              autoFocus
            />
          ) : (
            <span
              onClick={() => setEditing("phone")}
              className="cursor-pointer hover:underline hover:text-cyan-900 transition"
            >
              {user.userPhoneNumber || "Додайте ваш номер телефону"}
            </span>
          )}
        </p>

        <p className="text-sm sm:text-base">
          <span className="font-semibold text-cyan-900">Товарів у кошику: </span>
          {getCartLen()}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;