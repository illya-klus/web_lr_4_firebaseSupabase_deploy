const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-200 mt-20">
      
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-14 flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-16 justify-between">

        <div className="max-w-sm text-center sm:text-left">
          <h3 className="text-2xl font-extrabold mb-4 text-white tracking-tight">
            Sport<span className="text-cyan-400">UA</span>
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Надійний онлайн-магазин спортивних товарів. <br />
            Робимо спорт доступним для кожного.
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold mb-4 text-white">
            Покупцям
          </h4>

          <ul className="space-y-2 text-slate-400">
            <li className="hover:text-cyan-300 cursor-pointer transition">Оплата і доставка</li>
            <li className="hover:text-cyan-300 cursor-pointer transition">Гарантія та повернення</li>
            <li className="hover:text-cyan-300 cursor-pointer transition">Питання та відповіді</li>
            <li className="hover:text-cyan-300 cursor-pointer transition">Політика конфіденційності</li>
            <li className="hover:text-cyan-300 cursor-pointer transition">Публічна оферта</li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h4 className="text-lg font-semibold mb-4 text-white">
            Контакти
          </h4>

          <ul className="space-y-2 text-slate-400">
            <li>Email: support@sportua.ua</li>
            <li>Телефон: +38 (0__) ___-__-__</li>
            <li>Пн–Пт: 9:00–18:00</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-slate-800 py-5 text-center text-slate-500 text-sm">
        © 2026 SportUA. Всі права захищені.
      </div>

    </footer>
  );
};

export default Footer;