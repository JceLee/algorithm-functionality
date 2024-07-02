import { useState, useEffect } from "react";

const PURCHASE_OPEN_TIME = new Date(
  new Date().getTime() + 24 * 60 * 60 * 1000 + 10 * 1000
);

const TimeAttack = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPurchaseAvailable, setIsPurchaseAvailable] = useState(false);

  // TODO 타이머를 여기서 구현해주세요
  useEffect(() => {
    // 1초마다 실행되는 setInterval을 설정한다.
    const isTimePurchaseAvailable = setInterval(() => {
      // 현재 시간을 currentTime에 계속 업데이트해준다.
      setCurrentTime(new Date());
      // 바로 currentTime이 변경되지 않기 때문에, 직접 new Date를 통해 현재 시간이 신청 오픈 시간(PURCHASE_OPEN_TIME)을 지났는지 확인한다.
      if (PURCHASE_OPEN_TIME - new Date().getTime() <= 0) {
        // 지났을 경우 신청 가능 상태로 변경한다.
        setIsPurchaseAvailable(true);
      }
    }, 1000);
    // 컴포넌트가 언마운트될 때 return 내에 clearInterval을 사용하여 타이머를 정리합니다.
    return () => clearInterval(isTimePurchaseAvailable);
  }, []);

  // TODO 남은 시간을 계산하고 표시해주는 로직입니다.
  // 남은 시간이 24시간 이상일 경우는 오픈 시간을 그대로 표시해주고
  // 24시간이 미만일 경우에는 몇 시 몇 분 몇 초 전 이라고 표시해주세요. e.g) 23시간 59분 3초전
  const getRemainingTime = () => {
    // PURCHASE_OPEN_TIME과 currentTime의 차이를 계산한 다음, 바로 해당 시간을 초로 계산하여 상수에 넣어준다.
    // 일, 시간, 분 단위로도 변환한다.
    const diff = PURCHASE_OPEN_TIME - currentTime.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // 계산된 일, 시간, 분, 초 값을 객체 형태로 반환한다.
    return { seconds, minutes, hours, days };
  };

  const remainingTime = getRemainingTime();

  return (
    <section className="flex flex-col items-center justify-center w-full h-screen p-4 bg-section">
      <div className="flex flex-col items-center mb-6 p-6 bg-white rounded-lg shadow-lg bg-[#ffffff]">
        <div className="mb-2 text-2xl font-bold text-gray-700">
          스파르타 프론트엔드 부트캠프 5기 수강신청
        </div>
        <div className="text-lg font-normal text-gray-600">NextJS 입문</div>
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
            : remainingTime && remainingTime.days === 0
              ? `수강신청 시작 까지 ${remainingTime.hours}시간 ${remainingTime.minutes}분 ${remainingTime.seconds}초전`
              : `수강신청 시작 시간: ${PURCHASE_OPEN_TIME.toLocaleString()}`}
        </button>
      </div>
    </section>
  );
};

export default TimeAttack;
