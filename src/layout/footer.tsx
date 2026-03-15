const Footer = () => {
  return (
    <footer className="bg-[#2b2b2b] text-[#00bfa5] mt-20">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-12 flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-16 justify-between">

        <div className="max-w-sm text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
            SportUA
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Надійний онлайн-магазин спортивних товарів. <br />
            Робимо спорт доступним для кожного.
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold mb-4 text-white">
            Покупцям
          </h4>

          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-[#00d1b2] cursor-pointer transition">Оплата і доставка</li>
            <li className="hover:text-[#00d1b2] cursor-pointer transition">Гарантія та повернення</li>
            <li className="hover:text-[#00d1b2] cursor-pointer transition">Питання та відповіді</li>
            <li className="hover:text-[#00d1b2] cursor-pointer transition">Політика конфіденційності</li>
            <li className="hover:text-[#00d1b2] cursor-pointer transition">Публічна оферта</li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold mb-4 text-white">
            Контакти
          </h4>

          <ul className="space-y-2 text-gray-300">
            <li>Email: support@sportua.ua</li>
            <li>Телефон: +38 (0__) ___-__-__</li>
            <li>Пн–Пт: 9:00–18:00</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 py-5 text-center text-gray-400 text-sm">
        © 2026 SportUA. Всі права захищені.
      </div>

    </footer>
  );
};

export default Footer;