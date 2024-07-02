import { useState, useEffect } from "react";

const PURCHASE_OPEN_TIME = new Date(new Date().getTime() + 10 * 1000);

const TicketPurchase = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPurchaseAvailable, setIsPurchaseAvailable] = useState(false);

  /*
    타이머 설정: 1초마다 현재 시간을 업데이트하는 setInterval을 설정합니다.
    현재 시간 갱신: setInterval 콜백 함수 내에서 new Date()를 사용해 현재 시간을 갱신하고 setCurrentTime으로 상태를 업데이트합니다.
    구매 가능 여부 확인: 현재 시간이 구매 오픈 시간(PURCHASE_OPEN_TIME)을 지났는지 확인하고, 그렇다면 구매 가능 상태로 변경합니다(setIsPurchaseAvailable(true)).
    타이머 정리: 컴포넌트가 언마운트될 때 clearInterval을 사용하여 타이머를 정리합니다.
  */
  useEffect(() => {
    // 1초마다 실행되는 setInterval을 설정한다.
    const isTimePurchaseAvailable = setInterval(() => {
      // 현재 시간을 currentTime에 계속 업데이트해준다.
      setCurrentTime(new Date());
      // 바로 currentTime이 변경되지 않기 때문에, 직접 new Date를 통해 현재 시간이 구매 오픈 시간(PURCHASE_OPEN_TIME)을 지났는지 확인한다.
      if (PURCHASE_OPEN_TIME - new Date().getTime() <= 0) {
        // 지났을 경우 구매 가능 상태로 변경한다.
        setIsPurchaseAvailable(true);
      }
    }, 1000);
    // 컴포넌트가 언마운트될 때 return 내에 clearInterval을 사용하여 타이머를 정리합니다.
    return () => clearInterval(isTimePurchaseAvailable);
  }, []);
  /*
    getRemainingTime 함수는 현재 시간과 구매 오픈 시간 사이의 남은 시간을 계산합니다. 이 함수는 다음과 같은 단계를 거칩니다.
    남은 시간 계산: PURCHASE_OPEN_TIME과 currentTime의 차이를 계산하여 남은 시간을 구합니다.
    각 단위로 변환: 남은 시간을 일, 시간, 분, 초 단위로 변환합니다. 이를 위해 각각의 단위를 나누고 나머지를 계산하는 수학적 연산을 사용합니다.
    결과 반환: 계산된 일, 시간, 분, 초 값을 객체 형태로 반환합니다.
  */
  const getRemainingTime = () => {
    // PURCHASE_OPEN_TIME과 currentTime의 차이를 계산한 다음, 바로 해당 시간을 초로 계산하여 상수에 넣어준다.
    // 일, 시간, 분 단위로도 변환한다. 이 떄 나머지까지 한 번에 계산해준다. (나머지 소숫점을 없애는 방식으로 이해했다.)
    const seconds = Math.floor(
      (PURCHASE_OPEN_TIME - currentTime.getTime()) / 1000
    );
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const day = Math.floor(hours / 24);

    // 계산된 일, 시간, 분, 초 값을 객체 형태로 반환한다.
    return { seconds, minutes, hours, day };
  };

  const remainingTime = getRemainingTime() || 0;

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
