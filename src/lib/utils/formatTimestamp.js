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

export const formatTimestamp = (timestamp) => {
  // 비교할 현재 시간을 가진 상수를 만든다.
  const dateNow = new Date();

  // 가져온 timestamp를 new Date에 넣으면 영국 시간으로 바뀌기 때문에, 9시간을 뺀 값을 새로 new Date를 통해 가져온다.
  const offset = 1000 * 60 * 60 * 9;
  const dateComment = new Date(new Date(timestamp).getTime() - offset);

  // 두 시간의 차이를 초, 분, 시, 일까지 계산한다.
  const mscDiff = dateNow.getTime() - dateComment.getTime();
  const secDiff = mscDiff / 1000;
  const minDiff = secDiff / 60;
  const hrsDiff = minDiff / 60;
  const dayDiff = hrsDiff / 24;

  if (secDiff < 60) {
    // 60초보다 작을 경우 1분 미만이기에 소수점 이하를 버린 해당 초를 반환한다.
    return `${Math.floor(secDiff)}초 전`;
  } else if (minDiff < 60) {
    // 60분보다 작을 경우 해당 분을 반환한다.
    return `${Math.floor(minDiff)}분 전`;
  } else if (hrsDiff < 24) {
    // 24시간보다 작을 경우 해당 시간을 반환한다.
    return `${Math.floor(hrsDiff)}시간 전`;
  } else if (dayDiff < 7) {
    // 7일보다 작을 경우 해당 일을 반환한다.
    return `${Math.floor(dayDiff)}일 전`;
  } else {
    // 위 조건이 모두 아닐 경우 일주일 이상 지났기에, 해당 날짜를 반환한다. 이 때 조건에 따라 적절히 문자열을 변경한다.
    return timestamp.replace("T", " ").slice(0, 16);
  }
};
