export default function convertDateTime(dateTime: string): string {
  if (!dateTime) {
    throw new Error("입력된 날짜 및 시간 문자열이 없습니다.");
  }

  const [datePart, timePart] = dateTime.split(" ");
  if (!datePart || !timePart) {
    throw new Error("유효하지 않은 날짜 및 시간 형식입니다.");
  }

  const [year, month, day] = datePart.split(".");
  const [hourStr, minuteStr] = timePart.split(":");

  if (!year || !month || !day || !hourStr || !minuteStr) {
    throw new Error("유효하지 않은 날짜 또는 시간 형식입니다.");
  }

  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  let h = Number(hourStr);
  const min = Number(minuteStr);

  if (isNaN(y) || isNaN(m) || isNaN(d) || isNaN(h) || isNaN(min)) {
    throw new Error("숫자 변환 실패");
  }

  if (m < 1 || m > 12) {
    throw new Error(`유효하지 않은 월 값입니다: ${m}`);
  }

  if (d < 1 || d > 31) {
    throw new Error(`유효하지 않은 일 값입니다: ${d}`);
  }

  let period = "오전";
  if (h === 0) {
    h = 12;
  } else if (h === 12) {
    period = "오후";
  } else if (h > 12) {
    period = "오후";
    h -= 12;
  }

  const formattedHour = h.toString().padStart(2, "0");
  const formattedMinute = min.toString().padStart(2, "0");

  // return `${y}년 ${m}월 ${d}일 ${period} ${formattedHour}시 ${formattedMinute}분`;

  return `${y}년 ${m}월 ${d}일`;
}
