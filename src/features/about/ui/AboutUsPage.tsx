import { NavLink } from "react-router-dom";
import obamaImage from "/public/images/obama.webp"
import deliveryImage from "/public/images/delivery.jpg"
import qualityImage from "/public/images/garanty.jpg";
import supportImage from "/public/images/support.jpg";

const OurMission = () => {
    return(
    <div className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-8 sm:gap-10">
        <img
          src={obamaImage}
          alt="Місія магазину"
          className="w-full lg:w-1/2 rounded-xl shadow-lg"
        />
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Наша Місія
          </h2>
          <p className="text-gray-600 text-lg">
            Ми хочемо надихати кожного спортсмена та активну людину на нові
            звершення. У нас тільки якісне спорядження, яке допомагає
            досягати максимальних результатів.
          </p>
          <p className="text-gray-600 text-lg">
            Від аматорів до профі — ми підтримуємо всіх, хто обирає активний
            спосіб життя.
          </p>
        </div>
      </div>
    );
}

const InfoPanel = () => {
    return(
        <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">
          <div className="flex flex-col items-center text-center p-6 bg-gray-20 rounded-xl shadow-md hover:shadow-xl transition">
            <img src={deliveryImage} className="w-full lg:w-1/2 rounded-xl shadow-lg" alt="" />
            <h3 className="text-2xl font-bold mb-2">Швидка Доставка</h3>
            <p className="text-gray-600">
              Твоє спорядження прибуде швидко і без проблем, щоб ти міг
              тренуватися без зупинок.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-20 rounded-xl shadow-md hover:shadow-xl transition">
                        <img src={qualityImage} className="w-full lg:w-1/2 rounded-xl shadow-lg" alt="" />
            <h3 className="text-2xl font-bold mb-2">Якість Товарів</h3>
            <p className="text-gray-600">
              Ми обираємо лише найкращі бренди та матеріали для твого комфорту
              та ефективності тренувань.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-20 rounded-xl shadow-md hover:shadow-xl transition">
                        <img src={supportImage} className="w-full lg:w-1/2 rounded-xl shadow-lg" alt="" />
            <h3 className="text-2xl font-bold mb-2">Підтримка Клієнтів</h3>
            <p className="text-gray-600">
              Ми завжди на зв’язку, щоб допомогти з вибором спорядження та
              відповісти на будь-які питання.
            </p>
          </div>
        </div>
      </div>
    );
}

const OurTeam = () => {
    return (
         <div className="max-w-6xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Наша Команда</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <img
              src="/images/team1.jpg"
              alt="Team Member"
              className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold">Іван</h3>
            <p className="text-gray-500">Менеджер по спорту</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/images/team2.jpg"
              alt="Team Member"
              className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold">Оля</h3>
            <p className="text-gray-500">Клієнтська підтримка</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/images/team3.jpg"
              alt="Team Member"
              className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold">Макс</h3>
            <p className="text-gray-500">Логістика</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/images/team4.jpg"
              alt="Team Member"
              className="w-40 h-40 rounded-full object-cover mb-4 shadow-lg"
            />
            <h3 className="text-xl font-bold">Катя</h3>
            <p className="text-gray-500">Маркетинг</p>
          </div>
        </div>
      </div>
    );
}

const LetsContinue = () => {
    return (
        <div className="bg-[#00d1b2] text-white py-12 sm:py-16 text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Готовий до нових звершень?
        </h2>
        <p className="mb-6 text-lg">
          Обери своє спорядження прямо зараз і починай тренування!
        </p>
        <button className="bg-white text-green-500 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition">
          <NavLink to="/">Перейдімо до товарів</NavLink>
        </button>
      </div>
    );
}


const AboutUs = () => {
  return (
    <section className="w-full text-gray-800">
        <OurMission/>
        <InfoPanel/>
        <OurTeam/>
        <LetsContinue/>
    </section>
  );
};

export default AboutUs;