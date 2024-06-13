// 날짜 변환 함수
export function setDateStrFinal(date: string) {
  if (!date) return "";

  if (date.length !== 6 || isNaN(Number(date))) {
    throw new Error(`유효하지 않은 날짜 형식입니다: ${date}`);
  }

  // 연, 월, 일 추출
  const yearStr = date.substring(0, 2); // 연도의 앞 두 자리
  const monthStr = date.substring(2, 4);
  const dayStr = date.substring(4, 6);

  const y = Number(yearStr) + 2000; // 2000년대를 가정
  const m = Number(monthStr);
  const d = Number(dayStr);

  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    throw new Error(`숫자 변환 실패\n 입력받은 date: ${date}`);
  }

  if (m < 1 || m > 12) {
    throw new Error(`유효하지 않은 월 값입니다: 입력받은 date: ${date}`);
  }

  if (d < 1 || d > 31) {
    throw new Error("유효하지 않은 일 값입니다");
  }

  return `${y}년 ${m}월 ${d}일`;
}

// 시간 변환 함수
export function setTimeStrFinal(time: string) {
  if (!time) return "";

  const [hours, minutes] = time.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error(`유효하지 않은 시간 형식입니다: ${time}`);
  }

  if (hours < 0 || hours > 23) {
    throw new Error(`유효하지 않은 시간 값입니다: ${time}`);
  }

  if (minutes < 0 || minutes > 59) {
    throw new Error(`유효하지 않은 분 값입니다: ${time}`);
  }

  return `${hours}시 ${minutes}분`;
}

// 전체 문자열 처리 함수
export function processDateTime(input: string) {
  if (input == "") {
    const formattedDate = "NULL";
    const formattedTime = "NULL";
    return { formattedDate, formattedTime };
  }
  const [datePart, timePart] = input.split(" ");

  const formattedDate = setDateStrFinal(datePart.replaceAll(".", ""));
  const formattedTime = setTimeStrFinal(timePart);

  return { formattedDate, formattedTime };
}
