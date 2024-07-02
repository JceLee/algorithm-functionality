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

export const formatTimestamp = (timestamp) => {
  // 현재시간 가져오기
  const now = new Date();
  const past = new Date(timestamp);
  console.log(now - past);

  // 현재 시간과 주어진 시간의 차이 계산하기
  // 단순히 '-'로 Date를 비교하면 사파리 브라우저에서 작동이 안될 수 있다.
  const diff = now.getTime() - past.getTime();

  // 시간 단위별로 차이 계산하기
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    if (days < 7) {
      return `${days}일 전`;
    } else {
      const formattedDate = past.toISOString().slice(0, 10);
      return `${formattedDate} ${past.toLocaleTimeString().slice(0, 7)}`;
    }
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
};
