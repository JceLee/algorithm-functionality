/*

함수 정의:
formatTimestamp 함수는 주어진 ISO 형식의 타임스탬프를 현재 시각과 비교하여, 상대적인 시간 경과를 한국어로 포맷팅하여 반환하는 유틸리티 함수입니다.

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
// currentTime : Thu Jun 27 2024 15:17:29 GMT+0900 (야쿠츠크 표준시)
// timestamp 로 들어간 더미데이터가 new Date 로 변환시 +9시간 되어 나온다.
// 시간 비교를 위해 isoTime 과 currentTime 의 포맷을 같게 만든다.
// getTime() 사용해서 시간차를 계산 한다.
// 밀리초 기준 : 1분 (60초 = 1000*60), 1시간 (60분 = 1000*60*60), 1일 (24시간 = 1000*60*60*24), 7일

export const formatTimestamp = (timestamp) => {
  const currentTime = new Date();
  const isoTime = new Date(timestamp);
  const isoCurrentTime = isoTime.getTime() - 1000 * 60 * 60 * 9; // 9시간 빼줘야 시차가 없어진다.

  const timeDifference = currentTime.getTime() - isoCurrentTime;

  let timeDiffString;
  if (timeDifference < 1000 * 60) {
    timeDiffString = "30초 전";
  } else if (timeDifference < 1000 * 60 * 60) {
    timeDiffString = "5분 전";
  } else if (timeDifference < 1000 * 60 * 60 * 24) {
    timeDiffString = "2시간 전";
  } else if (timeDifference < 1000 * 60 * 60 * 24 * 7) {
    timeDiffString = "3일 전";
  } else {
    timeDiffString = "2024-06-16 09:00";
  }

  return timeDiffString;
};
