import { NavLink } from "react-router-dom";
import obamaImage from "/public/images/obama.webp";
import deliveryImage from "/public/images/delivery.jpg";
import qualityImage from "/public/images/garanty.jpg";
import supportImage from "/public/images/support.jpg";

const AboutUs = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <section className="w-full text-slate-900 px-4 sm:px-6 py-12 sm:py-16">

      {/* HERO */}
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-slate-500">
          About SportUA
        </p>

        <h1 className="hero-title text-4xl sm:text-5xl font-semibold mt-4 leading-tight">
          Простий шлях до активного життя
        </h1>

        <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto">
          SportUA — це онлайн-простір для тих, хто цінує якісне спорядження,
          чесний сервіс і швидку доставку.
        </p>
      </div>

      {/* MISSION */}
      <div className="max-w-6xl mx-auto mt-20 sm:mt-24 grid lg:grid-cols-2 gap-12 items-center">
        <img
          src={obamaImage}
          alt="Місія SportUA"
          className="w-full h-105 object-cover rounded-2xl"
        />

        <div>
          <h2 className="hero-title text-3xl sm:text-4xl font-semibold">
            Наша місія
          </h2>

          <p className="text-slate-500 mt-6 text-lg leading-relaxed">
            Ми робимо спорт доступним і комфортним для кожного — від новачка до профі.
            Відбираємо перевірені бренди та будуємо сервіс, який реально допомагає.
          </p>

          <p className="text-slate-500 mt-4 text-lg leading-relaxed">
            Наша мета — не просто продаж, а результат у твоїх тренуваннях.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto mt-20 sm:mt-24">
        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <img
              src={deliveryImage}
              className="w-full h-48 object-cover rounded-xl mb-4"
              alt="Доставка"
            />
            <h3 className="text-lg font-semibold">Швидка доставка</h3>
            <p className="text-slate-500 mt-2">
              Обробляємо замовлення без затримок, щоб ти не випадав з тренувань.
            </p>
          </div>

          <div>
            <img
              src={qualityImage}
              className="w-full h-48 object-cover rounded-xl mb-4"
              alt="Якість"
            />
            <h3 className="text-lg font-semibold">Перевірена якість</h3>
            <p className="text-slate-500 mt-2">
              Пропонуємо тільки ті товари, які реально працюють.
            </p>
          </div>

          <div>
            <img
              src={supportImage}
              className="w-full h-48 object-cover rounded-xl mb-4"
              alt="Підтримка"
            />
            <h3 className="text-lg font-semibold">Підтримка</h3>
            <p className="text-slate-500 mt-2">
              Допоможемо з вибором і замовленням без зайвого шуму.
            </p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto mt-24 sm:mt-28 text-center">
        <h2 className="hero-title text-3xl sm:text-4xl font-semibold">
          Готовий почати?
        </h2>

        <p className="text-slate-500 mt-4 text-lg">
          Обери екіпірування та почни тренування вже сьогодні.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <NavLink
            to={baseUrl + "/"}
            className="px-6 py-3 rounded-lg bg-slate-300 text-white font-medium hover:bg-slate-200 transition"
          >
            До каталогу
          </NavLink>

          <NavLink
            to={baseUrl + "/about"}
            className="px-6 py-3 rounded-lg border border-slate-300 text-slate-900 font-medium hover:border-slate-900 transition"
          >
            Детальніше
          </NavLink>
        </div>
      </div>

    </section>
  );
};

export default AboutUs;