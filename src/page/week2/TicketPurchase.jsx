import { useState, useEffect } from "react";

const PURCHASE_OPEN_TIME = new Date(new Date().getTime() + 30 * 1000);

const TicketPurchase = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPurchaseAvailable, setIsPurchaseAvailable] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (now >= PURCHASE_OPEN_TIME) {
        setIsPurchaseAvailable(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRemainingTime = () => {
    const difference = PURCHASE_OPEN_TIME - currentTime;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const remainingTime = getRemainingTime();

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen p-4 bg-section">
      <div className="flex flex-col items-center mb-6 p-6 bg-white rounded-lg shadow-lg bg-[#ffffff]">
        <div className="mb-2 text-2xl font-bold text-gray-700">티켓 구매</div>
        <div className="text-lg font-normal text-gray-600">
          구매 Open 시간: {PURCHASE_OPEN_TIME.toLocaleTimeString()}
        </div>
        <button
          className={`rounded-lg text-white px-4 py-2 w-full rounded font-bold mt-4 transition-colors duration-300 bg-gradient-to-r from-green-400 to-blue-500 ${
            isPurchaseAvailable
              ? "bg-teal-600 hover:bg-teal-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isPurchaseAvailable}
        >
          {isPurchaseAvailable
            ? "구매"
            : `오픈까지 ${remainingTime.seconds}초전`}
        </button>
      </div>
    </section>
  );
};

export default TicketPurchase;
