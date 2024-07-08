/*

함수 정의:
formatTimestamp 함수는 주어진 ISO 형식의 타임스탬프를 현재 시각과 비교하여, 
상대적인 시간 경과를 한국어로 포맷팅하여 반환하는 유틸리티 함수입니다.

입력:
ISO 형식의 타임스탬프 문자열 (예: "2024-06-23T12:00:00Z")

출력:
상대적인 시간 경과를 한국어로 포맷팅한 문자열

1분 미만: "30초 전"
60분 미만: "5분 전"
24시간 미만: "2시간 전"
7일 미만: "3일 전"
일주일 이상 지난 경우: "2024-06-16 09:00"

동작 방식:
현재 시간과 입력된 타임스탬프를 비교합니다.
초, 분, 시간, 일 단위로 경과 시간을 계산합니다.
경과 시간에 따라 적절한 포맷으로 문자열을 반환합니다.

*/
const now = new Date();

const nowYear = now.getFullYear();
const nowMonth = now.getMonth() + 1;
const nowDay = now.getDate();
const nowHour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
const nowMinute = now.getMinutes();

export const formatTimestamp = (timestamp) => {
  //[feedback]
  //slice 를 이용하는 방법이 잘못된 것은 아니나, 형식이 조금만 달라져도 오류가 발생할 수 있기에,

  //timestamp 를 다시 Date 객체로 만들고
  //거기에서 year, month, date, hour, minute 등의 데이터를 가지고 오시는 방법도 괜찮을거 같습니다.

  const newTimestamp = new Date(timestamp);

  const stampYear = newTimestamp.getFullYear();
  const stampMonth = newTimestamp.getMonth() + 1;
  const stampDay = newTimestamp.getDate();
  const stampHour =
    newTimestamp.getHours() < 10
      ? `0${newTimestamp.getHours()}`
      : newTimestamp.getHours();
  const stampMinute =
    newTimestamp.getMinutes() < 10
      ? `0${newTimestamp.getMinutes()}`
      : newTimestamp.getHours();

  if (
    nowYear === stampYear &&
    nowMonth === stampMonth &&
    nowDay === stampDay &&
    nowHour === stampHour
  ) {
    if (
      nowMinute > Number(stampMinute) &&
      nowMinute - 1 === Number(stampMinute)
    )
      return "30초 전";
    return "5분 전";
  }

  if (nowYear === stampYear && nowMonth === stampMonth && nowDay === stampDay) {
    return "2시간 전";
  }

  if (
    nowYear === stampYear &&
    nowMonth === stampMonth &&
    nowDay > stampDay &&
    nowDay - stampDay < 7
  ) {
    return "3일 전";
  }
  return `${stampYear}-${stampMonth}-${stampDay} ${stampHour}:${stampMinute}`;
};
